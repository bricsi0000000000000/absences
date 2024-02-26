import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../../../@api/api-service.service';
import { Absence } from '../../../@api/dto/absence.dto';
import { GetAbsenceListRequest } from '../../../@api/dto/get-absence-list-request';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbsenceReasonOptions } from '../../../@api/dto/absence-reason';
import { CredentialManager } from '../../../@api/credential-manager';
import { Employee } from 'src/@api/dto/employee.dto';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  @ViewChild('absencePopup') absencePopup!: ElementRef;
  @ViewChild('errorMessageToast') errorMessageToast!: ElementRef;

  public isLoading: boolean = false;
  public absences!: Array<Absence>;
  public currentPageNumber!: number;
  public rowsOfPage: number = 3;
  public orderByColumnName: string = 'StartDate';
  public isOrderByDesc: boolean = false;
  public selectedStartDate: string = '';
  public selectedEndDate: string = '';
  public addNewAbsenceFormGroup: FormGroup;
  public isEditAbsenceStartDateValid: boolean = true;
  public absenceReasons = AbsenceReasonOptions;
  public errorMessage: string = '';
  public loggedInEmployee!: Employee;

  private maxRowsCount: number = 3;
  private startDate: Date = new Date();
  private endDate: Date = new Date();
  private editingAbsenceId: number = -1;

  constructor(private apiService: ApiService,
    private renderer: Renderer2,
    private credentialManager: CredentialManager) {
    this.setPageNumberToDefault();

    let loggedInEmployee = this.credentialManager.getEmployee();
    if(loggedInEmployee){
      this.loggedInEmployee = loggedInEmployee;
    }

    this.addNewAbsenceFormGroup = new FormGroup({
      employeeName: new FormControl('', [Validators.required]),
      startDate: new FormControl(this.currentDate, [Validators.required]),
      endDate: new FormControl(this.currentDate, [Validators.required]),
      reason: new FormControl(null, [Validators.required]),
      comment: new FormControl('', Validators.maxLength(500)),
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnAfterView() {
    if (this.absencePopup) {
      this.renderer.setStyle(this.absencePopup.nativeElement, 'display', 'none');
    }
  }

  private async getData() {
    this.isLoading = true;

    let request = new GetAbsenceListRequest(
      this.currentPageNumber,
      this.rowsOfPage,
      this.isOrderByDesc,
      this.orderByColumnName,
      this.startDate,
      this.endDate);

    const response = await this.apiService.getAllAbsence(request);
    if (response.isSuccess) {
      this.absences = response.returnValue.absences;
      this.maxRowsCount = response.returnValue.maxRowsCount;
    }
    else {
      this.showErrorMessage(response.errorMessage);
    }

    this.isLoading = false;
  }

  public async nextPage() {
    this.currentPageNumber++;
    if (this.currentPageNumber > this.pagesCount) {
      this.currentPageNumber = this.pagesCount;
    }

    await this.getData();
  }

  public async previousPage() {
    this.currentPageNumber--;

    if (this.currentPageNumber <= 1) {
      this.currentPageNumber = 1;
    }

    await this.getData();
  }

  public async orderList(columnName: string) {
    this.orderByColumnName = columnName;
    this.isOrderByDesc = !this.isOrderByDesc;
    await this.getData();
  }

  public async onStartDateChange(event: any) {
    this.startDate = new Date(event.target.value);
    this.setPageNumberToDefault();
    await this.getData();
  }

  public async onEndDateChange(event: any) {
    this.endDate = new Date(event.target.value);
    this.setPageNumberToDefault();
    await this.getData();
  }

  get currentYearAndMonth(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}`;
  }

  get currentDate(): string {
    const currentDate: Date = new Date();
    return currentDate.toISOString().substring(0, 10);
  }

  get pagesCount(): number {
    return Math.ceil(this.maxRowsCount / this.rowsOfPage);
  }

  private setPageNumberToDefault() {
    this.currentPageNumber = 1;
  }

  public openAbsencePopup(clearForm: boolean = true) {
    if (this.absencePopup) {
      if (clearForm) {
        this.editingAbsenceId = -1;

        this.addNewAbsenceFormGroup.reset();

        const startDate = new Date();
        const endDate = new Date();
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 1);

        this.addNewAbsenceFormGroup.patchValue({
          employeeName: this.loggedInEmployee.name,
          startDate: startDate.toISOString().substring(0, 10),
          endDate: endDate.toISOString().substring(0, 10),
          reason: null,
          comment: '',
        });
      }

      this.renderer.setStyle(this.absencePopup.nativeElement, 'display', 'flex');
    }
  }

  public hideAbsencePopup() {
    if (this.absencePopup) {
      this.renderer.setStyle(this.absencePopup.nativeElement, 'display', 'none');
    }
  }

  public async addNewAbsence() {
    this.addNewAbsenceFormGroup.markAllAsTouched();
    this.addNewAbsenceFormGroup.updateValueAndValidity();
    this.checkEditAbsenceStartDate();

    if (this.addNewAbsenceFormGroup.valid && this.isEditAbsenceStartDateValid) {
      this.isLoading = true;

      let isError = false;

      let absence = new Absence(
        this.addNewAbsenceFormGroup.value.employeeName,
        this.addNewAbsenceFormGroup.value.startDate,
        this.addNewAbsenceFormGroup.value.endDate,
        parseInt(this.addNewAbsenceFormGroup.value.reason),
        this.addNewAbsenceFormGroup.value.comment);

        absence.employeeId = this.loggedInEmployee.id;

      if (this.editingAbsenceId == -1) {
        const response = await this.apiService.createAbsence(absence);
        if (!response.isSuccess) {
          this.showErrorMessage(response.errorMessage);
          isError = true;
        }
      }
      else {
        absence.id = this.editingAbsenceId;
        const response = await this.apiService.updateAbsence(absence);
        if (!response.isSuccess) {
          this.showErrorMessage(response.errorMessage);
          isError = true;
        }
      }

      this.isLoading = false;

      if (!isError) {
        this.hideAbsencePopup();

        await this.getData();
      }
    }
  }

  checkEditAbsenceStartDate() {
    const startDate = new Date(this.addNewAbsenceFormGroup.get('startDate')?.value);
    const endDate = new Date(this.addNewAbsenceFormGroup.get('endDate')?.value);

    this.isEditAbsenceStartDateValid = startDate <= endDate;
  }

  private showErrorMessage(errorMessage: string) {
    if (this.errorMessageToast) {
      this.errorMessage = errorMessage;
      this.renderer.setStyle(this.errorMessageToast.nativeElement, 'display', 'flex');

      setTimeout(() => {
        this.renderer.setStyle(this.errorMessageToast.nativeElement, 'display', 'none');
      }, 3000);
    }
  }

  public editAbsence(absenceId: number) {
    this.editingAbsenceId = absenceId;

    let absence = this.absences.find(x => x.id == absenceId) as Absence;

    const startDate = new Date(absence.startDate);
    const endDate = new Date(absence.endDate);
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);

    this.addNewAbsenceFormGroup.patchValue({
      employeeName: absence.employeeName,
      startDate: startDate.toISOString().substring(0, 10),
      endDate: endDate.toISOString().substring(0, 10),
      reason: absence.reason,
      comment: absence.comment,
    });

    this.openAbsencePopup(false);
  }

  get isEditing() {
    return this.editingAbsenceId != -1;
  }
  
  public async deleteAbsence(absenceId: number) {
    const response = await this.apiService.deleteAbsence(absenceId);
    if (response.isSuccess) {
      this.setPageNumberToDefault();
      await this.getData();
    }
    else{
      this.showErrorMessage(response.errorMessage);
    }
  }
}

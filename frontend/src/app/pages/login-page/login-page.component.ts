import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../@api/api-service.service';
import { Employee } from '../../../@api/dto/employee.dto';
import { Router } from '@angular/router';
import { CredentialManager } from '../../../@api/credential-manager';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('errorMessageToast') errorMessageToast!: ElementRef;

  public loginFormGroup: FormGroup;
  public isLoading: boolean = false;
  public errorMessage: string = '';

  constructor(private apiService: ApiService,
    private renderer: Renderer2,
    private router: Router,
    private credentialManager: CredentialManager) {
    this.loginFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  public async login() {
    this.loginFormGroup.markAllAsTouched();
    this.loginFormGroup.updateValueAndValidity();

    if (this.loginFormGroup.valid && this.loginFormGroup) {
      this.isLoading = true;
      const response = await this.apiService.login(this.loginFormGroup.value);
      if (response) {
        this.credentialManager.updateLoggedInUserSubject(response);
        this.router.navigate(['/absence-list']);
      }
      else {
        this.showErrorMessage("User not found");
      }

      this.isLoading = false;
    }
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

}

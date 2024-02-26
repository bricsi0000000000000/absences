import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialManager } from '../@api/credential-manager';
import { Employee } from 'src/@api/dto/employee.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public employeeName: string = '';

  private subs: Subscription[] = [];

  constructor(private router: Router,
    private credentialManager: CredentialManager) {

    const loggedInUserHasChangedSubject = this.credentialManager.loggedInUserHasChangedSubject.subscribe(
      (employee: Employee) => {
        if (employee) {
          this.employeeName = employee.name;
        }
        else {
          this.employeeName = '';
        }
      }
    );

    this.subs.push(loggedInUserHasChangedSubject);
  }

  ngOnInit(): void {
    let employee = this.credentialManager.getEmployee();
    if (employee) {
      this.employeeName = employee.name;
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public logOut() {
    this.credentialManager.updateLoggedInUserSubject(undefined);
    this.employeeName = '';
    this.router.navigate(['/login']);
  }
}

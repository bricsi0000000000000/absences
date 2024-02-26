import { Injectable } from "@angular/core";
import { Employee } from "./dto/employee.dto";
import { Subject } from "rxjs";

@Injectable()
export class CredentialManager {
  loggedInUserHasChangedSubject = new Subject<Employee>();

  public updateLoggedInUserSubject(employee?: Employee) {
    if (employee) {
      localStorage.setItem('employee', JSON.stringify(employee));
    }
    else {
      localStorage.removeItem('employee');
    }

    this.loggedInUserHasChangedSubject.next(employee);
  }

  public getEmployee(): Employee | null {
    const item = localStorage.getItem('employee');
    return item ? JSON.parse(item) as Employee : null;
  }
}
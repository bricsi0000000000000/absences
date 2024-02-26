import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../environments/environment';
import { Absence } from "./dto/absence.dto";
import { GetAbsenceListRequest } from "./dto/get-absence-list-request";
import { GetAbsenceListResponse } from "./dto/get-absence-list-response";
import { CustomResponse } from "./dto/custom-response";
import { Employee } from "./dto/employee.dto";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {

  }

  public async login(employee: Employee): Promise<Employee> {
    return this.callPostApi('employee/login', employee);
  }

  public async getAllAbsence(request: GetAbsenceListRequest): Promise<CustomResponse<GetAbsenceListResponse>> {
    let params = new HttpParams();
    params = params.append('PageNumber', request.pageNumber);
    params = params.append('RowsOfPage', request.rowsOfPage);
    params = params.append('OrderByDesc', request.orderByDesc);
    params = params.append('OrderByColumnName', request.orderByColumnName);
    params = params.append('StartDate', request.startDate.toISOString());
    params = params.append('EndDate', request.endDate.toISOString());

    return this.callGetApi('absence/getAllAbsence', params);
  }

  public async createAbsence(absence: Absence): Promise<CustomResponse<object>> {
    return this.callPostApi('absence/createAbsence', absence);
  }

  public async updateAbsence(absence: Absence): Promise<CustomResponse<object>> {
    return this.callPutApi('absence/updateAbsence', absence);
  }

  public async deleteAbsence(absenceId: number): Promise<CustomResponse<object>> {
    let params = new HttpParams();
    params = params.append('absenceId', absenceId);

    return this.callDeleteApi('absence/deleteAbsence', params);
  }

  private callGetApi<T>(endpoint: string, params?: HttpParams): Promise<T> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    let response = this.http.get<T>(environment.apiUrl + endpoint,
    {
      headers,
      params,
      responseType: "json",
    }).toPromise();

    return response;
  }

  private callPostApi<T>(endpoint: string, data?: any): Promise<T> {
    let response = this.http.post<T>(environment.apiUrl + endpoint, data).toPromise();

    return response;
  }

  private callPutApi<T>(endpoint: string, data?: any): Promise<T> {
    let response = this.http.put<T>(environment.apiUrl + endpoint, data).toPromise();

    return response;
  }

  private callDeleteApi<T>(endpoint: string, params?: HttpParams): Promise<T> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    let response = this.http.delete<T>(environment.apiUrl + endpoint,
    {
      headers,
      params,
      responseType: "json",
    }).toPromise();

    return response;
  }
}
export class GetAbsenceListRequest {
  pageNumber: number;
  rowsOfPage: number;
  orderByDesc: boolean;
  orderByColumnName: string;
  startDate: Date;
  endDate: Date;

  constructor(pageNumber: number,
    rowsOfPage: number,
    orderByDesc: boolean,
    orderByColumnName: string,
    startDate: Date,
    endDate: Date) {
    this.pageNumber = pageNumber;
    this.rowsOfPage = rowsOfPage;
    this.orderByDesc = orderByDesc;
    this.orderByColumnName = orderByColumnName;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
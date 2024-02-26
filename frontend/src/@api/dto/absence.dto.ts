import { AbsenceReason } from "./absence-reason";

export class Absence {
  id: number;
  employeeId: number;
  employeeName: string;
  startDate: Date;
  endDate: Date;
  reason: AbsenceReason;
  comment: string;
  isApproved: boolean;

  constructor(employeeName: string,
    startDate: Date,
    endDate: Date,
    reason: AbsenceReason,
    comment: string) {
    this.id = 0;
    this.employeeId = 0;
    this.employeeName = employeeName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.reason = reason;
    this.comment = comment;
    this.isApproved = false;
  }
}
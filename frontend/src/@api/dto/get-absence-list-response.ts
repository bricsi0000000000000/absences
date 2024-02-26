import { Absence } from "./absence.dto";

export class GetAbsenceListResponse {
  maxRowsCount: number;
  absences: Array<Absence>;

  constructor(maxRowsCount: number, absences: Array<Absence>) {
    this.maxRowsCount = maxRowsCount;
    this.absences = absences;
  }
}
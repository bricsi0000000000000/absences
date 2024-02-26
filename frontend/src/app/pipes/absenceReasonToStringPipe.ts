import { Pipe, PipeTransform } from '@angular/core';
import { AbsenceReason, AbsenceReasonDisplayName } from '../../@api/dto/absence-reason';

@Pipe({
  name: 'absenceReasonToString'
})
export class AbsenceReasonToStringPipe implements PipeTransform {
  transform(absenceReason: AbsenceReason): string {
    return AbsenceReasonDisplayName[absenceReason];
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToString'
})
export class DateToStringPipe implements PipeTransform {
  transform(date: Date): string {
    return new Date(date).toLocaleString('en-US',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}

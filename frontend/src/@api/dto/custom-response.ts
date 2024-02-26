export class CustomResponse<T> {
  isSuccess: boolean = false;
  errorMessage: string = '';
  returnValue!: T;
}
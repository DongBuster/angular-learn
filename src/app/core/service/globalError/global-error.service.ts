import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService implements ErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
    } else {
      const toast = this.injector.get(ToastService);
      console.log('Global  error caught: ', error);
      // toast.show('An unexpected error occured, Please try again!', 'danger');
    }
  }
}

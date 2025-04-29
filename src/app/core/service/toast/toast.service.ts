import { Injectable } from '@angular/core';
// import { ToastComponent } from '../../../component/toast/toast.component';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(
    title: string,
    message: string,
    type: 'success' | 'danger' | 'info' | 'warning'
  ) {
    const id = Date.now();
    const newToast: Toast = { id, title, message, type };
    this.toasts.push(newToast);
    this.toastsSubject.next(this.toasts);

    setTimeout(() => {
      this.removeToast(id);
    }, 3300);
    return id;
  }

  Success(message: string) {
    this.show('Success', message, 'success');
  }
  Info(message: string) {
    this.show('Info', message, 'info');
  }
  Warning(message: string) {
    this.show('Warning', message, 'warning');
  }

  Error(message: string) {
    this.show('Error', message, 'danger');
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.toastsSubject.next(this.toasts);
  }
}

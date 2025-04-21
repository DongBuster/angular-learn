import { Injectable } from '@angular/core';
import { ToastComponent } from '../../../component/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastComp!: ToastComponent;

  register(toast: ToastComponent) {
    this.toastComp = toast;
  }

  show(message: string, type: 'success' | 'danger' | 'info' = 'success') {
    this.toastComp?.show(message, type);
  }
}

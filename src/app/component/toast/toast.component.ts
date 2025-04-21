import { Component, ElementRef, ViewChild } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  @ViewChild('toastRef', { static: true }) toastElement!: ElementRef;
  message: string = '';
  show(message: string, type: 'success' | 'danger' | 'info' = 'success') {
    this.message = message;
    // Set class based on type
    const toastEl = this.toastElement.nativeElement;
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}

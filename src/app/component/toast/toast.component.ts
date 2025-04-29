import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Toast, ToastService } from '../../core/service/toast/toast.service';
import { Subscription } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { FeatherIconsModule } from '../icons/icons.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [CommonModule, FeatherIconsModule, NgClass],
})
export class ToastComponent implements OnInit {
  private toastService = inject(ToastService);
  toasts: Toast[] = [];
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  removeToast(id: number) {
    this.toastService.removeToast(id);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

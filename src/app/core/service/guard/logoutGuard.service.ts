import { Injectable, inject } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  authService = inject(AuthService);
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Observable<boolean> {
    if (component.canDeactivate) {
      const canLeave = component.canDeactivate();
      if (typeof canLeave === 'boolean' && canLeave) {
        // Clear localStorage
        this.authService.setEmptyDataLocalStorage();
        // Xóa data chỉ khi user thực sự rời đi
      }
      return canLeave;
    }
    return true;
  }
}

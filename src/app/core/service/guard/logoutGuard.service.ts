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
    this.authService.setEmptyDataLocalStorage;
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

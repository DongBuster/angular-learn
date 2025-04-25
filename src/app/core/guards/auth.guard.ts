import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AuthComponent } from '../../view/auth/authPage.component';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanDeactivate<AuthComponent> {
  constructor(private authService: AuthService) {}

  canDeactivate(component: AuthComponent): boolean {
    // Clear localStorage only when logging out
    if (this.authService.isLoggedOut()) {
      localStorage.clear();
    }
    return true;
  }
} 
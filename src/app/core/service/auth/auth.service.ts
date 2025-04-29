import { Injectable } from '@angular/core';
import { TokenJWT } from '../../models/token';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router, private toastService: ToastService) {}
  saveDataLocalStorage(tokenJWT: TokenJWT) {
    localStorage.setItem('accessToken', tokenJWT.accessToken);
    localStorage.setItem('refreshToken', tokenJWT.refreshToken);
    localStorage.setItem('userId', tokenJWT.id.toString());
    localStorage.setItem('userName', tokenJWT.username);
    localStorage.setItem('imageUrl', tokenJWT.image);
    localStorage.setItem('login', 'true');
    console.log('3');
  }
  setEmptyDataLocalStorage() {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('userId', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('imageUrl', '');
    localStorage.setItem('login', 'false');

    sessionStorage.removeItem('loggedInUser');
  }
  getDataLocalStorage(key: string): string {
    return localStorage.getItem(key) ?? '';
  }
  isLoggedIn(): boolean {
    const isLogin = localStorage.getItem('login');
    return isLogin == 'true' ? true : false;
  }
  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  loginWithGoogle(respone: any) {
    // decode token
    const payload = this.decodeToken(respone.credential);
    // save session
    sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
    // navigate
    localStorage.setItem('login', 'true');
    this.router.navigate(['/home']);
  }
  loginWithFacebook() {
    // TODO: Implement Facebook login
    this.toastService.Info('Facebook login coming soon!');
  }
}

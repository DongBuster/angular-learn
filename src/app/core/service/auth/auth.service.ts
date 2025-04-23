import { Injectable } from '@angular/core';
import { TokenJWT } from '../../models/token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  saveDataLocalStorage(tokenJWT: TokenJWT) {
    localStorage.setItem('accessToken', tokenJWT.accessToken);
    localStorage.setItem('refreshToken', tokenJWT.refreshToken);
    localStorage.setItem('userId', tokenJWT.id.toString());
    localStorage.setItem('userName', tokenJWT.username);
    localStorage.setItem('imageUrl', tokenJWT.image);
    localStorage.setItem('login', 'true');
  }
  setEmptyDataLocalStorage() {
    localStorage.setItem('accsesToken', '');
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('userId', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('imageUrl', '');
    localStorage.setItem('login', 'false');
  }
  getDataLocalStorage(key: string): string {
    return localStorage.getItem(key) ?? '';
  }
  isLoggedIn(): boolean {
    const isLogin = localStorage.getItem('login');
    return isLogin == 'true' ? true : false;
  }
}

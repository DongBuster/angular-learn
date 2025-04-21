import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { TokenJWT } from '../../models/token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  login(data: { username: string; password: string }): Observable<TokenJWT> {
    return this.http.post<TokenJWT>('https://dummyjson.com/auth/login', data);
  }
  register(): Observable<User> {
    return this.http.get<User>('https://dummyjson.com/users/add');
  }
}

import { ToastService } from './../service/toast/toast.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        } else if (error.status == 400) {
          this.toastService.show('Resoure not found', 'danger');
        } else if (error.status == 500) {
          this.toastService.show('Server error', 'danger');
        } else {
          this.toastService.show('An unexpected error occured', 'danger');
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        this.logout();
        return throwError(() => new Error('No refresh token'));
      }

      // Gọi API refresh token
      return this.http
        .post<any>('https://dummyjson.com/auth/refresh', { refreshToken })
        .pipe(
          switchMap((response) => {
            const newAccessToken = response.accessToken;
            const newRefreshToken = response.refreshToken;
            console.log('get refreshToken');
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            this.refreshTokenSubject.next(newAccessToken);
            this.isRefreshing = false;

            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });

            return next.handle(clonedRequest);
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.logout();
            return throwError(() => err);
          })
        );
    } else {
      // Nếu đang trong quá trình refresh, đợi kết quả
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(clonedRequest);
        })
      );
    }
  }

  private logout() {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('userId', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('imageUrl', '');
    localStorage.setItem('login', 'false');
    this.router.navigate(['/']);
  }
}

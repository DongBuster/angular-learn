import { AuthService } from './../../core/service/auth/auth.service';
import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastComponent } from '../../component/toast/toast.component';
import { ToastService } from '../../core/service/toast/toast.service';
import { AuthRepository } from '../../core/repository/auth.repository';

declare var google: any;

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastComponent,
  ],
  templateUrl: './authPage.component.html',
  styleUrls: ['./authPage.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  fullName: string = '';

  private gg: any;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  authRepo = inject(AuthRepository);

  ngOnInit() {
    google.accounts.id.initialize({
      client_id:
        '733938014099-2bj61a84ak7qskhniihuvcrirk7cq7oj.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.loginWithGoogle(resp);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      // type: 'icon',
    });
  }

  ngAfterViewInit() {
    this.toastService.register(this.toastComponent);
  }
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    // Reset form fields when switching modes
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
    this.fullName = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authRepo
        .login({ username: this.username, password: this.password })
        .pipe(
          catchError((error) => {
            this.toastService.show('Đăng nhập không thành công!', 'danger');
            return throwError(() => error);
          })
        )
        .subscribe((res) => {
          this.router.navigate(['/home']);
          this.authService.saveDataLocalStorage(res);
        });
    } else {
      // Registration logic
      if (this.password !== this.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      console.log('Registration attempt:', {
        username: this.username,
        password: this.password,
        email: this.email,
        fullName: this.fullName,
      });
    }
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
    // this.toastService.show('Google login coming soon!', 'info');
  }

  onGoogleLoginClick(): void {
    // this.gg.requestAccessToken(); // kích hoạt hiển thị Google One Tap (nếu muốn)
    // hoặc dùng: google.accounts.id.request() nếu bạn dùng Identity Services Credential API
  }
  loginWithFacebook() {
    // TODO: Implement Facebook login
    this.toastService.show('Facebook login coming soon!', 'info');
  }
}

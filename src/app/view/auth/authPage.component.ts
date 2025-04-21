import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastComponent } from '../../component/toast/toast.component';
import { ToastService } from '../../core/service/toast/toast.service';
import { AuthService } from '../../core/service/auth/auth.service';

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
  messageError: string = '';
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  constructor(private router: Router, private toastService: ToastService) {}
  authService = inject(AuthService);
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
      this.authService
        .login({ username: this.username, password: this.password })
        .pipe(
          catchError((error) => {
            this.messageError = 'Đăng nhập không thành công!';
            this.toastService.show('Đăng nhập không thành công!', 'danger');

            return throwError(() => error);
          })
        )
        .subscribe((res) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('userId', res.id.toString());
          localStorage.setItem('userName', res.username);
          localStorage.setItem('imageUrl', res.image);
          localStorage.setItem('login', 'true');
          this.router.navigate(['/home']);
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
}

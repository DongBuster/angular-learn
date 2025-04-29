import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, throwError, timeout, TimeoutError } from 'rxjs';
import { ToastComponent } from '../../../component/toast/toast.component';
import { AuthService } from '../../../core/service/auth/auth.service';
import { ToastService } from '../../../core/service/toast/toast.service';
import { AuthRepository } from '../../../core/repository/auth.repository';
import { ScreenLoadingComponent } from '../../../component/loading/screenLoading/screenLoading.component';

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
    ScreenLoadingComponent,
  ],
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.css'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  isLoading: boolean = false;

  authForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  authRepo = inject(AuthRepository);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '733938014099-2bj61a84ak7qskhniihuvcrirk7cq7oj.apps.googleusercontent.com',
      prompt_parent_id: 'google-btn',
      callback: (resp: any) => {
        this.authService.loginWithGoogle(resp);
      },
    });
    google.accounts.id.prompt();
    // tạo button
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      type: 'standard',
      text: 'signin',
    });
  }

  onSubmit() {
    this.isLoading = true;
    const startTime = Date.now();

    this.authRepo
      .login({
        username: this.authForm.get('userName')!.value,
        password: this.authForm.get('password')!.value,
      })
      .pipe(
        timeout(10000), // Timeout after 10 seconds
        catchError((error) => {
          this.isLoading = false;
          if (error instanceof TimeoutError) {
            this.toastService.Error('Kết nối quá chậm. Vui lòng thử lại sau!');
          } else {
            this.toastService.Error('Đăng nhập không thành công!');
          }
          return throwError(() => error);
        })
      )
      .subscribe((res) => {
        this.authService.saveDataLocalStorage(res);

        // Calculate remaining time to ensure minimum 2 seconds loading
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);

        // Wait for remaining time before hiding loading and navigating
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/home'], { replaceUrl: true });
        }, remainingTime);
      });
  }
  get userName() {
    return this.authForm.get('userName');
  }
  get password() {
    return this.authForm.get('password');
  }

  navigateToPage() {
    this.router.navigate(['/register'], { replaceUrl: true });
  }

  onGoogleLoginClick(): void {
    // this.gg.requestAccessToken(); // kích hoạt hiển thị Google One Tap (nếu muốn)
    // hoặc dùng: google.accounts.id.request() nếu bạn dùng Identity Services Credential API
  }
  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }
}

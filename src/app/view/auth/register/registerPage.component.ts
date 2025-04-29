import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastComponent } from '../../../component/toast/toast.component';
import { AuthService } from '../../../core/service/auth/auth.service';
import { ToastService } from '../../../core/service/toast/toast.service';
import { AuthRepository } from '../../../core/repository/auth.repository';

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
  templateUrl: './registerPage.component.html',
  styleUrls: ['./registerPage.component.css'],
})
export class RegisterPageComponent {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  authForm: FormGroup = new FormGroup(
    {
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator() }
  );
  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService
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

  get userName() {
    return this.authForm.get('userName');
  }
  get password() {
    return this.authForm.get('password');
  }
  get confirmPassword() {
    return this.authForm.get('confirmPassword');
  }
  get email() {
    return this.authForm.get('email');
  }
  get name() {
    return this.authForm.get('name');
  }

  onSubmit() {
    // this.authRepo
    //   .login({ username: this.username, password: this.password })
    //   .pipe(
    //     catchError((error) => {
    //       this.toastService.Error('Đăng nhập không thành công!');
    //       return throwError(() => error);
    //     })
    //   )
    //   .subscribe((res) => {
    //     this.router.navigate(['/login'], { replaceUrl: true });
    //     this.authService.saveDataLocalStorage(res);
    //   });
    // }
  }
  navigateToPage() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  onGoogleLoginClick(): void {
    // this.gg.requestAccessToken(); // kích hoạt hiển thị Google One Tap (nếu muốn)
    // hoặc dùng: google.accounts.id.request() nếu bạn dùng Identity Services Credential API
  }
  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };
}

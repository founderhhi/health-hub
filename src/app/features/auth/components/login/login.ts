import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../core/api/auth.service';
import { redirectAfterLogin } from '../../../../shared/guards/role.guard';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  form: FormGroup;
  submitting = signal(false);
  showPassword = false;
  errorMessage = '';
  logoLoadFailed = false;
  loginRole: 'patient' | 'provider' = 'patient';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authApi: AuthApiService
  ) {
    this.form = this.fb.group({
      countryCode: ['+1', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

    this.route.queryParamMap.subscribe((params) => {
      const role = params.get('role');
      this.loginRole = role === 'provider' ? 'provider' : 'patient';
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage = '';

    const phone = `${this.form.get('countryCode')?.value}${this.form.get('phone')?.value}`;
    const password = this.form.get('password')?.value;

    this.authApi.login(phone, password).subscribe({
      next: (response) => {
        this.submitting.set(false);
        redirectAfterLogin(response.user.role, this.router);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        if (err.status === 403 && err.error?.error === 'Account is pending manual verification') {
          this.errorMessage = 'Your account is pending manual verification. An admin will contact you offline before access is enabled.';
          return;
        }
        if (err.status === 403 && err.error?.error === 'Account is disabled') {
          this.errorMessage = 'This account is disabled. Please contact support.';
          return;
        }
        if (err.status === 429) {
          this.errorMessage = 'Too many login attempts. Please try again in a minute.';
          return;
        }
        this.errorMessage = 'Invalid phone or password';
      }
    });
  }

  forgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }

  goToSignup(): void {
    this.router.navigate(['/auth/signup'], {
      queryParams: this.loginRole === 'provider' ? { role: 'provider' } : {}
    });
  }

  switchLoginRole(role: 'patient' | 'provider'): void {
    if (this.loginRole === role) {
      return;
    }

    this.errorMessage = '';
    this.loginRole = role;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { role },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  goToLanding(): void {
    this.router.navigate(['/landing']);
  }

  handleLogoError(): void {
    this.logoLoadFailed = true;
  }
}

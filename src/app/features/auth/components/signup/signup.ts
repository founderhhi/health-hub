import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'; // [AGENT_PATIENT] ISS-11: import AbstractControl, ValidationErrors for custom validators
import { AuthApiService } from '../../../../core/api/auth.service';

// [AGENT_PATIENT] ISS-11: Custom validators to match backend password policy (auth.ts validatePassword)
function requireUppercase(control: AbstractControl): ValidationErrors | null {
  return /[A-Z]/.test(control.value || '') ? null : { requireUppercase: true };
}
function requireLowercase(control: AbstractControl): ValidationErrors | null {
  return /[a-z]/.test(control.value || '') ? null : { requireLowercase: true };
}
function requireDigit(control: AbstractControl): ValidationErrors | null {
  return /\d/.test(control.value || '') ? null : { requireDigit: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent {
  form: FormGroup;
  submitting = signal(false);
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authApi: AuthApiService
  ) {
    this.form = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(2)]],
      countryCode: ['+1', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8), requireUppercase, requireLowercase, requireDigit]] // [AGENT_PATIENT] ISS-11: align frontend validators with backend password policy
    });
  }

  /**
   * Toggle password visibility
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle form submission
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage = '';

    const displayName = this.form.get('displayName')?.value;
    const phone = `${this.form.get('countryCode')?.value}${this.form.get('phone')?.value}`;
    const password = this.form.get('password')?.value;

    this.authApi.signup(phone, password, displayName).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/patient/dashboard']);
      },
      error: (err: any) => { // [AGENT_PATIENT] ISS-11: surface backend-specific password policy errors
        this.submitting.set(false);
        this.errorMessage = err?.error?.error || 'Unable to create account. Try a different phone number.';
      }
    });
  }

  /**
   * Navigate to login
   */
  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

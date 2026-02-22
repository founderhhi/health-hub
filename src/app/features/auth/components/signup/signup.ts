import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../core/api/auth.service';

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
      password: ['', [Validators.required, Validators.minLength(8)]]
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
      error: () => {
        this.submitting.set(false);
        this.errorMessage = 'Unable to create account. Try a different phone number.';
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

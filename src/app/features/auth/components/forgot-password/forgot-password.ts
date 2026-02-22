import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../core/api/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordComponent {
  form: FormGroup;
  submitting = signal(false);
  statusMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authApi: AuthApiService
  ) {
    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.statusMessage = '';
      return;
    }

    this.submitting.set(true);

    const phone = this.form.get('phone')?.value;

    this.authApi.forgotPassword(phone).subscribe({
      next: (response) => {
        this.statusMessage = response.message || 'If this phone number is registered, you will receive reset instructions.';
        this.submitting.set(false);
      },
      error: () => {
        this.statusMessage = 'If this phone number is registered, you will receive reset instructions.';
        this.submitting.set(false);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

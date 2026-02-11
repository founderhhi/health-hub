import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    private router: Router
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
    this.statusMessage = `If an account exists for ${phone}, reset instructions will be sent shortly.`;

    this.submitting.set(false);
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

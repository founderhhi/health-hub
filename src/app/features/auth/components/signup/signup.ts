import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';

type Gender = 'male' | 'female' | 'other';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent {

  private readonly router = inject(Router);

  
  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),

    phone: new FormControl<string | null>(null, {
      validators: [Validators.pattern(/^[0-9]{10}$/)]
    }),

    gender: new FormControl<Gender | null>(null, {
      validators: [Validators.required]
    }),

    dateOfBirth: new FormControl<string | null>(null, {
      validators: [Validators.required]
    })
  });

  /** Signal for submit state (enterprise-friendly) */
  readonly submitting = signal(false);

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    // API call would go here

    this.router.navigate(['/login']);
  }
}

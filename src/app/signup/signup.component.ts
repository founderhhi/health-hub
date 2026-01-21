import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Validation Getters
  get hasUpper() { return /[A-Z]/.test(this.userData.password); }
  get hasNumber() { return /[0-9]/.test(this.userData.password); }
  get hasSpecial() { return /[^A-Za-z0-9]/.test(this.userData.password); }

  passwordsMatch(): boolean {
    if (!this.userData.confirmPassword) return true;
    return this.userData.password === this.userData.confirmPassword;
  }

  getStrength() {
    let score = 0;
    if (this.userData.password.length >= 12) score++;
    if (this.hasUpper) score++;
    if (this.hasNumber) score++;
    if (this.hasSpecial) score++;

    const levels = [
      { label: 'Weak', color: '#ef4444' },
      { label: 'Fair', color: '#f59e0b' },
      { label: 'Good', color: '#10b981' },
      { label: 'Excellent', color: '#0f766e' }
    ];
    return levels[score - 1] || { label: 'None', color: '#94a3b8' };
  }

  onSubmit() {
    console.log('Form Submitted', this.userData);
  }
}
import { Component, HostBinding } from '@angular/core';
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
  // Theme State
  currentTheme: 'light' | 'dark' | 'accessible' = 'light';

  userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // --- Theme Logic ---
  
  toggleTheme(): void {
    // Cycles between light and dark
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }

  setTheme(theme: 'light' | 'dark' | 'accessible'): void {
    // Explicitly set theme (used for the Contrast button)
    this.currentTheme = theme;
  }

  // --- Password Validation Engine ---

  get hasUpper(): boolean { 
    return /[A-Z]/.test(this.userData.password); 
  }

  get hasNumber(): boolean { 
    return /[0-9]/.test(this.userData.password); 
  }

  get hasSpecial(): boolean { 
    return /[^A-Za-z0-9]/.test(this.userData.password); 
  }

  passwordsMatch(): boolean {
    if (!this.userData.confirmPassword) return true;
    return this.userData.password === this.userData.confirmPassword;
  }

  getStrength() {
    let score = 0;
    
    // Logic: 12+ chars, Upper, Number, Special
    if (this.userData.password.length >= 12) score++;
    if (this.hasUpper) score++;
    if (this.hasNumber) score++;
    if (this.hasSpecial) score++;

    const levels = [
      { label: 'Weak', color: '#ef4444' },    // 1 match
      { label: 'Fair', color: '#f59e0b' },    // 2 matches
      { label: 'Good', color: '#10b981' },    // 3 matches
      { label: 'Excellent', color: '#0f766e' } // 4 matches
    ];

    // Return the level based on score, default to "None" if empty
    return score > 0 ? levels[score - 1] : { label: 'None', color: '#94a3b8' };
  }

  // --- Actions ---

  onSubmit(): void {
    if (this.getStrength().label !== 'Weak' && this.passwordsMatch()) {
      console.log('Practitioner Data Verified:', this.userData);
      // Proceed with API call or Auth service
    }
  }
}
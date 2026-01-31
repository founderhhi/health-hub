import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password = '';

  // Interactive password strength logic
  getStrength() {
    let score = 0;

    if (!this.password) {
      return { width: '0%', color: '#ddd', label: '' };
    }

    if (this.password.length > 6) score++;
    if (/[A-Z]/.test(this.password)) score++;
    if (/[0-9]/.test(this.password)) score++;
    if (/[^A-Za-z0-9]/.test(this.password)) score++;

    const results = [
      { width: '25%', color: '#ff4d4d', label: 'Weak' },
      { width: '50%', color: '#ffa500', label: 'Fair' },
      { width: '75%', color: '#2dd4bf', label: 'Good' },
      { width: '100%', color: '#0f766e', label: 'Strong' }
    ];

    return results[score - 1] || results[0];
  }
}

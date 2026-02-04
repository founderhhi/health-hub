import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    avatar: 'SJ',
    phone: '+1 700 000 0001'
  };

  menuItems = [
    { icon: 'user', label: 'Personal Information', route: '/patient/profile/edit' },
    { icon: 'shield', label: 'Privacy & Security', route: '/patient/privacy' },
    { icon: 'bell', label: 'Notifications', route: '/patient/notifications' },
    { icon: 'settings', label: 'App Settings', route: '/patient/settings' },
    { icon: 'users', label: 'Family Members', route: '/patient/family' },
    { icon: 'help', label: 'Help & Support', route: '/patient/support' }
  ];

  constructor(public router: Router) {}

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('hhi_auth_token');
    localStorage.removeItem('hhi_user_role');
    localStorage.removeItem('hhi_user_id');
    this.router.navigate(['/landing']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PatientApiService } from '../../../core/api/patient.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  loading = true;
  user: { name: string; phone: string; avatar: string } | null = null;

  menuItems = [
    { icon: 'bell', label: 'Notifications', route: '/patient/notifications' }
  ];

  constructor(
    public router: Router,
    private patientApi: PatientApiService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;

    this.patientApi.getProfile().subscribe({
      next: (res) => {
        const u = res.user;
        this.user = {
          name: u.display_name || u.full_name || u.name || localStorage.getItem('hhi_display_name') || 'Patient',
          phone: u.phone || '',
          avatar: this.getInitials(u.display_name || u.full_name || u.name || localStorage.getItem('hhi_display_name') || 'Patient')
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
        this.user = {
          name: 'Patient',
          phone: '',
          avatar: 'P'
        };
        this.loading = false;
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return 'P';
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('hhi_auth_token');
    localStorage.removeItem('hhi_user_role');
    localStorage.removeItem('hhi_user_id');
    localStorage.removeItem('hhi_display_name');
    this.router.navigate(['/landing']);
  }
}

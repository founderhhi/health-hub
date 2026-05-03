import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from '../../../core/api/auth.service';

interface AdminProfileViewModel {
  id: string;
  displayName: string;
  phone: string;
  role: string;
  accountStatus: string;
}

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.scss'
})
export class AdminProfileComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  loading = true;
  errorMessage = '';
  profile: AdminProfileViewModel = {
    id: '—',
    displayName: 'Admin User',
    phone: '—',
    role: 'admin',
    accountStatus: 'active'
  };

  constructor(
    private router: Router,
    private authApi: AuthApiService
  ) {}

  ngOnInit(): void {
    this.hydrateProfile();
  }

  get profileInitial(): string {
    const seed = this.profile.displayName.trim() || this.profile.role.trim() || 'A';
    return seed.charAt(0).toUpperCase();
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  signOut(): void {
    this.authApi.logout().subscribe({
      next: () => {
        this.authApi.clearSession();
        this.router.navigate(['/landing']);
      },
      error: () => {
        this.authApi.clearSession();
        this.router.navigate(['/landing']);
      }
    });
  }

  private hydrateProfile(): void {
    const fallbackProfile = this.buildFallbackProfile();

    this.authApi.validate().subscribe({
      next: (response) => {
        this.profile = {
          id: response.user.id || fallbackProfile.id,
          displayName: response.user.display_name || fallbackProfile.displayName,
          phone: response.user.phone || fallbackProfile.phone,
          role: response.user.role || fallbackProfile.role,
          accountStatus: response.user.account_status || fallbackProfile.accountStatus
        };
        this.loading = false;
      },
      error: () => {
        this.profile = fallbackProfile;
        this.errorMessage = 'Unable to refresh your admin details right now.';
        this.loading = false;
      }
    });
  }

  private buildFallbackProfile(): AdminProfileViewModel {
    return {
      id: this.readStorage('hhi_user_id') || '—',
      displayName: this.readStorage('hhi_display_name') || 'Admin User',
      phone: '—',
      role: this.readStorage('hhi_user_role') || 'admin',
      accountStatus: 'active'
    };
  }

  private readStorage(key: string): string {
    if (!isPlatformBrowser(this.platformId)) {
      return '';
    }
    return localStorage.getItem(key) || '';
  }
}

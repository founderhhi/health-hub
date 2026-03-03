import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../../core/api/auth.service';
import { GpApiService } from '../../../../core/api/gp.service';
import { ProviderProfileData, ProviderProfileService } from '../../../../core/services/provider-profile.service';
import { OperationalStatusToggleComponent } from '../../../../shared/components/operational-status-toggle/operational-status-toggle';

@Component({
  selector: 'app-gp-profile',
  standalone: true,
  imports: [CommonModule, OperationalStatusToggleComponent],
  templateUrl: './gp-profile.html',
  styleUrl: './gp-profile.scss'
})
export class GpProfileComponent implements OnInit {
  profile!: ProviderProfileData;
  settingsNotice = '';

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private gpApi: GpApiService,
    private providerProfileService: ProviderProfileService
  ) {}

  ngOnInit(): void {
    this.profile = this.providerProfileService.getProfile('gp');
    this.gpApi.getOperationalStatus().subscribe({
      next: (response) => {
        const operational = response.operational !== false;
        this.profile = { ...this.profile, operational };
        this.providerProfileService.setOperationalStatus('gp', operational);
      },
      error: (err) => {
        console.error('Failed to load GP operational status:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/gp']);
  }

  updateOperationalStatus(isOperating: boolean): void {
    const previous = this.profile.operational;
    this.profile = { ...this.profile, operational: isOperating };
    this.gpApi.updateOperationalStatus(isOperating).subscribe({
      next: (response) => {
        const operational = response.operational !== false;
        this.profile = { ...this.profile, operational };
        this.providerProfileService.setOperationalStatus('gp', operational);
      },
      error: (err) => {
        console.error('Failed to update GP operational status:', err);
        this.profile = { ...this.profile, operational: previous };
        this.settingsNotice = 'Unable to update operational status right now.';
        setTimeout(() => {
          this.settingsNotice = '';
        }, 3000);
      }
    });
  }

  openSettings(): void {
    this.settingsNotice = 'Advanced settings are coming soon.';
    setTimeout(() => {
      this.settingsNotice = '';
    }, 3000);
  }

  signOut(): void {
    this.authApi.logout().subscribe({
      next: () => {
        this.authApi.clearSession();
        this.router.navigate(['/landing']);
      }
    });
  }
}

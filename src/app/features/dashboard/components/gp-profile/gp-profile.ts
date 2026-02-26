import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../../core/api/auth.service';
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
    private providerProfileService: ProviderProfileService
  ) {}

  ngOnInit(): void {
    this.profile = this.providerProfileService.getProfile('gp');
  }

  goBack(): void {
    this.router.navigate(['/gp']);
  }

  updateOperationalStatus(isOperating: boolean): void {
    this.profile = { ...this.profile, operational: isOperating };
    this.providerProfileService.setOperationalStatus('gp', isOperating);
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OperationalStatusToggleComponent } from '../../../shared/components/operational-status-toggle/operational-status-toggle';
import { AuthApiService } from '../../../core/api/auth.service';
import { ProviderProfileData, ProviderProfileService } from '../../../core/services/provider-profile.service';
import { BottomNavComponent, DIAGNOSTICS_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-diagnostics-profile',
  standalone: true,
  imports: [CommonModule, OperationalStatusToggleComponent, BottomNavComponent],
  templateUrl: './diagnostics-profile.html',
  styleUrl: './diagnostics-profile.scss'
})
export class DiagnosticsProfileComponent implements OnInit {
  DIAGNOSTICS_TABS = DIAGNOSTICS_TABS;
  profile!: ProviderProfileData;

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private providerProfileService: ProviderProfileService
  ) {}

  ngOnInit(): void {
    this.profile = this.providerProfileService.getProfile('diagnostics');
  }

  goBack(): void {
    this.router.navigate(['/diagnostics']);
  }

  updateOperationalStatus(isOperating: boolean): void {
    this.profile = { ...this.profile, operational: isOperating };
    this.providerProfileService.setOperationalStatus('diagnostics', isOperating);
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

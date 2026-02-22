import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthApiService } from '../../../core/api/auth.service';
import { ProviderProfileData, ProviderProfileService } from '../../../core/services/provider-profile.service';
import { OperationalStatusToggleComponent } from '../../../shared/components/operational-status-toggle/operational-status-toggle';

@Component({
  selector: 'app-specialist-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, OperationalStatusToggleComponent],
  templateUrl: './specialist-profile.html',
  styleUrl: './specialist-profile.scss'
})
export class SpecialistProfileComponent implements OnInit {
  profile!: ProviderProfileData;

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private providerProfileService: ProviderProfileService
  ) {}

  ngOnInit(): void {
    this.profile = this.providerProfileService.getProfile('specialist');
  }

  goBack(): void {
    this.router.navigate(['/specialist']);
  }

  updateOperationalStatus(isOperating: boolean): void {
    this.profile = { ...this.profile, operational: isOperating };
    this.providerProfileService.setOperationalStatus('specialist', isOperating);
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

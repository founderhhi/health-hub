import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../core/api/auth.service';
import { ProviderProfileData, ProviderProfileService } from '../../../core/services/provider-profile.service';
import { OperationalStatusToggleComponent } from '../../../shared/components/operational-status-toggle/operational-status-toggle';

@Component({
  selector: 'app-pharmacy-profile',
  standalone: true,
  imports: [CommonModule, OperationalStatusToggleComponent],
  templateUrl: './pharmacy-profile.html',
  styleUrl: './pharmacy-profile.scss'
})
export class PharmacyProfileComponent implements OnInit {
  profile!: ProviderProfileData;

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private providerProfileService: ProviderProfileService
  ) {}

  ngOnInit(): void {
    this.profile = this.providerProfileService.getProfile('pharmacy');
  }

  goBack(): void {
    this.router.navigate(['/pharmacy/scanner']);
  }

  updateOperationalStatus(isOperating: boolean): void {
    this.profile = { ...this.profile, operational: isOperating };
    this.providerProfileService.setOperationalStatus('pharmacy', isOperating);
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

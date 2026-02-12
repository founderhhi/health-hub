import { Injectable } from '@angular/core';

export interface ProviderProfileData {
  username: string;
  facilityName: string;
  registrationNumber: string;
  address: string;
  phoneNumber: string;
  operational: boolean;
}

type ProviderPortal = 'diagnostics' | 'pharmacy';

@Injectable({ providedIn: 'root' })
export class ProviderProfileService {
  private readonly diagnosticsKey = 'hhi_diagnostics_operational';
  private readonly pharmacyKey = 'hhi_pharmacy_operational';

  getProfile(portal: ProviderPortal): ProviderProfileData {
    const username = this.readStorage('hhi_display_name')
      || this.readStorage('hhi_user_id')
      || 'provider_user_001';

    if (portal === 'diagnostics') {
      return {
        username,
        facilityName: 'CityLab Diagnostics Center',
        registrationNumber: 'DX-REG-2024-12345',
        address: '123 Health Street, Medical District, Nairobi, Kenya',
        phoneNumber: '+254 712 345 678',
        operational: this.getOperationalStatus(this.diagnosticsKey)
      };
    }

    return {
      username,
      facilityName: 'HealthPlus Pharmacy - Westlands Branch',
      registrationNumber: 'PH-REG-2024-67890',
      address: '88 Care Avenue, Westlands, Nairobi, Kenya',
      phoneNumber: '+254 700 555 123',
      operational: this.getOperationalStatus(this.pharmacyKey)
    };
  }

  setOperationalStatus(portal: ProviderPortal, operational: boolean): void {
    const key = portal === 'diagnostics' ? this.diagnosticsKey : this.pharmacyKey;
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, String(operational));
    }
  }

  private getOperationalStatus(key: string): boolean {
    const stored = this.readStorage(key);
    if (stored === null) {
      return true;
    }
    return stored === 'true';
  }

  private readStorage(key: string): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem(key);
  }
}

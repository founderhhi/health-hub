import { Injectable } from '@angular/core';

export interface ProviderProfileData {
  username: string;
  facilityName: string;
  registrationNumber: string;
  address: string;
  phoneNumber: string;
  operational: boolean;
}

type ProviderPortal = 'diagnostics' | 'pharmacy' | 'gp' | 'specialist';

@Injectable({ providedIn: 'root' })
export class ProviderProfileService {
  private readonly diagnosticsKey = 'hhi_diagnostics_operational';
  private readonly pharmacyKey = 'hhi_pharmacy_operational';
  private readonly gpKey = 'hhi_gp_operational';
  private readonly specialistKey = 'hhi_specialist_operational';

  getProfile(portal: ProviderPortal): ProviderProfileData {
    const username = this.readStorage('hhi_display_name')
      || this.readStorage('hhi_user_id')
      || 'provider_user_001';

    switch (portal) {
      case 'diagnostics':
        return {
          username,
          facilityName: 'CityLab Diagnostics Center',
          registrationNumber: 'DX-REG-2024-12345',
          address: '123 Health Street, Medical District, Nairobi, Kenya',
          phoneNumber: '+254 712 345 678',
          operational: this.getOperationalStatus(this.diagnosticsKey)
        };

      case 'pharmacy':
        return {
          username,
          facilityName: 'HealthPlus Pharmacy - Westlands Branch',
          registrationNumber: 'PH-REG-2024-67890',
          address: '88 Care Avenue, Westlands, Nairobi, Kenya',
          phoneNumber: '+254 700 555 123',
          operational: this.getOperationalStatus(this.pharmacyKey)
        };

      case 'gp':
        return {
          username,
          facilityName: 'Dr. John Smith',
          registrationNumber: 'GP-REG-2024-001',
          address: 'General Practitioner',
          phoneNumber: '+254 712 345 678',
          operational: this.getOperationalStatus(this.gpKey)
        };

      case 'specialist':
        return {
          username,
          facilityName: 'Dr. Jane Doe',
          registrationNumber: 'SP-REG-2024-001',
          address: 'Cardiologist',
          phoneNumber: '+254 712 345 679',
          operational: this.getOperationalStatus(this.specialistKey)
        };

      default:
        return {
          username,
          facilityName: 'Unknown Provider',
          registrationNumber: 'N/A',
          address: 'N/A',
          phoneNumber: 'N/A',
          operational: true
        };
    }
  }

  setOperationalStatus(portal: ProviderPortal, operational: boolean): void {
    let key: string;
    switch (portal) {
      case 'diagnostics':
        key = this.diagnosticsKey;
        break;
      case 'pharmacy':
        key = this.pharmacyKey;
        break;
      case 'gp':
        key = this.gpKey;
        break;
      case 'specialist':
        key = this.specialistKey;
        break;
      default:
        return;
    }

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

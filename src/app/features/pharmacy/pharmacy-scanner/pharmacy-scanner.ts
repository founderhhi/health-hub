import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PharmacyApiService } from '../../../core/api/pharmacy.service';

@Component({
  selector: 'app-pharmacy-scanner',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pharmacy-scanner.html',
  styleUrl: './pharmacy-scanner.scss',
})
export class PharmacyScannerComponent {
  // TODO: wire scanner/QR camera integration
  code = '';
  errorMessage = '';

  constructor(private pharmacyApi: PharmacyApiService, private router: Router) {}

  manualLookup(): void {
    if (!this.code) {
      this.errorMessage = 'Enter a prescription code.';
      return;
    }
    this.errorMessage = '';
    this.pharmacyApi.lookupByCode(this.code.trim()).subscribe({
      next: (response) => {
        this.router.navigate(['/pharmacy/prescription', response.prescription.id]);
      },
      error: () => {
        this.errorMessage = 'Prescription not found.';
      }
    });
  }
}

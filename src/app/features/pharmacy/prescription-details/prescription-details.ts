import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { PharmacyApiService } from '../../../core/api/pharmacy.service';

@Component({
  selector: 'app-prescription-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prescription-details.html',
  styleUrl: './prescription-details.scss',
})
export class PrescriptionDetailsComponent implements OnInit {
  prescription: any;
  loading = true;
  errorMessage = '';
  readonly unavailableActionsReason = 'Not available yet: backend dispense tracking is still in development.';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prescriptionsApi: PrescriptionsApiService,
    private pharmacyApi: PharmacyApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Prescription not found.';
      this.loading = false;
      return;
    }
    this.prescriptionsApi.getById(id).subscribe({
      next: (response) => {
        this.prescription = response.prescription;
        if (!Array.isArray(this.prescription?.items)) {
          this.prescription.items = [];
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load prescription.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/pharmacy']);
  }

  completeDispensing(): void {
    if (!this.prescription?.id) return;
    this.pharmacyApi.claim(this.prescription.id).subscribe({
      next: (response) => {
        this.prescription = response.prescription;
      },
      error: () => {
        this.errorMessage = 'Unable to complete dispensing.';
      }
    });
  }

  flagIssue(): void {
    this.errorMessage = 'Issue flagged (demo).';
  }
}

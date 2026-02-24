import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { PharmacyApiService } from '../../../core/api/pharmacy.service';
import { BottomNavComponent, PHARMACY_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-prescription-details',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent],
  templateUrl: './prescription-details.html',
  styleUrl: './prescription-details.scss',
})
export class PrescriptionDetailsComponent implements OnInit {
  prescription: any;
  loading = true;
  errorMessage = '';
  readonly unavailableActionsReason = 'Individual item check-off is not yet available. Use "Complete Dispensing" to dispense all items at once.'; // [AGENT_PHARMACY] ISS-16: accurate reason — dispense endpoint works, but per-item tracking is not yet implemented
  PHARMACY_TABS = PHARMACY_TABS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prescriptionsApi: PrescriptionsApiService,
    private pharmacyApi: PharmacyApiService
  ) { }

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
    this.pharmacyApi.dispense(this.prescription.id).subscribe({ // [AGENT_PHARMACY] ISS-15: call dispense, not claim
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

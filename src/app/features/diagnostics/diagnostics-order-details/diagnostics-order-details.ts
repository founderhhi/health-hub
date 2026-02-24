import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { LabsApiService } from '../../../core/api/labs.service';
import { BottomNavComponent, DIAGNOSTICS_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-diagnostics-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule, BottomNavComponent],
  templateUrl: './diagnostics-order-details.html',
  styleUrl: './diagnostics-order-details.scss',
})
export class DiagnosticsOrderDetailsComponent implements OnInit {
  DIAGNOSTICS_TABS = DIAGNOSTICS_TABS;
  order: any;
  loading = true;
  errorMessage = '';
  printStatusMessage: string | null = null;
  readonly rejectOrderAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private labsApi: LabsApiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Order ID is missing.';
      this.loading = false;
      return;
    }

    this.errorMessage = '';
    this.labsApi.listDiagnosticsOrders().subscribe({
      next: (response) => {
        const found = response.orders.find((item) => item.id === id);
        if (found) {
          this.order = {
            ...found,
            tests: Array.isArray(found.tests) ? found.tests : []
          };
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Order not found.';
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load order details.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/diagnostics']);
  }

  acceptOrder(): void {
    if (!this.order?.id) {
      return;
    }
    this.labsApi.updateOrderStatus(this.order.id, 'in_progress').subscribe({
      next: (response) => {
        this.order = response.order;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Unable to update order status right now.';
      }
    });
  }

  rejectOrder(): void {
    if (!this.rejectOrderAvailable || !this.order?.id) {
      return;
    }
    this.labsApi.updateOrderStatus(this.order.id, 'completed', 'Cancelled').subscribe({
      next: (response) => {
        this.order = response.order;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Unable to update order status right now.';
      }
    });
  }

  printLabel(): void {
    this.printStatusMessage = 'Print request queued. Label printing integration is coming soon.';
  }

  getPatientInitials(): string {
    const name = this.order?.patient_name || '';
    if (!name) return 'PT';
    return name.slice(0, 2).toUpperCase();
  }

  getMaskedPhone(): string {
    const phone = this.order?.patient_phone || '1234';
    return phone.slice(-4);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { LabsApiService } from '../../../core/api/labs.service';

@Component({
  selector: 'app-diagnostics-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './diagnostics-order-details.html',
  styleUrl: './diagnostics-order-details.scss',
})
export class DiagnosticsOrderDetailsComponent implements OnInit {
  order: any;
  loading = true;
  printStatusMessage: string | null = null;
  readonly rejectOrderAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private labsApi: LabsApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.labsApi.listDiagnosticsOrders().subscribe({
      next: (response) => {
        const found = response.orders.find((item) => item.id === id);
        if (found) {
          this.order = {
            ...found,
            tests: Array.isArray(found.tests) ? found.tests : []
          };
        }
        this.loading = false;
      },
      error: () => {
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
      next: (response) => (this.order = response.order)
    });
  }

  rejectOrder(): void {
    if (!this.rejectOrderAvailable || !this.order?.id) {
      return;
    }
    this.labsApi.updateOrderStatus(this.order.id, 'completed', 'Cancelled').subscribe({
      next: (response) => (this.order = response.order)
    });
  }

  printLabel(): void {
    this.printStatusMessage = 'Print request queued. Label printing integration is coming soon.';
  }
}

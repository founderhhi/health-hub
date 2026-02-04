import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { LabsApiService } from '../../../core/api/labs.service';
import { WsService } from '../../../core/realtime/ws.service';

@Component({
  selector: 'app-diagnostics-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './diagnostics-orders.html',
  styleUrl: './diagnostics-orders.scss',
})
export class DiagnosticsOrdersComponent implements OnInit {
  orders: any[] = [];

  filtersExpanded = false;

  constructor(private labsApi: LabsApiService, private router: Router, private ws: WsService) {}

  ngOnInit(): void {
    this.loadOrders();
    this.ws.connect('lab_tech');
    this.ws.events$.subscribe((event) => {
      if (event.event === 'lab.status.updated') {
        this.loadOrders();
      }
    });
  }

  toggleFilters(): void {
    this.filtersExpanded = !this.filtersExpanded;
    console.log('TODO: toggleFilters', this.filtersExpanded);
  }

  viewOrder(id: string): void {
    this.router.navigate(['/diagnostics/order', id]);
  }

  private loadOrders(): void {
    this.labsApi.listDiagnosticsOrders().subscribe({
      next: (response) => {
        this.orders = response.orders.map((order) => ({
          ...order,
          tests: Array.isArray(order.tests) ? order.tests : []
        }));
      }
    });
  }
}

import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LabsApiService } from '../../../core/api/labs.service';
import { WsService } from '../../../core/realtime/ws.service';
import { ProfileButtonComponent } from '../../../shared/components/profile-button/profile-button';

interface DiagnosticsOrderView {
  id?: string;
  orderId: string;
  patientName: string;
  patientPhone: string;
  tests: string[];
  orderedDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Normal' | 'Urgent';
  isDemo?: boolean;
}

const DEMO_ORDERS: DiagnosticsOrderView[] = [
  {
    orderId: 'DX-2024-001',
    patientName: 'Sarah J.',
    patientPhone: '+254 7XX XXX 245',
    tests: ['Complete Blood Count (CBC)', 'Lipid Profile'],
    orderedDate: '3 days ago',
    status: 'Completed',
    priority: 'Normal',
    isDemo: true
  },
  {
    orderId: 'DX-2024-002',
    patientName: 'Michael C.',
    patientPhone: '+254 7XX XXX 891',
    tests: ['HbA1c Test', 'Fasting Blood Sugar'],
    orderedDate: '6 days ago',
    status: 'Completed',
    priority: 'Normal',
    isDemo: true
  },
  {
    orderId: 'DX-2024-003',
    patientName: 'Emma W.',
    patientPhone: '+254 7XX XXX 432',
    tests: ['Thyroid Panel (TSH, T3, T4)'],
    orderedDate: '8 days ago',
    status: 'Completed',
    priority: 'Urgent',
    isDemo: true
  },
  {
    orderId: 'DX-2024-004',
    patientName: 'James M.',
    patientPhone: '+254 7XX XXX 678',
    tests: ['Liver Function Test (LFT)'],
    orderedDate: '2 hours ago',
    status: 'Pending',
    priority: 'Normal',
    isDemo: true
  },
  {
    orderId: 'DX-2024-005',
    patientName: 'Lisa K.',
    patientPhone: '+254 7XX XXX 123',
    tests: ['Complete Metabolic Panel'],
    orderedDate: '4 hours ago',
    status: 'In Progress',
    priority: 'Urgent',
    isDemo: true
  }
];

@Component({
  selector: 'app-diagnostics-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProfileButtonComponent],
  templateUrl: './diagnostics-orders.html',
  styleUrl: './diagnostics-orders.scss',
})
export class DiagnosticsOrdersComponent implements OnInit {
  orders: DiagnosticsOrderView[] = [];

  filtersExpanded = false;
  orderIdSearch = '';
  statusFilter: 'All Status' | 'Pending' | 'In Progress' | 'Completed' = 'All Status';
  profileInitials = '';
  private platformId = inject(PLATFORM_ID);

  get hasActiveFilters(): boolean {
    return this.orderIdSearch.trim().length > 0 || this.statusFilter !== 'All Status';
  }

  get filteredOrders(): DiagnosticsOrderView[] {
    const normalizedSearch = this.orderIdSearch.trim().toLowerCase();

    return this.orders.filter((order) => {
      const orderMatch = !normalizedSearch || order.orderId.toLowerCase().includes(normalizedSearch);
      const statusMatch = this.statusFilter === 'All Status' || order.status === this.statusFilter;
      return orderMatch && statusMatch;
    });
  }

  constructor(private labsApi: LabsApiService, private router: Router, private ws: WsService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.profileInitials = this.getInitials(localStorage.getItem('hhi_display_name') || '');
    }
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
  }

  viewOrder(id: string): void {
    this.router.navigate(['/diagnostics/order', id]);
  }

  openProfile(): void {
    this.router.navigate(['/diagnostics/profile']);
  }

  clearFilters(): void {
    this.orderIdSearch = '';
    this.statusFilter = 'All Status';
  }

  getStatusClass(order: DiagnosticsOrderView): string {
    if (order.status === 'Completed') return 'badge-emergency';
    if (order.status === 'In Progress') return 'badge-urgent';
    return 'badge-routine';
  }

  viewLiveOrder(order: DiagnosticsOrderView): void {
    if (!order.id) {
      return;
    }
    this.viewOrder(order.id);
  }

  private loadOrders(): void {
    this.labsApi.listDiagnosticsOrders().subscribe({
      next: (response) => {
        const sourceOrders = Array.isArray(response.orders) ? response.orders : [];
        const mappedOrders = sourceOrders.map((order) => {
          const tests = Array.isArray(order.tests) ? order.tests : [];
          return {
            id: order.id,
            orderId: `DX-${String(order.id).slice(0, 8)}`,
            patientName: order.patient_name || 'Patient',
            patientPhone: order.patient_phone || '+254 7XX XXX XXX',
            tests,
            orderedDate: order.created_at ? new Date(order.created_at).toLocaleString() : 'Recently',
            status: this.normalizeStatus(order.status),
            priority: 'Normal' as const,
            isDemo: false
          };
        });
        this.orders = mappedOrders.length > 0 ? mappedOrders : DEMO_ORDERS;
      },
      error: () => {
        this.orders = DEMO_ORDERS;
      }
    });
  }

  private normalizeStatus(status: string | undefined): 'Pending' | 'In Progress' | 'Completed' {
    const normalized = (status || '').toLowerCase();
    if (normalized === 'completed') return 'Completed';
    if (normalized === 'in_progress' || normalized === 'in progress') return 'In Progress';
    return 'Pending';
  }

  private getInitials(value: string): string {
    if (!value.trim()) {
      return '';
    }
    return value
      .split(' ')
      .map((item) => item.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}

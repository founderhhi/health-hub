import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PharmacyApiService } from '../../../core/api/pharmacy.service';
import { BottomNavComponent, PHARMACY_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';

interface HistoryItem {
  id: string;
  code: string;
  patientName: string;
  itemCount: number;
  time: string;
  timestamp: number;
  dateGroup: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface FilterState {
  patientName: string;
  prescriptionId: string;
  status: string;
  dateRange: string;
}

@Component({
  selector: 'app-pharmacy-history',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BottomNavComponent],
  templateUrl: './pharmacy-history.html',
  styleUrl: './pharmacy-history.scss',
})
export class PharmacyHistoryComponent implements OnInit {
  loading = true;
  PHARMACY_TABS = PHARMACY_TABS;

  filters: FilterState = {
    patientName: '',
    prescriptionId: '',
    status: '',
    dateRange: ''
  };

  allHistoryItems: HistoryItem[] = [];
  filteredItems: HistoryItem[] = [];
  groupedItems: Map<string, HistoryItem[]> = new Map();

  private platformId = inject(PLATFORM_ID);

  constructor(private pharmacyApi: PharmacyApiService) { }

  ngOnInit(): void {
    this.loadFromBackend();
  }

  private loadFromBackend(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.loading = false;
      return;
    }
    this.pharmacyApi.getHistory().subscribe({
      next: (res) => {
        this.allHistoryItems = res.history.map((h: any) => this.mapToHistoryItem(h));
        this.loading = false;
        this.applyFilters();
      },
      error: () => {
        // Fallback to empty list
        this.allHistoryItems = [];
        this.loading = false;
        this.applyFilters();
      }
    });
  }

  private mapToHistoryItem(raw: any): HistoryItem {
    const claimedAt = new Date(raw.claimed_at);
    const items = Array.isArray(raw.items) ? raw.items : [];
    // [AGENT_PHARMACY] ISS-16: map backend statuses to UI display labels
    // fulfilled -> completed (dispensing finished), claimed -> pending (claimed but not yet dispensed)
    const status = raw.prescription_status === 'fulfilled' ? 'completed' as const
      : raw.prescription_status === 'claimed' ? 'pending' as const
        : 'cancelled' as const;

    return {
      id: raw.id,
      code: raw.code || 'N/A',
      patientName: raw.patient_name || 'Unknown',
      itemCount: items.length,
      time: claimedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: claimedAt.getTime(),
      dateGroup: this.formatDateGroup(claimedAt),
      status,
    };
  }

  private formatDateGroup(date: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const itemDay = new Date(date);
    itemDay.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today.getTime() - itemDay.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return `Today, ${date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`;
    if (diffDays === 1) return `Yesterday, ${date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`;
    return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.allHistoryItems];

    // Filter by patient name
    if (this.filters.patientName.trim()) {
      const searchTerm = this.filters.patientName.toLowerCase();
      filtered = filtered.filter(item =>
        item.patientName.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by prescription ID
    if (this.filters.prescriptionId.trim()) {
      const searchTerm = this.filters.prescriptionId.toUpperCase();
      filtered = filtered.filter(item =>
        item.code.toUpperCase().includes(searchTerm)
      );
    }

    // Filter by status
    if (this.filters.status) {
      filtered = filtered.filter(item => item.status === this.filters.status);
    }

    // Filter by date range
    if (this.filters.dateRange) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter(item => {
        const itemDate = new Date(item.timestamp);

        switch (this.filters.dateRange) {
          case 'today':
            return itemDate >= today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return itemDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return itemDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    this.filteredItems = filtered;
    this.groupItemsByDate();
  }

  private groupItemsByDate(): void {
    this.groupedItems = new Map();

    for (const item of this.filteredItems) {
      if (!this.groupedItems.has(item.dateGroup)) {
        this.groupedItems.set(item.dateGroup, []);
      }
      this.groupedItems.get(item.dateGroup)!.push(item);
    }
  }

  get groupedItemsKeys(): string[] {
    return Array.from(this.groupedItems.keys());
  }

  getItemsForGroup(groupKey: string): HistoryItem[] {
    return this.groupedItems.get(groupKey) || [];
  }

  hasResults(): boolean {
    return this.filteredItems.length > 0;
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completed':
        return 'check';
      case 'pending':
        return 'clock';
      case 'cancelled':
        return 'x';
      default:
        return 'check';
    }
  }

  clearFilters(): void {
    this.filters = {
      patientName: '',
      prescriptionId: '',
      status: '',
      dateRange: ''
    };
    this.applyFilters();
  }
}

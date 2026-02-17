import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pharmacy-history.html',
  styleUrl: './pharmacy-history.scss',
})
export class PharmacyHistoryComponent implements OnInit {
  readonly demoBannerText = 'Filters are active. Backend integration for live data in progress.';

  filters: FilterState = {
    patientName: '',
    prescriptionId: '',
    status: '',
    dateRange: ''
  };

  allHistoryItems: HistoryItem[] = [
    // Today
    { id: '1', code: 'RX-2024-001892', patientName: 'Sarah Johnson', itemCount: 4, time: '2:45 PM', timestamp: Date.now() - 2 * 60 * 60 * 1000, dateGroup: 'Today, January 15, 2024', status: 'completed' },
    { id: '2', code: 'RX-2024-001891', patientName: 'Michael Chen', itemCount: 2, time: '11:30 AM', timestamp: Date.now() - 5 * 60 * 60 * 1000, dateGroup: 'Today, January 15, 2024', status: 'completed' },
    { id: '3', code: 'RX-2024-001890', patientName: 'Emma Wilson', itemCount: 1, time: '9:15 AM', timestamp: Date.now() - 8 * 60 * 60 * 1000, dateGroup: 'Today, January 15, 2024', status: 'completed' },
    // Yesterday
    { id: '4', code: 'RX-2024-001889', patientName: 'James Davis', itemCount: 3, time: '4:20 PM', timestamp: Date.now() - 28 * 60 * 60 * 1000, dateGroup: 'Yesterday, January 14, 2024', status: 'completed' },
    { id: '5', code: 'RX-2024-001888', patientName: 'Olivia Parker', itemCount: 2, time: '2:10 PM', timestamp: Date.now() - 30 * 60 * 60 * 1000, dateGroup: 'Yesterday, January 14, 2024', status: 'cancelled' },
    // January 13
    { id: '6', code: 'RX-2024-001887', patientName: 'William Roberts', itemCount: 5, time: '5:45 PM', timestamp: Date.now() - 52 * 60 * 60 * 1000, dateGroup: 'January 13, 2024', status: 'completed' },
    { id: '7', code: 'RX-2024-001886', patientName: 'Sophia Lee', itemCount: 2, time: '11:00 AM', timestamp: Date.now() - 58 * 60 * 60 * 1000, dateGroup: 'January 13, 2024', status: 'pending' },
    { id: '8', code: 'RX-2024-001885', patientName: 'Lucas Martinez', itemCount: 1, time: '9:30 AM', timestamp: Date.now() - 60 * 60 * 60 * 1000, dateGroup: 'January 13, 2024', status: 'completed' },
  ];

  filteredItems: HistoryItem[] = [];
  groupedItems: Map<string, HistoryItem[]> = new Map();

  ngOnInit(): void {
    this.applyFilters();
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

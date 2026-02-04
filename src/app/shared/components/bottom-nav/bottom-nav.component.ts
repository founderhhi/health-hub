import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

/**
 * Tab interface for bottom navigation
 */
export interface BottomNavTab {
  /** Route path for navigation */
  route: string;
  /** Icon SVG path or component */
  icon: string;
  /** Tab label text */
  label: string;
  /** Unique identifier */
  id: string;
}

/**
 * Bottom Navigation Component
 * 
 * Provides mobile-friendly tab navigation for patient and provider portals.
 * Features:
 * - 4-tab layout (configurable)
 * - Active state highlighting with Emerald Green
 * - iOS safe area support
 * - Responsive height (64px mobile, 56px desktop)
 * 
 * Usage:
 * <app-bottom-nav 
 *   [tabs]="patientTabs" 
 *   [activeTab]="'home'">
 * </app-bottom-nav>
 */
@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent {
  /** Array of tab configurations */
  @Input() tabs: BottomNavTab[] = [];
  
  /** ID of currently active tab */
  @Input() activeTab: string = '';

  constructor(private router: Router) {}

  /**
   * Navigate to the selected tab route
   */
  onTabClick(tab: BottomNavTab): void {
    this.activeTab = tab.id;
    this.router.navigate([tab.route]);
  }

  /**
   * Check if a tab is currently active
   */
  isActive(tab: BottomNavTab): boolean {
    return this.activeTab === tab.id || this.router.url.startsWith(tab.route);
  }
}

/**
 * Predefined tab configurations for different portals
 */
export const PATIENT_TABS: BottomNavTab[] = [
  {
    id: 'appointments',
    route: '/patient/appointments',
    label: 'Appointments',
    icon: 'calendar'
  },
  {
    id: 'home',
    route: '/patient/dashboard',
    label: 'Home',
    icon: 'home'
  },
  {
    id: 'records',
    route: '/patient/records',
    label: 'Health Records',
    icon: 'folder'
  },
  {
    id: 'profile',
    route: '/patient/profile',
    label: 'Profile',
    icon: 'user'
  }
];

export const SPECIALIST_TABS: BottomNavTab[] = [
  {
    id: 'dashboard',
    route: '/provider/specialist/dashboard',
    label: 'Dashboard',
    icon: 'grid'
  },
  {
    id: 'patients',
    route: '/provider/specialist/patients',
    label: 'Patients',
    icon: 'users'
  },
  {
    id: 'consult',
    route: '/provider/specialist/consultation',
    label: 'Consult',
    icon: 'message'
  },
  {
    id: 'profile',
    route: '/provider/specialist/profile',
    label: 'Profile',
    icon: 'settings'
  }
];

export const PHARMACY_TABS: BottomNavTab[] = [
  {
    id: 'scan',
    route: '/provider/pharmacy/scanner',
    label: 'Scan',
    icon: 'scan'
  },
  {
    id: 'prescriptions',
    route: '/provider/pharmacy/prescription',
    label: 'Prescriptions',
    icon: 'file'
  },
  {
    id: 'history',
    route: '/provider/pharmacy/history',
    label: 'History',
    icon: 'clock'
  }
];

export const DIAGNOSTICS_TABS: BottomNavTab[] = [
  {
    id: 'orders',
    route: '/provider/diagnostics/orders',
    label: 'Orders',
    icon: 'grid'
  },
  {
    id: 'upload',
    route: '/provider/diagnostics/upload',
    label: 'Upload',
    icon: 'upload'
  },
  {
    id: 'reports',
    route: '/provider/diagnostics/reports',
    label: 'Reports',
    icon: 'file'
  }
];

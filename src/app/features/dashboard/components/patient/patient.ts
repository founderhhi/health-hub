import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface HealthStats {
  consultations: number;
  prescriptions: number;
  records: number;
}

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient.html',
  styleUrl: './patient.scss',
})
export class Patient {
  private readonly router = inject(Router);

  // User data
  userName: string = 'Sarah';
  notificationCount: number = 3;
  comingSoonMessage = '';

  // Health statistics
  stats: HealthStats = {
    consultations: 12,
    prescriptions: 8,
    records: 24
  };

  // Get greeting based on time of day
  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  /**
   * Navigate to specific service
   */
  navigateToService(service: string): void {
    switch(service) {
      case 'gp':
        this.router.navigate(['/patient-services/connect']);
        break;
      case 'healwell':
        this.router.navigate(['/heal-well/videos']);
        break;
      case 'specialist':
        this.router.navigate(['/specialist']);
        break;
      case 'pharmacy':
        this.router.navigate(['/pharmacy']);
        break;
      case 'diagnostics':
        this.showComingSoon('Diagnostics booking is coming soon.');
        break;
    }
  }

  /**
   * Show inline coming soon notification
   */
  showComingSoon(message: string = 'Coming soon! This feature will be available shortly.'): void {
    this.comingSoonMessage = message;
  }

  /**
   * View notifications
   */
  viewNotifications(): void {
    this.router.navigate(['/patient/notifications']);
  }

  // Legacy method - keeping for compatibility
  navigate(page: number) {
    switch(page) {
       case 1:
        this.router.navigate(['/heal-well/videos']);
        break;
       case 2:
        this.router.navigate(['/patient-services/connect']);
        break;
       case 3:
        this.router.navigate(['/specialist']);
        break;
       case 4:
        this.router.navigate(['/pharmacy']);
        break;
       case 5:
        this.showComingSoon('Diagnostics booking is coming soon.');
        break;
       case 6:
        this.showComingSoon('Travel and insurance is coming soon.');
        break;       
    }
  }
}

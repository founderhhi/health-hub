import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface HeroPill {
  label: string;
  icon: string;
  variant: string;
}

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  logoLoadFailed = false;

  /** 5×2 accordion pill rows for the hero artifact */
  readonly heroRows: HeroPill[][] = [
    [
      { label: '24/7 Health Expert', icon: 'video_camera_front', variant: 'primary' },
      { label: 'Smart Pharmacy', icon: 'local_pharmacy', variant: 'mint' },
    ],
    [
      { label: 'Advanced Diagnostics', icon: 'science', variant: 'surface' },
      { label: 'Health Records', icon: 'folder_managed', variant: 'white' },
    ],
    [
      { label: 'Specialist Care', icon: 'stethoscope', variant: 'accent' },
      { label: 'Heal Well at Home', icon: 'self_improvement', variant: 'secondary' },
    ],
    [
      { label: 'Insurance Services', icon: 'shield_with_heart', variant: 'gradient' },
      { label: 'Medical Travel', icon: 'flight_takeoff', variant: 'surface-low' },
    ],
    [
      { label: 'Community Health', icon: 'groups', variant: 'mint-dark' },
      { label: 'Patient Support', icon: 'support_agent', variant: 'surface-light' },
    ],
  ];

  /** Which pill (0 or 1) is active in each row — alternating default like V3 */
  activeRows = signal<number[]>([0, 1, 0, 1, 0]);

  /** Coming soon items with descriptions */
  readonly comingSoonItems = [
    { label: 'Outpatient Services', icon: 'local_hospital', body: 'Walk-in clinic coordination, day-procedure booking, and post-visit follow-ups tracked in-app.' },
    { label: 'Insurance Claims', icon: 'health_metrics', body: 'Automated claim filing, real-time status tracking, and cashless settlement with partner insurers.' },
    { label: 'Inpatient Care', icon: 'bed', body: 'Hospital bed availability, admission workflows, and real-time inpatient status visible to families.' },
    { label: 'Emergency Access', icon: 'emergency', body: 'One-tap ambulance dispatch, nearest ER routing, and live status shared with your emergency contacts.' },
  ];

  constructor(private router: Router) {}

  activatePill(rowIndex: number, pillIndex: number): void {
    this.activeRows.update(rows => {
      const copy = [...rows];
      copy[rowIndex] = pillIndex;
      return copy;
    });
  }

  navigate(route: string): void {
    switch (route) {
      case 'patient-login':
        this.router.navigate(['/auth/login'], { queryParams: { role: 'patient' } });
        break;
      case 'provider-login':
        this.router.navigate(['/auth/login'], { queryParams: { role: 'provider' } });
        break;
      case 'signup':
        this.router.navigate(['/auth/signup']);
        break;
      default:
        this.router.navigate([route]);
        break;
    }
  }

  handleLogoError(): void {
    this.logoLoadFailed = true;
  }

  scrollToTop(): void {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string): void {
    if (typeof document === 'undefined') return;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

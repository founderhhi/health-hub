import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ApiClientService } from '../../../core/api/api-client.service';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';

interface FeatureTile {
  id: string;
  title: string;
  icon: string;
  teaser: string;
  description: string;
  expanded: boolean;
}

const COMING_SOON_FEATURES: Omit<FeatureTile, 'expanded'>[] = [
  {
    id: 'second-opinion',
    title: 'Second Opinion',
    icon: 'users',
    teaser: 'Get a blind review from multiple independent specialists.',
    description: 'Submit your diagnostic reports and consultation summaries to one or more independent specialists for a blind second opinion. Each specialist reviews your case anonymously and independently — giving you an aggregated expert view at a fraction of the cost of a full consultation.'
  },
  {
    id: 'health-analytics',
    title: 'Health Analytics',
    icon: 'chart',
    teaser: 'Track your health daily with a gamified digital twin.',
    description: 'Log your mood, energy, sleep, exercise, and symptoms through short daily check-ins — with streaks, badges, and a health score to keep you on track. Your data builds a digital twin: a longitudinal health profile used for personalised in-app clinical insights and smarter consultations.'
  },
  {
    id: 'wearable',
    title: 'Wearable Integration',
    icon: 'watch',
    teaser: 'Live health monitoring from your wearable device.',
    description: 'Connect Health Hub\'s proprietary wearable or your existing device (Apple Watch, Fitbit, Garmin) for continuous live health monitoring. Data streams into your health record in real time, feeds your digital twin, and triggers alerts for anomalous readings like abnormal heart rate or low SpO₂.'
  },
  {
    id: 'emergency',
    title: 'Emergency Response',
    icon: 'alert',
    teaser: 'One-tap emergency alert with live GPS to responders.',
    description: 'With your explicit consent, a single in-app emergency prompt captures your live GPS location and immediately notifies the nearest verified emergency responders and your pre-designated emergency contacts. Designed to dramatically cut critical response times. Location data is used only during an active emergency and never stored beyond the session.'
  },
  {
    id: 'community',
    title: 'Community Healthcare',
    icon: 'heart',
    teaser: 'Subsidised care and charity programmes for everyone.',
    description: 'Health Hub extends its platform to underserved communities through charity partnerships, subsidised care access, and community health worker programmes. Includes a charity donation flow and sponsored consultation credits so quality healthcare reaches those who need it most.'
  },
  {
    id: 'travel',
    title: 'Medical Travel Services',
    icon: 'globe',
    teaser: 'Coordinated international care and hospital planning.',
    description: 'Plan, budget, and coordinate treatment travel across global care corridors. Access verified hospital networks, specialists, and diagnostic centres, with support for flights, accommodation, and in-country logistics — all through a single, trusted platform.'
  }
];

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent implements OnInit {
  PATIENT_TABS = PATIENT_TABS;
  features: FeatureTile[] = COMING_SOON_FEATURES.map(f => ({ ...f, expanded: false }));
  notifySubmitted = false;
  notifyLoading = false;

  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private api: ApiClientService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.notifySubmitted = localStorage.getItem('hhi_notify_interest') === 'true';
    }
  }

  goBack(): void {
    this.router.navigate(['/patient/dashboard']);
  }

  toggleFeature(feature: FeatureTile): void {
    const wasExpanded = feature.expanded;
    this.features.forEach(f => f.expanded = false);
    feature.expanded = !wasExpanded;
  }

  notifyMe(): void {
    if (this.notifySubmitted || this.notifyLoading) {
      return;
    }
    this.notifyLoading = true;
    this.api.post<{ ok: boolean }>('/patient/notify-interest', {}).subscribe({
      next: () => {
        this.notifyLoading = false;
        this.notifySubmitted = true;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('hhi_notify_interest', 'true');
        }
      },
      error: () => {
        this.notifyLoading = false;
        this.notifySubmitted = true;
      }
    });
  }
}

import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  type: 'patient' | 'doctor' | 'lab';
}

interface Capability {
  icon: string;
  label: string;
  desc: string;
  live: boolean;
}

interface Step {
  icon: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements OnInit, OnDestroy {
  logoLoadFailed = false;

  // Hero background slideshow — add hero-surgery.jpg to public/images/ to include it
  readonly heroSlides = [
    '/images/hero-clinical.jpg',
    '/images/hero-hospital.jpg',
    '/images/hero-hospital2.jpg',
    '/images/hero-hospital3.jpg',
    '/images/hero-doctor.jpg',
    '/images/hero-h8.jpg',
    '/images/hero-h10.jpg',
  ];
  currentSlide = signal(0);
  private slideTimer?: ReturnType<typeof setInterval>;

  readonly capabilities: Capability[] = [
    { icon: 'video_camera_front', label: '24/7 Health Expert Consultations', desc: 'Immediate video & audio access to certified professionals anytime, anywhere.', live: true },
    { icon: 'local_pharmacy',     label: 'Smart E-Pharmacy',                  desc: 'Instant e-prescription fulfillment.',                                         live: true },
    { icon: 'science',            label: 'Advanced Diagnostics',               desc: 'Home collection & trusted partners.',                                          live: true },
    { icon: 'folder_managed',     label: 'Secured Health Records',             desc: 'A centralized vault for every prescription, scan, and note.',                  live: true },
    { icon: 'stethoscope',        label: 'Specialist Consultations',           desc: 'Top-tier hospital doctors on referral.',                                        live: true },
    { icon: 'self_improvement',   label: 'Heal Well At Home',                  desc: 'Curated recovery guides, daily check-ins, and holistic routines.',             live: true },
    { icon: 'support_agent',      label: 'Dedicated Patient Support',          desc: 'Your personal health concierge.',                                               live: true },
    { icon: 'shield_with_heart',  label: 'Complete Insurance',                 desc: 'Cashless claims & verification.',                                               live: false },
    { icon: 'flight_takeoff',     label: 'Medical Travel Services',            desc: 'Cross-border care coordination.',                                               live: false },
  ];

  readonly statsCategories = ['All', 'Consultations', 'Diagnostics', 'Pharmacy', 'Records'];
  activeStatsCategory = signal(0);

  readonly statsCards = [
    { value: '12,000+', label: 'Patients Served',   icon: 'groups'       },
    { value: '500+',    label: 'Verified Providers', icon: 'verified_user' },
    { value: '<2 min',  label: 'Avg. Setup Time',    icon: 'timer'        },
    { value: '99.8%',   label: 'Uptime Reliability', icon: 'cloud_done'   },
  ];

  readonly testimonials: Testimonial[] = [
    {
      quote: 'I booked a consultation at midnight and had my prescription ready by morning. Health Hub made what felt impossible, completely effortless.',
      name: 'Priya S.',
      role: 'Patient',
      type: 'patient',
    },
    {
      quote: 'Referring patients and tracking their progress across the platform saves me real clinical hours every week. It just works.',
      name: 'Dr. Arvind M.',
      role: 'General Practitioner',
      type: 'doctor',
    },
    {
      quote: 'Results reach the patient and their doctor instantly. The workflow is clean, modern, and cuts our admin load in half.',
      name: 'Nadia K.',
      role: 'Senior Lab Technician',
      type: 'lab',
    },
  ];
  activeTestimonial = signal(0);
  private testimonialTimer?: ReturnType<typeof setInterval>;

  readonly steps: Step[] = [
    {
      icon: 'person_add',
      title: 'Create Your Account',
      body: 'Sign up in minutes. Choose Basic, Premium, or Family for full access to the Health Hub ecosystem.',
    },
    {
      icon: 'stethoscope',
      title: 'Meet a Health Expert',
      body: 'Talk to a qualified Health Expert anytime via video or audio. Get diagnosed, prescribed, or referred — all in one session.',
    },
    {
      icon: 'medication',
      title: 'Continue Into Services',
      body: 'Receive e-prescriptions instantly. Pick up at partner pharmacies, book lab tests, or see a specialist — all tracked in-app.',
    },
    {
      icon: 'health_and_safety',
      title: 'Return to One Record',
      body: 'Every update and follow-up stays visible from your Health Hub home. Access records, track appointments, and manage your health.',
    },
  ];
  activeStep = signal(0);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.testimonialTimer = setInterval(() => {
      this.activeTestimonial.update(i => (i + 1) % this.testimonials.length);
    }, 5000);
    this.slideTimer = setInterval(() => {
      this.currentSlide.update(i => (i + 1) % this.heroSlides.length);
    }, 4500);
  }

  ngOnDestroy(): void {
    if (this.testimonialTimer) clearInterval(this.testimonialTimer);
    if (this.slideTimer) clearInterval(this.slideTimer);
  }

  nextStep(): void {
    this.activeStep.update(s => (s + 1) % this.steps.length);
  }

  setTestimonial(i: number): void {
    this.activeTestimonial.set(i);
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

  handleLogoError(): void { this.logoLoadFailed = true; }

  scrollToTop(): void {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string): void {
    if (typeof document === 'undefined') return;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

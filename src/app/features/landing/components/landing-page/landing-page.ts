import { Component, signal, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  type: 'patient' | 'doctor' | 'lab';
  categories: string[];
}

interface CapSvgPath {
  d: string;
}

interface Capability {
  icon: string;
  label: string;
  desc: string;
  live: boolean;
  svgPaths?: CapSvgPath[];
}

interface Step {
  icon: string;
  title: string;
  body: string;
}

type LandingPalette = 'clinical-green' | 'design-system';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements OnInit, OnDestroy {
  logoLoadFailed = false;
  activePalette = signal<LandingPalette>('design-system');

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
    // ── LIVE ──
    {
      icon: 'self_improvement',
      label: 'Heal Well at Home',
      desc: 'Personalised recovery plans, daily wellness check-ins, and guided routines — clinical-grade care from your living room.',
      live: true,
    },
    {
      icon: 'psychology',
      label: 'Health Hub AI',
      desc: 'Instant AI triage across every care pathway. Helps patients self-assess, guides health experts on next steps, and surfaces key insights from diagnostic reports for specialists.',
      live: true,
    },
    {
      icon: 'video_camera_front',
      label: 'Heal Well Online',
      desc: '24/7 video and audio consultations with certified health experts. Get diagnosed, receive an e-prescription, or be referred — all within a single session.',
      live: true,
    },
    {
      icon: '',
      label: 'Heal Well in India',
      desc: 'Access India\'s leading hospitals, specialist networks, and diagnostic centres — coordinated end-to-end through the Health Hub platform.',
      live: true,
      svgPaths: [
        { d: 'M29 6 L36 8 L42 13 L41 18 L45 23 L43 28 L46 34 L42 38 L39 44 L35 51 L31 58 L27 53 L25 47 L20 42 L18 36 L14 31 L16 25 L20 21 L19 16 L23 11 L29 6Z' },
      ],
    },
    {
      icon: '',
      label: 'Heal Well in Africa',
      desc: 'Connecting patients across Africa to verified clinical expertise, pharmacy networks, and diagnostic services — bringing world-class care closer to home.',
      live: true,
      svgPaths: [
        { d: 'M31 6 L38 10 L44 16 L47 24 L46 31 L42 36 L40 42 L36 47 L33 54 L29 58 L25 54 L22 48 L18 44 L15 37 L14 29 L16 22 L20 16 L25 11 L31 6Z' },
        { d: 'M36 47 L39 51 L41 56 L38 58 L34 54 L36 47Z' },
      ],
    },
    {
      icon: 'stethoscope',
      label: 'Specialist Consultations',
      desc: 'GP-referred access to top-tier hospital specialists. Full case context is shared in advance so every specialist session is focused and productive.',
      live: true,
    },
    {
      icon: 'local_pharmacy',
      label: 'Pharmacy',
      desc: 'E-prescriptions fulfilled instantly through our verified pharmacy network. Order, track, and collect — or have it delivered to your door.',
      live: true,
    },
    {
      icon: 'science',
      label: 'Lab & Diagnostics',
      desc: 'Book lab tests, upload external reports, and track results — all linked directly to your health record and visible to your care team.',
      live: true,
    },
    {
      icon: 'folder_managed',
      label: 'Secured Health Records',
      desc: 'One unified, encrypted vault for every consultation, prescription, scan, and lab result — accessible by you and your care team, always.',
      live: true,
    },
    {
      icon: 'support_agent',
      label: 'Dedicated Patient Support',
      desc: 'A personal health concierge available to navigate appointments, coordinate referrals, and ensure nothing falls through the cracks.',
      live: true,
    },
    // ── COMING SOON ──
    {
      icon: 'rate_review',
      label: 'Second Opinion',
      desc: 'Diagnostic reports and consultation summaries are reviewed by an independent specialist in the same field. Multiple doctors can weigh in — at a fraction of the cost of a full consultation.',
      live: false,
    },
    {
      icon: 'monitoring',
      label: 'Health Analytics',
      desc: 'Gamified daily health and mood tracking that builds your personal digital twin — a living health chart that powers smarter, earlier clinical decisions.',
      live: false,
    },
    {
      icon: 'bar_chart',
      label: 'Patient Analytics',
      desc: 'Actionable population-level insights and patient outcome data for hospitals, clinics, and health networks — the B2B intelligence layer of Health Hub.',
      live: false,
    },
    {
      icon: 'watch',
      label: 'Wearable Integration',
      desc: 'Seamless connection to Health Hub\'s proprietary wearable and supported third-party devices for continuous, real-time health monitoring.',
      live: false,
    },
    {
      icon: 'emergency',
      label: 'Emergency Response',
      desc: 'With your consent, a single emergency prompt shares your live location with the nearest verified responders — cutting critical response times when every second counts.',
      live: false,
    },
    {
      icon: 'diversity_3',
      label: 'Community Healthcare & Charity',
      desc: 'Extending quality care to underserved communities through charity partnerships, subsidised access programmes, and community health initiatives.',
      live: false,
    },
    {
      icon: 'flight_takeoff',
      label: 'Medical Travel Services',
      desc: 'End-to-end coordination of cross-border medical care — from specialist matching and hospital booking to travel logistics and post-care follow-up.',
      live: false,
    },
    {
      icon: 'shield_with_heart',
      label: 'Complete Insurance',
      desc: 'Integrated health insurance with cashless claims, real-time verification, and coverage that moves with you across the Health Hub ecosystem.',
      live: false,
    },
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
    // All + Consultations
    {
      quote: 'I booked a consultation at midnight and had my prescription ready by morning. Health Hub made what felt impossible, completely effortless.',
      name: 'Priya S.',
      role: 'Patient',
      type: 'patient',
      categories: ['All', 'Consultations'],
    },
    {
      quote: 'Referring patients and tracking their progress across the platform saves me real clinical hours every week. It just works.',
      name: 'Dr. Arvind M.',
      role: 'General Practitioner',
      type: 'doctor',
      categories: ['All', 'Consultations'],
    },
    {
      quote: 'I was anxious about seeing a specialist but the Health Hub expert walked me through everything in one call. I felt heard, not rushed.',
      name: 'James O.',
      role: 'Patient',
      type: 'patient',
      categories: ['All', 'Consultations'],
    },
    {
      quote: 'The platform flags relevant patient history before I even start the consultation. It\'s like having a clinical brief waiting for you.',
      name: 'Dr. Meera R.',
      role: 'Internal Medicine Specialist',
      type: 'doctor',
      categories: ['All', 'Consultations'],
    },
    // Diagnostics
    {
      quote: 'Results reach the patient and their doctor instantly. The workflow is clean, modern, and cuts our admin load in half.',
      name: 'Nadia K.',
      role: 'Senior Lab Technician',
      type: 'lab',
      categories: ['All', 'Diagnostics'],
    },
    {
      quote: 'I uploaded my scan and had a specialist comment on it the same day. That turnaround used to take two weeks at my old clinic.',
      name: 'Fatima A.',
      role: 'Patient',
      type: 'patient',
      categories: ['All', 'Diagnostics'],
    },
    {
      quote: 'Home collection made it easy for my elderly mother. No travel, no waiting rooms — the results were in her record within hours.',
      name: 'Rahul P.',
      role: 'Patient (Caregiver)',
      type: 'patient',
      categories: ['All', 'Diagnostics'],
    },
    {
      quote: 'The diagnostic integration means I see structured, timestamped results alongside the patient\'s history. No more chasing reports.',
      name: 'Dr. Samuel E.',
      role: 'Radiologist',
      type: 'doctor',
      categories: ['All', 'Diagnostics'],
    },
    // Pharmacy
    {
      quote: 'My prescription was sent to the pharmacy before the call even ended. I collected it on my way home. That never happened before.',
      name: 'Amara T.',
      role: 'Patient',
      type: 'patient',
      categories: ['All', 'Pharmacy'],
    },
    {
      quote: 'Controlled medication tracking through Health Hub has simplified compliance audits enormously. Everything is logged and transparent.',
      name: 'Cynthia O.',
      role: 'Lead Pharmacist',
      type: 'doctor',
      categories: ['All', 'Pharmacy'],
    },
    {
      quote: 'I manage my mother\'s chronic prescriptions through Health Hub. Refill reminders, delivery tracking — it handles everything.',
      name: 'David M.',
      role: 'Patient (Caregiver)',
      type: 'patient',
      categories: ['All', 'Pharmacy'],
    },
    // Records
    {
      quote: 'Every specialist I\'ve seen has access to my full history through Health Hub. I stopped carrying paper records two years ago.',
      name: 'Linda C.',
      role: 'Patient',
      type: 'patient',
      categories: ['All', 'Records'],
    },
    {
      quote: 'Continuity of care is the hardest thing to maintain. Health Hub gives every provider the same complete picture of the patient.',
      name: 'Dr. Kofi A.',
      role: 'Family Medicine Physician',
      type: 'doctor',
      categories: ['All', 'Records'],
    },
    {
      quote: 'The lab integrated with Health Hub six months ago. Our patients no longer ask "did the doctor get my results?" — they already know.',
      name: 'Blessing N.',
      role: 'Lab Operations Manager',
      type: 'lab',
      categories: ['All', 'Records'],
    },
  ];
  activeTestimonial = signal(0);

  get filteredTestimonials(): Testimonial[] {
    return this.getTestimonialsForCategory(this.statsCategories[this.activeStatsCategory()]);
  }
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
  private routeSubscription?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParamMap.subscribe((params) => {
      const palette = params.get('palette');
      this.activePalette.set(
        palette === 'clinical-green'
          ? 'clinical-green'
          : 'design-system'
      );
    });

    this.testimonialTimer = setInterval(() => {
      this.activeTestimonial.update((i) => {
        const total = this.filteredTestimonials.length;
        return total > 0 ? (i + 1) % total : 0;
      });
    }, 5000);
    this.slideTimer = setInterval(() => {
      this.currentSlide.update(i => (i + 1) % this.heroSlides.length);
    }, 4500);
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    if (this.testimonialTimer) clearInterval(this.testimonialTimer);
    if (this.slideTimer) clearInterval(this.slideTimer);
  }

  nextStep(): void {
    this.activeStep.update(s => (s + 1) % this.steps.length);
  }

  setTestimonial(i: number): void {
    const total = this.filteredTestimonials.length;
    if (total === 0) {
      this.activeTestimonial.set(0);
      return;
    }

    this.activeTestimonial.set(((i % total) + total) % total);
  }

  setCategory(i: number): void {
    this.activeStatsCategory.set(i);
    this.activeTestimonial.set(0);
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

  private getTestimonialsForCategory(category: string): Testimonial[] {
    if (category === 'All') return this.testimonials;
    return this.testimonials.filter((testimonial) => testimonial.categories.includes(category));
  }
}

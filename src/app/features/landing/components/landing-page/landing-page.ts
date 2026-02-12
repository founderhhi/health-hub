import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  logoLoadFailed = false;

  constructor(private router: Router) {}

  navigate(route: string) {
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
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

  constructor(private router: Router) {}

  navigate(route: string) {
    switch (route) {
      case 'patient-login':
      case 'provider-login':
        this.router.navigate(['/auth/login']);
        break;
      case 'signup':
        this.router.navigate(['/auth/signup']);
        break;
      default:
        this.router.navigate([route]);
        break;
    }
  }

}

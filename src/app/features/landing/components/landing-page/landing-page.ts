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
    this.router.navigate([`auth/${route}`]);
  }

}

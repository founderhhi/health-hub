import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

@Component({
  selector: 'app-referral-details',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './referral-details.html',
  styleUrl: './referral-details.scss',
})
export class ReferralDetailsComponent {}
=======
  imports: [CommonModule, RouterModule],
  templateUrl: './referral-details.html'
})
export class ReferralDetailsComponent {
  // TODO: wire route param `id` to load referral summary

  accept(): void {
    // TODO: implement accept action
    console.log('TODO: accept referral');
  }

  requestMoreInfo(): void {
    // TODO: implement request more info action
    console.log('TODO: request more info');
  }

  decline(): void {
    // TODO: implement decline action
    console.log('TODO: decline referral');
  }
}
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

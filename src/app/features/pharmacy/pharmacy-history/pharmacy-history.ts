import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pharmacy-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pharmacy-history.html',
  styleUrl: './pharmacy-history.scss',
})
export class PharmacyHistoryComponent {
  readonly demoBannerText = 'Demo mode: history data and filters are read-only until backend integration is complete.';

  // TODO: load prescription history
}

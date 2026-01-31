import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

@Component({
  selector: 'app-pharmacy-history',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './pharmacy-history.html',
  styleUrl: './pharmacy-history.scss',
})
export class PharmacyHistoryComponent {}
=======
  imports: [CommonModule],
  templateUrl: './pharmacy-history.html'
})
export class PharmacyHistoryComponent {
  // TODO: load prescription history
}
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

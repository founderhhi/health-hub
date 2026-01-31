import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

@Component({
  selector: 'app-prescription-details',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './prescription-details.html',
  styleUrl: './prescription-details.scss',
})
export class PrescriptionDetailsComponent {}
=======
  imports: [CommonModule],
  templateUrl: './prescription-details.html'
})
export class PrescriptionDetailsComponent {
  // TODO: wire route param `id` and load prescription details

  markDispensed(): void {
    // TODO: implement mark dispensed
    console.log('TODO: markDispensed');
  }

  flagIssue(): void {
    // TODO: implement flag issue
    console.log('TODO: flagIssue');
  }
}
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

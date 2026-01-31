import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

@Component({
  selector: 'app-pharmacy-scanner',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './pharmacy-scanner.html',
  styleUrl: './pharmacy-scanner.scss',
})
export class PharmacyScannerComponent {}
=======
  imports: [CommonModule],
  templateUrl: './pharmacy-scanner.html'
})
export class PharmacyScannerComponent {
  // TODO: wire scanner/QR camera integration
  // TODO: wire manual code lookup

  manualLookup(): void {
    // TODO: implement manual lookup action
    console.log('TODO: manualLookup');
  }
}
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

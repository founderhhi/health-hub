import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

@Component({
  selector: 'app-diagnostics-order-details',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './diagnostics-order-details.html',
  styleUrl: './diagnostics-order-details.scss',
})
export class DiagnosticsOrderDetailsComponent {}
=======
  imports: [CommonModule],
  templateUrl: './diagnostics-order-details.html'
})
export class DiagnosticsOrderDetailsComponent {
  // TODO: wire order id and load order summary

  acceptOrder(): void {
    console.log('TODO: acceptOrder');
  }

  rejectOrder(): void {
    console.log('TODO: rejectOrder');
  }

  printLabel(): void {
    console.log('TODO: printLabel');
  }
}
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

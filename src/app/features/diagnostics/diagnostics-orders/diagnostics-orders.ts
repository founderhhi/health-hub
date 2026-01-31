import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

@Component({
  selector: 'app-diagnostics-orders',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './diagnostics-orders.html',
  styleUrl: './diagnostics-orders.scss',
})
export class DiagnosticsOrdersComponent {}
=======
  imports: [CommonModule],
  templateUrl: './diagnostics-orders.html'
})
export class DiagnosticsOrdersComponent {
  // TODO: wire filters and orders list
}
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

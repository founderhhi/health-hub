import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { CommonModule } from '@angular/common';
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

@Component({
  selector: 'app-diagnostics-result-upload',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './diagnostics-result-upload.html',
  styleUrl: './diagnostics-result-upload.scss',
})
export class DiagnosticsResultUploadComponent {}
=======
  imports: [CommonModule],
  templateUrl: './diagnostics-result-upload.html'
})
export class DiagnosticsResultUploadComponent {
  // TODO: wire upload handling and submission

  submitResults(): void {
    console.log('TODO: submitResults');
  }
}
>>>>>>> 584888cea698e878fe157096eaac97c89d5ddb94

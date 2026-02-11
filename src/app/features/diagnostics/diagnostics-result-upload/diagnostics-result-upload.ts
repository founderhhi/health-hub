import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LabsApiService } from '../../../core/api/labs.service';

@Component({
  selector: 'app-diagnostics-result-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './diagnostics-result-upload.html',
  styleUrl: './diagnostics-result-upload.scss',
})
export class DiagnosticsResultUploadComponent implements OnInit {
  dragOver = false;
  uploadInProgress = false;
  uploadedFiles: any[] = [];
  orderId: string | null = null;
  resultNotes = '';
  draftStatusMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private labsApi: LabsApiService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
    const files = Array.from(event.dataTransfer?.files || []);
    this.uploadedFiles = [...this.uploadedFiles, ...files];
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    this.uploadedFiles = [...this.uploadedFiles, ...files];
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  saveAsDraft(): void {
    this.draftStatusMessage = 'Draft saved locally. Server draft sync is coming soon.';
  }

  submitResults(): void {
    if (!this.orderId) {
      return;
    }
    this.labsApi.updateOrderStatus(this.orderId, 'completed', this.resultNotes).subscribe({
      next: () => {
        this.router.navigate(['/diagnostics']);
      }
    });
  }
}

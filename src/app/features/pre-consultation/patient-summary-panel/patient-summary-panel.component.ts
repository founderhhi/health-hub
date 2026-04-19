import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationService, ConsultationSession } from '../../../shared/services/consultation.service';

// ── Replace with your actual Zoom URL source ──────────────────────────────────
// In your real app, this comes from the session/appointment record.
// For now it's a configurable input so the specialist component can pass it in.
const FALLBACK_ZOOM_URL = 'https://zoom.us/j/your-meeting-id';

@Component({
  selector: 'app-patient-summary-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-summary-panel.component.html',
  styleUrls: ['./patient-summary-panel.component.scss'],
})
export class PatientSummaryPanelComponent implements OnInit {
  @Input() zoomUrl: string = FALLBACK_ZOOM_URL;
  @Input() consultationId?: string; // pass in from parent if known

  private consultationService = inject(ConsultationService);

  session: ConsultationSession | null = null;
  summaryString = '';
  hasJoined = false;

  ngOnInit(): void {
    // Load from service (which reads localStorage)
    this.session = this.consultationService.currentSession;
    if (this.session) {
      this.summaryString = this.consultationService.toSummaryString(this.session);
      this.consultationService.markDoctorReviewing();
    }
  }

  get severityColor(): string {
    const s = this.session?.severity ?? 0;
    if (s <= 3) return '#22c55e';
    if (s <= 6) return '#f59e0b';
    if (s <= 8) return '#f97316';
    return '#ef4444';
  }

  get severityLabel(): string {
    const s = this.session?.severity ?? 0;
    if (s <= 3) return 'Mild';
    if (s <= 6) return 'Moderate';
    if (s <= 8) return 'Severe';
    return 'Very Severe';
  }

  onJoinCall(): void {
    if (!this.session) return;
    this.hasJoined = true;
    this.consultationService.doctorJoinsCall(this.zoomUrl);
  }
}

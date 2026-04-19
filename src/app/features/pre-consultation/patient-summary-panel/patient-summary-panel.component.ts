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
  // Server-side fallback: localStorage lives only in the patient's browser, so
  // the specialist's page receives triage via referrals.triage_context instead.
  @Input() triageContext?: Record<string, any> | null;

  private consultationService = inject(ConsultationService);

  session: ConsultationSession | null = null;
  summaryString = '';
  hasJoined = false;

  ngOnInit(): void {
    // Load from service (which reads localStorage)
    this.session = this.consultationService.currentSession;
    if (!this.session && this.triageContext && Object.keys(this.triageContext).length > 0) {
      this.session = this.synthesizeSessionFromTriage(this.triageContext);
    }
    if (this.session) {
      this.summaryString = this.consultationService.toSummaryString(this.session);
      this.consultationService.markDoctorReviewing();
    }
  }

  private synthesizeSessionFromTriage(ctx: Record<string, any>): ConsultationSession {
    const rawSymptoms = Array.isArray(ctx['symptoms'])
      ? ctx['symptoms']
      : Array.isArray(ctx)
        ? ctx
        : [];
    const symptoms = rawSymptoms
      .map((s) => (typeof s === 'string' ? s : s?.name || s?.label || ''))
      .filter((s) => Boolean(s));

    return {
      consultation_id: this.consultationId || 'referral',
      symptoms,
      duration: typeof ctx['duration'] === 'string' ? ctx['duration'] : '',
      severity: typeof ctx['severity'] === 'number' ? ctx['severity'] : 0,
      notes: typeof ctx['notes'] === 'string' ? ctx['notes'] : (typeof ctx['complaint'] === 'string' ? ctx['complaint'] : ''),
      patient_status: 'waiting',
      doctor_status: 'reviewing',
      created_at: new Date().toISOString()
    };
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

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

  // AI-triage enriched fields (populated from triageContext when present).
  // Kept separate from ConsultationSession so the shared session shape stays clean.
  complaintText: string | null = null;
  triageSummaryText: string | null = null;
  recommendedNextStepText: string | null = null;
  triageAnswers: { question: string; answer: string }[] = [];

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

    // Populate AI-triage enriched fields from triageContext (defensive against shape).
    if (this.triageContext && typeof this.triageContext === 'object') {
      const ctx = this.triageContext;
      if (typeof ctx['complaint'] === 'string' && ctx['complaint'].trim()) {
        this.complaintText = ctx['complaint'];
      }
      if (typeof ctx['triageSummary'] === 'string' && ctx['triageSummary'].trim()) {
        this.triageSummaryText = ctx['triageSummary'];
      }
      if (typeof ctx['recommendedNextStep'] === 'string' && ctx['recommendedNextStep'].trim()) {
        this.recommendedNextStepText = ctx['recommendedNextStep'];
      }
      if (Array.isArray(ctx['triageAnswers'])) {
        this.triageAnswers = ctx['triageAnswers']
          .filter((item: any) => item && typeof item === 'object')
          .map((item: any) => ({
            question: typeof item.question === 'string' ? item.question : '',
            answer: typeof item.answer === 'string' ? item.answer : '',
          }))
          .filter((item: { question: string; answer: string }) => item.question || item.answer);
      }
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

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultationService } from '../../../shared/services/consultation.service';

export const SYMPTOM_OPTIONS = [
  'Fever', 'Headache', 'Cough', 'Cold', 'Body Pain',
  'Fatigue', 'Nausea', 'Dizziness', 'Shortness of Breath', 'Other'
];

export const DURATION_OPTIONS = [
  '< 1 day', '1 day', '2 days', '3 days',
  '4–5 days', '1 week', '> 1 week'
];

@Component({
  selector: 'app-pre-consultation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pre-consultation-form.component.html',
  styleUrls: ['./pre-consultation-form.component.scss'],
})
export class PreConsultationFormComponent implements OnInit {
  private consultationService = inject(ConsultationService);
  private router = inject(Router);

  readonly symptomOptions = SYMPTOM_OPTIONS;
  readonly durationOptions = DURATION_OPTIONS;

  selectedSymptoms: string[] = [];
  selectedDuration = '';
  severity = 5;
  notes = '';

  isSubmitting = false;
  formTouched = false;

  // ─── Validation ────────────────────────────────────────────────────────────

  get symptomsValid(): boolean {
    return this.selectedSymptoms.length > 0;
  }

  get durationValid(): boolean {
    return this.selectedDuration.trim().length > 0;
  }

  get formValid(): boolean {
    return this.symptomsValid && this.durationValid;
  }

  get showSymptomsError(): boolean {
    return this.formTouched && !this.symptomsValid;
  }

  get showDurationError(): boolean {
    return this.formTouched && !this.durationValid;
  }

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  ngOnInit(): void {
    // If patient already has a session (reconnect scenario), pre-fill the form
    const existing = this.consultationService.currentSession;
    if (existing) {
      this.selectedSymptoms = [...existing.symptoms];
      this.selectedDuration = existing.duration;
      this.severity = existing.severity;
      this.notes = existing.notes;

      // If they were already past the form stage, skip ahead
      if (existing.patient_status === 'waiting' || existing.patient_status === 'ready') {
        this.router.navigate(['/pre-consultation/waiting']);
        return;
      }
    }
  }

  // ─── Interactions ──────────────────────────────────────────────────────────

  toggleSymptom(symptom: string): void {
    const idx = this.selectedSymptoms.indexOf(symptom);
    if (idx === -1) {
      this.selectedSymptoms = [...this.selectedSymptoms, symptom];
    } else {
      this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== symptom);
    }
  }

  isSelected(symptom: string): boolean {
    return this.selectedSymptoms.includes(symptom);
  }

  get severityLabel(): string {
    if (this.severity <= 3) return 'Mild';
    if (this.severity <= 6) return 'Moderate';
    if (this.severity <= 8) return 'Severe';
    return 'Very Severe';
  }

  get severityColor(): string {
    if (this.severity <= 3) return '#22c55e';
    if (this.severity <= 6) return '#f59e0b';
    if (this.severity <= 8) return '#f97316';
    return '#ef4444';
  }

  // ─── Submit ─────────────────────────────────────────────────────────────────

  onSubmit(): void {
    this.formTouched = true;
    if (!this.formValid || this.isSubmitting) return;

    this.isSubmitting = true;

    this.consultationService
      .submitConsultation({
        symptoms: this.selectedSymptoms,
        duration: this.selectedDuration,
        severity: this.severity,
        notes: this.notes.trim(),
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/pre-consultation/waiting']);
        },
        error: () => {
          this.isSubmitting = false;
        },
      });
  }
}

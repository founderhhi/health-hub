import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConsultationService } from '../../../shared/services/consultation.service';

export const SYMPTOM_OPTIONS = [
  'Fever', 'Headache', 'Cough', 'Cold', 'Body Pain',
  'Fatigue', 'Nausea', 'Dizziness', 'Shortness of Breath'
];

export const DURATION_OPTIONS = [
  '< 1 day', '1 day', '2 days', '3 days',
  '4–5 days', '1 week', '> 1 week'
];

@Component({
  selector: 'app-pre-consultation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pre-consultation-form.component.html',
  styleUrls: ['./pre-consultation-form.component.scss'],
})
export class PreConsultationFormComponent implements OnInit {
  private consultationService = inject(ConsultationService);
  private router = inject(Router);

  readonly symptomOptions = SYMPTOM_OPTIONS;
  readonly durationOptions = DURATION_OPTIONS;

  // Form state
  selectedSymptoms: string[] = [];
  otherSymptom = '';
  showOtherInput = false;
  selectedDuration = '';
  severity = 5;
  notes = '';
  isSubmitting = false;
  submitAttempted = false;

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

  get finalSymptoms(): string[] {
    const list = [...this.selectedSymptoms];
    if (this.otherSymptom.trim()) list.push(this.otherSymptom.trim());
    return list;
  }

  get isValid(): boolean {
    return this.finalSymptoms.length > 0 && this.selectedDuration.trim().length > 0;
  }

  ngOnInit(): void {
    const existing = this.consultationService.currentSession;
    if (existing) {
      const ageMs = Date.now() - new Date(existing.created_at).getTime();
      const isRecent = ageMs < 15 * 60 * 1000;
      if (isRecent) {
        this.selectedSymptoms = [...existing.symptoms];
        this.selectedDuration = existing.duration;
        this.severity = existing.severity;
        this.notes = existing.notes;
        if (existing.patient_status === 'waiting' || existing.patient_status === 'ready') {
          this.router.navigate(['/patient/waiting']);
          return;
        }
      } else {
        this.consultationService.resetForNewConsultation();
      }
    }
  }

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

  toggleOther(): void {
    this.showOtherInput = !this.showOtherInput;
    if (!this.showOtherInput) this.otherSymptom = '';
  }

  onOtherInput(): void {}

  onSubmit(): void {
    this.submitAttempted = true;
    if (!this.isValid || this.isSubmitting) return;
    this.isSubmitting = true;
    this.consultationService
      .submitConsultation({
        symptoms: this.finalSymptoms,
        duration: this.selectedDuration,
        severity: this.severity,
        notes: this.notes.trim(),
      })
      .subscribe({
        next: () => this.router.navigate(['/patient/waiting']),
        error: () => { this.isSubmitting = false; },
      });
  }
}

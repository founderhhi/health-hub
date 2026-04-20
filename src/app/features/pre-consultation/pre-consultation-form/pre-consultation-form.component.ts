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

export interface Step {
  id: number;
  question: string;
  hint?: string;
}

export const STEPS: Step[] = [
  { id: 1, question: 'What are your symptoms?',              hint: 'Select all that apply' },
  { id: 2, question: 'How long have you had these symptoms?', hint: 'Pick the closest estimate' },
  { id: 3, question: 'How severe are your symptoms?',         hint: 'Drag the slider to rate 1–10' },
  { id: 4, question: 'Anything else to tell your doctor?',    hint: 'Optional — but helps a lot' },
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
  readonly steps = STEPS;

  // ── Form state ──────────────────────────────────────────────────────────────
  currentStep = 1;
  selectedSymptoms: string[] = [];
  otherSymptom = '';
  showOtherInput = false;
  selectedDuration = '';
  severity = 5;
  notes = '';
  isSubmitting = false;

  // track which steps have been answered (for progress)
  answered: Record<number, boolean> = { 1: false, 2: false, 3: true, 4: true };

  get currentStepData(): Step {
    return this.steps[this.currentStep - 1];
  }

  get totalSteps(): number { return this.steps.length; }

  get progressPercent(): number {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  get isLastStep(): boolean { return this.currentStep === this.totalSteps; }

  get canProceed(): boolean {
    switch (this.currentStep) {
      case 1: return this.selectedSymptoms.length > 0 || this.otherSymptom.trim().length > 0;
      case 2: return this.selectedDuration.trim().length > 0;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  }

  get allAnswered(): boolean {
    return Object.values(this.answered).every(v => v);
  }

  // ── Severity helpers ────────────────────────────────────────────────────────
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

  // ── Lifecycle ───────────────────────────────────────────────────────────────
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
        this.updateAnswered();
      } else {
        this.consultationService.resetForNewConsultation();
      }
    }
  }

  // ── Step 1: Symptoms ────────────────────────────────────────────────────────
  toggleSymptom(symptom: string): void {
    const idx = this.selectedSymptoms.indexOf(symptom);
    if (idx === -1) {
      this.selectedSymptoms = [...this.selectedSymptoms, symptom];
    } else {
      this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== symptom);
    }
    this.answered[1] = this.canProceed;
  }

  isSelected(symptom: string): boolean {
    return this.selectedSymptoms.includes(symptom);
  }

  toggleOther(): void {
    this.showOtherInput = !this.showOtherInput;
    if (!this.showOtherInput) {
      this.otherSymptom = '';
    }
    this.answered[1] = this.canProceed;
  }

  onOtherInput(): void {
    this.answered[1] = this.canProceed;
  }

  // ── Step 2: Duration ────────────────────────────────────────────────────────
  onDurationChange(): void {
    this.answered[2] = this.selectedDuration.trim().length > 0;
  }

  // ── Navigation ──────────────────────────────────────────────────────────────
  nextStep(): void {
    if (!this.canProceed) return;
    this.saveCurrentStep();
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  goToStep(step: number): void {
    // only allow going back to completed steps
    if (step < this.currentStep) this.currentStep = step;
  }

  private saveCurrentStep(): void {
    this.answered[this.currentStep] = true;
  }

  private updateAnswered(): void {
    this.answered[1] = this.selectedSymptoms.length > 0;
    this.answered[2] = this.selectedDuration.trim().length > 0;
  }

  // ── Get final symptoms list ─────────────────────────────────────────────────
  get finalSymptoms(): string[] {
    const list = [...this.selectedSymptoms];
    if (this.otherSymptom.trim()) list.push(this.otherSymptom.trim());
    return list;
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  onSubmit(): void {
    if (!this.allAnswered || this.isSubmitting) return;
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

import { Component, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GpApiService } from '../../../../core/api/gp.service';
import { DiagnosticCentre, LabsApiService } from '../../../../core/api/labs.service';
import { PrescriptionsApiService } from '../../../../core/api/prescriptions.service';
import { ReferralsApiService, SpecialistDirectoryEntry } from '../../../../core/api/referrals.service';
import { ConsultMode, ConsultShellComponent } from '../../../../shared/components/consult-shell/consult-shell';
import { PatientSummaryPanelComponent } from '../../../pre-consultation/patient-summary-panel/patient-summary-panel.component';
import { normalizeTriageHandoff } from '../practitioner/triage-handoff';

interface PrescriptionItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface ReferralFormData {
  specialty: string;
  specialistName?: string;
  urgency: string;
  reason: string;
  appointmentDate: string;
  appointmentTime: string;
  consultationMode: 'online' | 'offline';
  location: string;
}

@Component({
  selector: 'app-gp-consultation',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ConsultShellComponent, PatientSummaryPanelComponent],
  templateUrl: './gp-consultation.html',
  styleUrl: './gp-consultation.scss'
})
export class GpConsultationComponent implements OnInit, OnDestroy {
  @ViewChild(ConsultShellComponent) consultShellRef?: ConsultShellComponent;

  consultation: any;
  consultationId = '';
  roomUrl = '';
  currentUserId = '';
  consultMode: ConsultMode = 'video';
  statusMessage = '';
  errorMessage = '';
  loading = true;

  triageContext: any = null;

  // Lab order dialog
  showLabModal = false;
  labTestOptions = ['CBC', 'CRP', 'Lipid Panel', 'HbA1c', 'Urinalysis', 'Blood Culture', 'X-Ray', 'ECG'];
  selectedTests: string[] = [];
  customTest = '';
  labNote = '';
  submittingLabs = false;
  diagnosticCentres: DiagnosticCentre[] = [];
  selectedCentre = '';
  loadingCentres = false;
  labOrderNotice = '';

  // Prescription dialog
  showPrescriptionModal = false;
  prescriptionItems: PrescriptionItem[] = [{ name: '', dosage: '', frequency: '', duration: '' }];
  submittingPrescription = false;

  // Referral dialog
  showReferralModal = false;
  referralSubmitError = '';
  referralForm: ReferralFormData = {
    specialty: '',
    specialistName: '',
    urgency: 'routine',
    reason: '',
    appointmentDate: '',
    appointmentTime: '',
    consultationMode: 'online',
    location: ''
  };
  SPECIALTIES = [
    'Cardiology', 'Dermatology', 'Orthopedics', 'Neurology',
    'Pediatrics', 'Oncology', 'ENT', 'Ophthalmology'
  ];
  submittingReferral = false;

  private readonly platformId = inject(PLATFORM_ID);
  private routeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gpApi: GpApiService,
    private labsApi: LabsApiService,
    private prescriptionsApi: PrescriptionsApiService,
    private referralsApi: ReferralsApiService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUserId = localStorage.getItem('hhi_user_id') || '';
    }

    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.loading = false;
        this.errorMessage = 'Consultation ID is missing.';
        return;
      }

      this.consultationId = id;
      this.loadConsultation(id);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  get patientName(): string {
    return this.consultation?.patient_name || 'Patient';
  }

  get patientInitials(): string {
    return this.patientName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part.charAt(0).toUpperCase())
      .join('') || 'PT';
  }

  get patientSubtitle(): string {
    if (this.consultation?.patient_phone) {
      return this.consultation.patient_phone;
    }
    return '';
  }

  get consultationReady(): boolean {
    return Boolean(this.consultationId);
  }

  get consultationBadgeStatus(): string {
    if (this.consultation?.status === 'ready') return 'Ready';
    if (this.consultation?.status === 'active') return 'Live';
    if (this.consultation?.status === 'completed' || this.consultation?.status === 'ended') return 'Completed';
    return this.consultation?.status ? titleCase(this.consultation.status) : 'Pending';
  }

  goBack(): void {
    this.router.navigate(['/gp']);
  }

  openLabModal(): void {
    this.selectedTests = [];
    this.customTest = '';
    this.selectedCentre = '';
    this.labNote = '';
    this.labOrderNotice = '';
    this.showLabModal = true;
    this.loadDiagnosticCentres();
  }

  toggleTest(test: string): void {
    const idx = this.selectedTests.indexOf(test);
    if (idx === -1) {
      this.selectedTests = [...this.selectedTests, test];
    } else {
      this.selectedTests = this.selectedTests.filter(t => t !== test);
    }
  }

  isTestSelected(test: string): boolean {
    return this.selectedTests.includes(test);
  }

  submitLabOrder(): void {
    if (!this.consultation?.patient_id || this.submittingLabs) return;
    const tests = [...this.selectedTests];
    if (this.customTest.trim()) tests.push(this.customTest.trim());
    if (tests.length === 0 || !this.labNote.trim()) return;
    
    this.submittingLabs = true;
    this.errorMessage = '';
    this.statusMessage = '';
    
    this.labsApi.createOrder(this.consultation.patient_id, tests, this.selectedCentre || undefined, this.labNote.trim()).subscribe({
      next: () => {
        this.submittingLabs = false;
        this.showLabModal = false;
        this.statusMessage = `Lab order submitted: ${tests.join(', ')}.`;
      },
      error: () => {
        this.submittingLabs = false;
        this.errorMessage = 'Unable to submit lab order right now.';
      }
    });
  }

  closeLabModal(): void {
    this.showLabModal = false;
    this.selectedTests = [];
    this.customTest = '';
    this.labNote = '';
    this.selectedCentre = '';
  }

  openPrescriptionModal(): void {
    this.prescriptionItems = [{ name: '', dosage: '', frequency: '', duration: '' }];
    this.showPrescriptionModal = true;
  }

  addPrescriptionItem(): void {
    this.prescriptionItems.push({ name: '', dosage: '', frequency: '', duration: '' });
  }

  removePrescriptionItem(index: number): void {
    this.prescriptionItems.splice(index, 1);
  }

  submitPrescription(): void {
    if (!this.consultation?.patient_id || this.submittingPrescription) return;
    const items = this.prescriptionItems.filter(item => item.name.trim() && item.dosage.trim());
    if (items.length === 0) return;
    
    this.submittingPrescription = true;
    this.errorMessage = '';
    this.statusMessage = '';
    
    this.prescriptionsApi.create(this.consultation.patient_id, items).subscribe({
      next: () => {
        this.submittingPrescription = false;
        this.showPrescriptionModal = false;
        this.statusMessage = 'Prescription created successfully.';
      },
      error: () => {
        this.submittingPrescription = false;
        this.errorMessage = 'Unable to create prescription right now.';
      }
    });
  }

  closePrescriptionModal(): void {
    this.showPrescriptionModal = false;
    this.prescriptionItems = [{ name: '', dosage: '', frequency: '', duration: '' }];
  }

  onRefer(): void {
    if (!this.consultation?.patient_id) return;
    this.referralForm = {
      specialty: '',
      specialistName: '',
      urgency: 'routine',
      reason: '',
      appointmentDate: '',
      appointmentTime: '',
      consultationMode: 'online',
      location: ''
    };
    this.referralSubmitError = '';
    this.showReferralModal = true;
  }

  submitReferral(): void {
    if (!this.referralForm.specialty) {
      this.referralSubmitError = 'Please select a specialty.';
      return;
    }
    if (!this.referralForm.reason.trim()) {
      this.referralSubmitError = 'Please provide a reason for the referral.';
      return;
    }
    this.submittingReferral = true;
    this.referralSubmitError = '';
    
    this.referralsApi.createReferral(
      this.consultation.patient_id,
      this.referralForm.urgency,
      this.referralForm.reason,
      {
        specialty: this.referralForm.specialty,
        specialistName: this.referralForm.specialistName || undefined,
        appointmentDate: this.referralForm.appointmentDate || undefined,
        appointmentTime: this.referralForm.appointmentTime || undefined,
        consultationMode: this.referralForm.consultationMode,
        location: this.referralForm.consultationMode === 'offline' ? this.referralForm.location : undefined
      }
    ).subscribe({
      next: () => {
        this.submittingReferral = false;
        this.showReferralModal = false;
        this.statusMessage = 'Referral submitted successfully.';
      },
      error: (err) => {
        this.submittingReferral = false;
        this.referralSubmitError = err?.error?.error || 'Unable to submit referral right now.';
      }
    });
  }

  closeReferralModal(): void {
    this.showReferralModal = false;
    this.referralSubmitError = '';
    this.submittingReferral = false;
  }

  onEndConsultation(event: { notes: string }): void {
    if (!this.consultationId) return;
    this.gpApi.completeConsultation(this.consultationId, event.notes).subscribe({
      next: () => {
        this.consultation = {
          ...this.consultation,
          status: 'completed',
          completed_at: new Date().toISOString()
        };
        this.statusMessage = event.notes?.trim() ? 'Consultation ended. Notes saved.' : 'Consultation ended successfully.';
        this.consultShellRef?.onEndComplete();
      },
      error: (err) => {
        const message = err?.error?.error || 'Unable to end consultation right now.';
        this.errorMessage = message;
        this.consultShellRef?.onEndError(message);
      }
    });
  }

  private loadConsultation(id: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.consultation = null;

    const timer = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.errorMessage = 'Could not load consultation details. Please go back and try again.';
      }
    }, 8000);

    this.gpApi.getConsultation(id).subscribe({
      next: (response) => {
        clearTimeout(timer);
        try {
        this.consultation = response.consultation;
        this.roomUrl = response.consultation?.daily_room_url || response.consultation?.roomUrl || '';
        this.consultMode = 'video';
        
        // Populate triageContext for PatientSummaryPanel
        if (response.consultation?.triage_context) {
           const parsed = normalizeTriageHandoff(response.consultation.triage_context);
           this.triageContext = {
             complaint: parsed.complaint,
             triageSummary: parsed.triageSummary,
             triageAnswers: parsed.triageAnswers?.map(ans => ({ answer: ans, question: '' })),
             recommendedNextStep: parsed.recommendedNextStep,
             symptoms: typeof response.consultation.triage_context === 'string' ? response.consultation.triage_context : parsed.symptomsText
           };
        }
        } catch (err) {
           console.error('Error parsing triage context:', err);
        } finally {
           this.loading = false;
        }
      },
      error: (err) => {
        clearTimeout(timer);
        console.error('Consultation fetch failed:', err);
        this.loading = false;
        this.errorMessage = err?.error?.error || 'Unable to load consultation details.';
      }
    });
  }

  private loadDiagnosticCentres(): void {
    if (this.diagnosticCentres.length > 0) return;
    this.loadingCentres = true;
    this.labsApi.getCentres().subscribe({
      next: (response) => {
        this.diagnosticCentres = response.centres || [];
        this.loadingCentres = false;
      },
      error: () => {
        this.diagnosticCentres = [];
        this.loadingCentres = false;
      }
    });
  }
}

function titleCase(value: string): string {
  return value.split('_').filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

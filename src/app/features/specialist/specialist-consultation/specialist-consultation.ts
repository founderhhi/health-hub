import { Component, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConsultationsApiService } from '../../../core/api/consultations.service';
import { DiagnosticCentre, LabsApiService } from '../../../core/api/labs.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { ReferralsApiService, SpecialistDirectoryEntry } from '../../../core/api/referrals.service';
import { ConsultMode, ConsultShellComponent } from '../../../shared/components/consult-shell/consult-shell';

interface PrescriptionItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

@Component({
  selector: 'app-specialist-consultation',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ConsultShellComponent],
  templateUrl: './specialist-consultation.html',
  styleUrl: './specialist-consultation.scss'
})
export class SpecialistConsultationComponent implements OnInit, OnDestroy {
  @ViewChild(ConsultShellComponent) consultShellRef?: ConsultShellComponent;

  referral: any;
  referralId = '';
  consultationId = '';
  roomUrl = '';
  currentUserId = '';
  consultMode: ConsultMode = 'video';
  statusMessage = '';
  errorMessage = '';
  loading = true;
  accepting = false;

  // Lab order dialog
  showLabModal = false;
  labTestOptions = ['CBC', 'CRP', 'Lipid Panel', 'HbA1c', 'Urinalysis', 'Blood Culture', 'X-Ray', 'ECG'];
  selectedTests: string[] = [];
  customTest = '';
  submittingLabs = false;
  diagnosticCentres: DiagnosticCentre[] = [];
  selectedCentre = '';
  loadingCentres = false;

  // Prescription dialog
  showPrescriptionModal = false;
  prescriptionItems: PrescriptionItem[] = [{ name: '', dosage: '', frequency: '', duration: '' }];
  submittingPrescription = false;

  // Referral dialog
  showReferralModal = false;
  referralSubmitError = '';
  availableSpecialists: SpecialistDirectoryEntry[] = [];
  selectedSpecialistId = '';
  loadingSpecialists = false;
  reassigningReferral = false;

  private readonly platformId = inject(PLATFORM_ID);
  private routeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private referralsApi: ReferralsApiService,
    private consultationsApi: ConsultationsApiService,
    private labsApi: LabsApiService,
    private prescriptionsApi: PrescriptionsApiService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUserId = localStorage.getItem('hhi_user_id') || '';
    }

    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.loading = false;
        this.errorMessage = 'Referral ID is missing.';
        return;
      }

      this.referralId = id;
      const cachedReferral = this.referralsApi.getCachedSpecialistReferral(id);
      if (cachedReferral) {
        this.applyReferral(cachedReferral);
        this.loading = false;
        this.syncReferralNotice(cachedReferral);
      } else {
        this.loading = true;
      }

      this.loadReferral(id, !cachedReferral);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  get patientName(): string {
    return this.referral?.patient_name || 'Patient';
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
    if (this.referral?.patient_phone) {
      return this.referral.patient_phone;
    }
    return this.consultationId ? 'Consultation ready' : 'Awaiting consultation link';
  }

  get chiefComplaint(): string {
    return this.referral?.reason || 'No referral reason provided.';
  }

  get appointmentSummary(): string {
    const parts: string[] = [];
    if (this.referral?.appointment_date) {
      parts.push(new Date(this.referral.appointment_date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }));
    }
    if (this.referral?.appointment_time) {
      parts.push(this.formatTime(this.referral.appointment_time));
    }
    if (this.referral?.consultation_mode === 'offline' && this.referral?.location) {
      parts.push(this.referral.location);
    } else if (this.referral?.consultation_mode === 'online') {
      parts.push('Online consultation');
    }
    return parts.join(' • ') || 'Scheduling details pending';
  }

  get consultationReady(): boolean {
    return Boolean(this.consultationId);
  }

  get canOpenConsultationShell(): boolean {
    return this.referral?.consultation_mode === 'online' && this.consultationReady;
  }

  get canAcceptReferral(): boolean {
    return this.referral?.status === 'new';
  }

  get consultationBadgeStatus(): string {
    if (this.referral?.consultation_status === 'ready') {
      return 'Ready';
    }
    if (this.referral?.consultation_status === 'active') {
      return 'Live';
    }
    if (this.referral?.consultation_status === 'completed' || this.referral?.consultation_status === 'ended') {
      return 'Completed';
    }
    return this.referral?.status ? this.titleCase(this.referral.status) : 'Pending';
  }

  get selectedSpecialist(): SpecialistDirectoryEntry | null {
    return this.availableSpecialists.find((specialist) => specialist.id === this.selectedSpecialistId) || null;
  }

  goBack(): void {
    this.router.navigate(['/specialist/referral', this.referralId]);
  }

  acceptReferral(): void {
    if (!this.referralId || this.accepting) {
      return;
    }

    this.accepting = true;
    this.errorMessage = '';
    this.statusMessage = '';
    this.referralsApi.updateStatus(this.referralId, 'accepted').subscribe({
      next: (response) => {
        this.accepting = false;
        this.applyReferral(response.referral);
        this.referralsApi.cacheSpecialistReferral(response.referral);
        this.statusMessage = response.referral?.consultation_mode === 'online'
          ? 'Referral accepted. Consultation is ready.'
          : 'Referral accepted. This appointment is scheduled in person.';
      },
      error: () => {
        this.accepting = false;
        this.errorMessage = 'Unable to accept referral right now.';
      }
    });
  }

  // ── Lab Order Dialog ──

  openLabModal(): void {
    this.selectedTests = [];
    this.customTest = '';
    this.selectedCentre = '';
    this.showLabModal = true;
    this.loadDiagnosticCentres();
  }

  toggleTest(test: string): void {
    const idx = this.selectedTests.indexOf(test);
    if (idx === -1) {
      this.selectedTests.push(test);
    } else {
      this.selectedTests.splice(idx, 1);
    }
  }

  isTestSelected(test: string): boolean {
    return this.selectedTests.includes(test);
  }

  submitLabOrder(): void {
    if (!this.referral?.patient_id || this.submittingLabs) {
      return;
    }
    const tests = [...this.selectedTests];
    if (this.customTest.trim()) {
      tests.push(this.customTest.trim());
    }
    if (tests.length === 0) {
      return;
    }
    this.submittingLabs = true;
    this.errorMessage = '';
    this.statusMessage = '';
    this.labsApi.createOrder(this.referral.patient_id, tests, this.selectedCentre || undefined).subscribe({
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
    this.selectedCentre = '';
  }

  // ── Prescription Dialog ──

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
    if (!this.referral?.patient_id || this.submittingPrescription) {
      return;
    }
    const items = this.prescriptionItems.filter(item => item.name.trim());
    if (items.length === 0) {
      return;
    }
    this.submittingPrescription = true;
    this.errorMessage = '';
    this.statusMessage = '';
    this.prescriptionsApi.create(this.referral.patient_id, items).subscribe({
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

  // ── Refer Another Specialist ──

  onRefer(): void {
    if (!this.referral?.id || this.loadingSpecialists) {
      return;
    }

    this.referralSubmitError = '';
    this.selectedSpecialistId = '';
    this.showReferralModal = true;
    this.loadAvailableSpecialists();
  }

  submitReferral(): void {
    if (!this.referral?.id || !this.selectedSpecialistId || this.reassigningReferral) {
      this.referralSubmitError = 'Please select a specialist.';
      return;
    }

    this.reassigningReferral = true;
    this.referralSubmitError = '';
    this.referralsApi.reassignReferral(this.referral.id, this.selectedSpecialistId).subscribe({
      next: (response) => {
        this.reassigningReferral = false;
        this.referral = response.referral || this.referral;
        this.showReferralModal = false;
        const specialistName = response.targetSpecialist?.display_name || 'the selected specialist';
        this.statusMessage = `Referral forwarded to ${specialistName}. Returning to your dashboard...`;
        setTimeout(() => {
          this.router.navigate(['/specialist']);
        }, 900);
      },
      error: (err) => {
        this.reassigningReferral = false;
        this.referralSubmitError = err?.error?.error || 'Unable to submit referral right now.';
      }
    });
  }

  closeReferralModal(): void {
    this.showReferralModal = false;
    this.referralSubmitError = '';
    this.selectedSpecialistId = '';
    this.loadingSpecialists = false;
    this.reassigningReferral = false;
  }

  onEndConsultation(event: { notes: string }): void {
    if (!this.consultationId) {
      return;
    }

    this.consultationsApi.completeConsultation(this.consultationId, event.notes).subscribe({
      next: () => {
        this.referral = {
          ...this.referral,
          consultation_status: 'completed',
          consultation_completed_at: new Date().toISOString()
        };
        this.statusMessage = event.notes?.trim()
          ? 'Consultation ended. Notes saved.'
          : 'Consultation ended successfully.';
        this.consultShellRef?.onEndComplete();
      },
      error: (err) => {
        const message = err?.error?.error || 'Unable to end consultation right now.';
        this.errorMessage = message;
        this.consultShellRef?.onEndError(message);
      }
    });
  }

  private loadReferral(id: string, showLoader = true): void {
    if (showLoader) {
      this.loading = true;
    }
    this.errorMessage = '';
    this.referralsApi.getReferral(id).subscribe({
      next: (response) => {
        this.applyReferral(response.referral);
        this.referralsApi.cacheSpecialistReferral(response.referral);
        this.loading = false;
        this.syncReferralNotice(response.referral);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = this.referral
          ? 'Live consultation details could not be refreshed. Showing the last available state.'
          : 'Unable to load referral details.';
      }
    });
  }

  private applyReferral(referral: any): void {
    this.referral = referral;
    this.consultationId = referral?.consultation_id || referral?.consultationId || '';
    this.roomUrl = referral?.daily_room_url || referral?.roomUrl || '';
    this.consultMode = 'video';
  }

  private loadDiagnosticCentres(): void {
    if (this.diagnosticCentres.length > 0) {
      return;
    }
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

  private loadAvailableSpecialists(): void {
    this.loadingSpecialists = true;
    this.referralSubmitError = '';

    this.referralsApi.listAvailableSpecialists().subscribe({
      next: (response) => {
        this.availableSpecialists = Array.isArray(response.specialists)
          ? [...response.specialists].sort((left, right) => {
              const referralSpecialty = String(this.referral?.specialty || '').trim().toLowerCase();
              const leftMatch = String(left.specialty || '').trim().toLowerCase() === referralSpecialty ? 1 : 0;
              const rightMatch = String(right.specialty || '').trim().toLowerCase() === referralSpecialty ? 1 : 0;
              if (leftMatch !== rightMatch) {
                return rightMatch - leftMatch;
              }
              return String(left.display_name || '').localeCompare(String(right.display_name || ''));
            })
          : [];
        this.selectedSpecialistId = this.availableSpecialists[0]?.id || '';
        this.loadingSpecialists = false;
      },
      error: () => {
        this.loadingSpecialists = false;
        this.referralSubmitError = 'Unable to load specialists right now.';
      }
    });
  }

  private syncReferralNotice(referral: any): void {
    if (!this.consultationId && referral?.status === 'accepted') {
      this.errorMessage = 'Consultation is not linked yet. Please reopen this referral in a moment.';
      return;
    }
    if (referral?.consultation_mode === 'offline') {
      this.errorMessage = 'This referral is scheduled as an in-person visit, so there is no in-app consultation room.';
      return;
    }
    this.errorMessage = '';
  }

  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return time;
    }

    const suffix = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${suffix}`;
  }

  private titleCase(value: string): string {
    return value
      .split('_')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}

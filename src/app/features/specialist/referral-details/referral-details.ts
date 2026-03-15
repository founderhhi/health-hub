import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LabsApiService } from '../../../core/api/labs.service';
import { PrescriptionsApiService } from '../../../core/api/prescriptions.service';
import { ReferralsApiService } from '../../../core/api/referrals.service';

@Component({
  selector: 'app-referral-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './referral-details.html',
  styleUrl: './referral-details.scss',
})
export class ReferralDetailsComponent implements OnInit {
  referral: any;
  loading = true;
  errorMessage = '';
  actionNotice = '';
  requestInfoNotice: string | null = null;
  showScheduleForm = false;
  showRequestInfoForm = false;
  requestInfoText = '';
  savingSchedule = false;
  accepting = false;
  declining = false;
  submittingInfo = false;

  // Lab order dialog
  showLabModal = false;
  labTestOptions = ['CBC', 'CRP', 'Lipid Panel', 'HbA1c', 'Urinalysis', 'Blood Culture', 'X-Ray', 'ECG'];
  selectedTests: string[] = [];
  customTest = '';
  submittingLabs = false;

  // Prescription dialog
  showPrescriptionModal = false;
  prescriptionItems: { name: string; dosage: string; frequency: string; duration: string }[] = [{ name: '', dosage: '', frequency: '', duration: '' }];
  submittingPrescription = false;
  scheduleForm = {
    appointmentDate: '',
    appointmentTime: '',
    consultationMode: 'online' as 'online' | 'offline',
    location: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private referralsApi: ReferralsApiService,
    private labsApi: LabsApiService,
    private prescriptionsApi: PrescriptionsApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.errorMessage = 'Referral ID is missing.';
      return;
    }

    this.loadReferral(id);
  }

  get patientInitials(): string {
    const name = String(this.referral?.patient_name || 'Patient');
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || 'PT';
  }

  get consultationStatusLabel(): string {
    const status = String(this.referral?.consultation_status || '').toLowerCase();
    if (status === 'ready') {
      return 'Consultation ready';
    }
    if (status === 'active') {
      return 'Live consultation';
    }
    if (status === 'completed' || status === 'ended') {
      return 'Consultation completed';
    }
    if (this.referral?.consultation_id) {
      return 'Consultation linked';
    }
    return 'Consultation not started';
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

  get canAccept(): boolean {
    return this.referral?.status === 'new';
  }

  get canOpenConsultation(): boolean {
    return this.referral?.consultation_mode === 'online'
      && Boolean(this.referral?.consultation_id)
      && this.referral?.status !== 'declined';
  }

  get canManageClinicalActions(): boolean {
    return (this.referral?.status === 'accepted' || this.referral?.status === 'confirmed') && this.referral?.status !== 'declined';
  }

  get canEditSchedule(): boolean {
    const consultationStatus = String(this.referral?.consultation_status || '').toLowerCase();
    return this.referral?.status !== 'declined'
      && consultationStatus !== 'completed'
      && consultationStatus !== 'ended';
  }

  get referringProviderDiscipline(): string {
    if (this.referral?.referring_provider_specialty) {
      return this.referral.referring_provider_specialty;
    }

    const role = String(this.referral?.referring_provider_role || '').trim();
    if (!role) {
      return 'Primary Care';
    }

    return role
      .split('_')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  get lifecycleStep(): number {
    const consultationStatus = String(this.referral?.consultation_status || '').toLowerCase();
    if (consultationStatus === 'completed' || consultationStatus === 'ended') {
      return 4;
    }
    if (this.referral?.status === 'accepted' || this.referral?.status === 'confirmed' || consultationStatus === 'active') {
      return 3;
    }
    if (this.referral?.requested_info_at || this.referral?.status === 'declined') {
      return 2;
    }
    return 1;
  }

  goBack(): void {
    this.router.navigate(['/specialist']);
  }

  openConsultation(): void {
    if (!this.referral?.id) {
      return;
    }

    if (this.canOpenConsultation) {
      this.router.navigate(['/specialist/consultation', this.referral.id]);
      return;
    }

    if (this.canAccept) {
      this.accept();
    }
  }

  orderTests(): void {
    if (!this.canManageClinicalActions) {
      return;
    }
    this.selectedTests = [];
    this.customTest = '';
    this.showLabModal = true;
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
    this.actionNotice = '';
    this.labsApi.createOrder(this.referral.patient_id, tests).subscribe({
      next: () => {
        this.submittingLabs = false;
        this.showLabModal = false;
        this.actionNotice = `Lab order submitted: ${tests.join(', ')}.`;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.submittingLabs = false;
        console.error('[AGENT_SPECIALIST] lab order failed', err);
        this.errorMessage = 'Unable to order tests right now.';
        this.cdr.detectChanges();
      }
    });
  }

  closeLabModal(): void {
    this.showLabModal = false;
    this.selectedTests = [];
    this.customTest = '';
  }

  accept(): void {
    if (!this.referral?.id || this.accepting) {
      return;
    }
    this.accepting = true;
    this.errorMessage = '';
    this.actionNotice = '';
    this.referralsApi.updateStatus(this.referral.id, 'accepted').subscribe({
      next: (response) => {
        this.accepting = false;
        this.referral = response.referral;
        this.cdr.detectChanges();
        if (this.referral?.consultation_mode === 'online') {
          this.router.navigate(['/specialist/consultation', this.referral.id]);
          return;
        }
        this.actionNotice = 'Referral accepted and marked as an in-person appointment.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.accepting = false;
        console.error('[AGENT_SPECIALIST] accept referral failed', err);
        this.errorMessage = 'Unable to accept referral right now.';
        this.cdr.detectChanges();
      }
    });
  }

  requestMoreInfo(): void {
    this.showRequestInfoForm = !this.showRequestInfoForm;
    this.showScheduleForm = false;
    this.requestInfoNotice = null;
    this.errorMessage = '';
    this.actionNotice = '';
  }

  submitRequestInfo(): void {
    const message = this.requestInfoText.trim();
    if (!message || !this.referral?.id || this.submittingInfo) {
      return;
    }
    this.submittingInfo = true;
    this.referralsApi.requestMoreInfo(this.referral.id, message).subscribe({
      next: (response) => {
        this.submittingInfo = false;
        this.referral = response.referral || this.referral;
        this.requestInfoNotice = 'Request sent to the referring provider.';
        this.showRequestInfoForm = false;
        this.requestInfoText = '';
        this.errorMessage = '';
        this.actionNotice = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.submittingInfo = false;
        console.error('[AGENT_SPECIALIST] request more info failed', err);
        this.errorMessage = 'Unable to send request for more information right now.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelRequestInfo(): void {
    this.showRequestInfoForm = false;
    this.requestInfoText = '';
    this.requestInfoNotice = null;
  }

  openScheduleEditor(): void {
    if (!this.canEditSchedule) {
      return;
    }
    this.syncScheduleFormFromReferral();
    this.showScheduleForm = !this.showScheduleForm;
    this.showRequestInfoForm = false;
    this.errorMessage = '';
    this.actionNotice = '';
  }

  cancelScheduleEditor(): void {
    this.showScheduleForm = false;
    this.syncScheduleFormFromReferral();
  }

  saveSchedule(): void {
    if (!this.referral?.id || this.savingSchedule) {
      return;
    }

    const consultationMode = this.scheduleForm.consultationMode;
    if (consultationMode === 'offline' && !this.scheduleForm.location.trim()) {
      this.errorMessage = 'Location is required for in-person appointments.';
      this.cdr.detectChanges();
      return;
    }

    this.savingSchedule = true;
    this.errorMessage = '';
    this.actionNotice = '';

    this.referralsApi.updateSchedule(this.referral.id, {
      appointmentDate: this.scheduleForm.appointmentDate || undefined,
      appointmentTime: this.scheduleForm.appointmentTime || undefined,
      consultationMode,
      location: consultationMode === 'offline' ? this.scheduleForm.location.trim() : undefined
    }).subscribe({
      next: (response) => {
        this.savingSchedule = false;
        this.referral = response.referral;
        this.syncScheduleFormFromReferral();
        this.showScheduleForm = false;
        this.actionNotice = 'Appointment details updated successfully.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.savingSchedule = false;
        console.error('[AGENT_SPECIALIST] update schedule failed', err);
        this.errorMessage = err?.error?.error || 'Unable to update appointment details right now.';
        this.cdr.detectChanges();
      }
    });
  }

  decline(): void {
    if (!this.referral?.id || this.declining) {
      return;
    }
    this.declining = true;
    this.errorMessage = '';
    this.actionNotice = '';
    this.referralsApi.updateStatus(this.referral.id, 'declined').subscribe({
      next: (response) => {
        this.declining = false;
        this.referral = response.referral;
        this.actionNotice = 'Referral declined.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.declining = false;
        console.error('[AGENT_SPECIALIST] decline referral failed', err);
        this.errorMessage = 'Unable to decline referral right now.';
        this.cdr.detectChanges();
      }
    });
  }

  prescribe(): void {
    if (!this.canManageClinicalActions) {
      return;
    }
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
    this.actionNotice = '';
    this.prescriptionsApi.create(this.referral.patient_id, items).subscribe({
      next: () => {
        this.submittingPrescription = false;
        this.showPrescriptionModal = false;
        this.actionNotice = 'Prescription created successfully.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.submittingPrescription = false;
        console.error('[AGENT_SPECIALIST] prescription failed', err);
        this.errorMessage = 'Unable to create prescription right now.';
        this.cdr.detectChanges();
      }
    });
  }

  closePrescriptionModal(): void {
    this.showPrescriptionModal = false;
    this.prescriptionItems = [{ name: '', dosage: '', frequency: '', duration: '' }];
  }

  isStepComplete(step: number): boolean {
    return this.lifecycleStep > step;
  }

  isStepActive(step: number): boolean {
    return this.lifecycleStep === step;
  }

  private loadReferral(id: string): void {
    this.loading = true;
    this.referralsApi.getReferral(id).subscribe({
      next: (response) => {
        this.referral = response.referral;
        this.syncScheduleFormFromReferral();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[AGENT_SPECIALIST] failed to load referral', err);
        this.errorMessage = 'Unable to load referral details.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
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

  private syncScheduleFormFromReferral(): void {
    this.scheduleForm = {
      appointmentDate: this.referral?.appointment_date || '',
      appointmentTime: this.referral?.appointment_time ? String(this.referral.appointment_time).slice(0, 5) : '',
      consultationMode: this.referral?.consultation_mode === 'offline' ? 'offline' : 'online',
      location: this.referral?.location || ''
    };
  }
}

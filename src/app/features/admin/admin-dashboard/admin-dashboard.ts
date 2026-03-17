import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiClientService } from '../../../core/api/api-client.service';

interface UserRecord {
  id: string;
  role: string;
  phone: string;
  display_name: string;
  first_name: string;
  last_name: string;
  is_operating: boolean;
  created_at: string;
}

interface SystemHealth {
  users: { byRole: Record<string, number>; total: number };
  activity: { consultationsLast24h: number; pendingQueueSize: number };
}

interface Pagination {
  page: number;
  total: number;
  pages: number;
}

interface AdminActivityEvent {
  id: string;
  action: string;
  target_user_id: string | null;
  target_phone: string | null;
  target_name: string | null;
  actor_name: string | null;
  actor_phone: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

interface ServiceRequestRecord {
  id: string;
  type: string;
  status: 'new' | 'contacted' | 'closed';
  region: string | null;
  city: string | null;
  hospital_name: string | null;
  notes: string | null;
  patient_name: string | null;
  patient_phone: string | null;
  handled_by_name: string | null;
  admin_workflow_status?: AdminWorkflowStatus | null;
  admin_workflow_updated_by_name?: string | null;
  admin_workflow_updated_at?: string | null;
  created_at: string;
  updated_at: string;
}

type AdminWorkflowStatus = 'contacted' | 'completed' | 'accepted' | 'rejected' | 'home_delivery' | 'in_service';

interface PrescriptionRecord {
  id: string;
  code: string;
  items: Array<{ name?: string; medication?: string; dosage?: string }>;
  status: 'active' | 'claimed' | 'fulfilled';
  created_at: string;
  patient_name: string;
  patient_phone: string;
  patient_contacted?: boolean;
  patient_contacted_at?: string | null;
  patient_contact_note?: string | null;
  patient_contacted_by_name?: string | null;
  admin_workflow_status?: AdminWorkflowStatus | null;
  admin_workflow_updated_by_name?: string | null;
  admin_workflow_updated_at?: string | null;
}

interface ReferralRecord {
  id: string;
  status: 'new' | 'accepted' | 'declined' | 'confirmed';
  urgency: 'routine' | 'urgent' | 'emergency';
  reason: string | null;
  specialty: string | null;
  patient_name: string | null;
  patient_phone: string | null;
  specialist_name: string | null;
  admin_workflow_status?: AdminWorkflowStatus | null;
  admin_workflow_updated_by_name?: string | null;
  admin_workflow_updated_at?: string | null;
  created_at: string;
}

interface CreateUserForm {
  phone: string;
  password: string;
  role: string;
  displayName: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  users: UserRecord[] = [];
  activities: AdminActivityEvent[] = [];
  requests: ServiceRequestRecord[] = [];
  prescriptions: PrescriptionRecord[] = [];
  referrals: ReferralRecord[] = [];
  systemHealth: SystemHealth | null = null;
  loading = true;
  activityLoading = false;
  requestsLoading = false;
  referralsLoading = false;
  pharmacyLoading = false;
  creatingUser = false;
  searchQuery = '';
  roleFilter = '';
  currentPage = 1;
  totalPages = 1;
  totalUsers = 0;
  activityPage = 1;
  activityTotalPages = 1;
  pharmacyPage = 1;
  pharmacyTotalPages = 1;
  activeTab: 'users' | 'pharmacy' | 'requests' | 'referrals' | 'activity' | 'health' = 'users';
  actionNotice = '';
  actionError = '';
  showCreateUser = false;

  createUserForm: CreateUserForm = {
    phone: '',
    password: '',
    role: 'patient',
    displayName: '',
    firstName: '',
    lastName: ''
  };

  readonly roles = ['patient', 'gp', 'doctor', 'specialist', 'pharmacist', 'pharmacy_tech', 'lab_tech', 'radiologist', 'pathologist', 'admin'];
  readonly requestStatuses: Array<ServiceRequestRecord['status']> = ['new', 'contacted', 'closed'];
  readonly workflowStatuses: AdminWorkflowStatus[] = ['contacted', 'completed', 'accepted', 'rejected', 'home_delivery', 'in_service'];

  private noticeTimer?: ReturnType<typeof setTimeout>;
  private errorTimer?: ReturnType<typeof setTimeout>;

  constructor(private api: ApiClientService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    if (this.noticeTimer) clearTimeout(this.noticeTimer);
    if (this.errorTimer) clearTimeout(this.errorTimer);
  }

  setTab(tab: 'users' | 'pharmacy' | 'requests' | 'referrals' | 'activity' | 'health'): void {
    this.activeTab = tab;
    this.actionError = '';
    this.actionNotice = '';

    if (tab === 'users') {
      this.loadUsers();
      return;
    }

    if (tab === 'pharmacy') {
      this.loadPrescriptions();
      return;
    }

    if (tab === 'activity') {
      this.loadActivity();
      return;
    }

    if (tab === 'referrals') {
      this.loadReferrals();
      return;
    }

    if (tab === 'requests') {
      this.loadRequests();
      return;
    }

    if (!this.systemHealth) {
      this.loadSystemHealth();
    }
  }

  loadUsers(): void {
    this.loading = true;
    const params = new URLSearchParams();
    params.set('page', String(this.currentPage));
    params.set('limit', '25');
    if (this.roleFilter) params.set('role', this.roleFilter);
    if (this.searchQuery) params.set('search', this.searchQuery);

    this.api.get<{ users: UserRecord[]; pagination: { page: number; total: number; pages: number } }>(
      `/admin/users?${params.toString()}`
    ).subscribe({
      next: (res) => {
        this.users = res.users;
        this.totalPages = res.pagination.pages;
        this.totalUsers = res.pagination.total;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        this.showError(this.extractApiError(error, 'Unable to load users right now.'));
        this.cdr.detectChanges();
      }
    });
  }

  loadSystemHealth(): void {
    this.api.get<SystemHealth>('/admin/system/health').subscribe({
      next: (res) => {
        this.systemHealth = res;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.showError(this.extractApiError(error, 'Unable to load system health right now.'));
        this.cdr.detectChanges();
      }
    });
  }

  loadActivity(): void {
    this.activityLoading = true;
    const params = new URLSearchParams();
    params.set('page', String(this.activityPage));
    params.set('limit', '25');

    this.api.get<{ events: AdminActivityEvent[]; pagination: Pagination }>(
      `/admin/activity?${params.toString()}`
    ).subscribe({
      next: (res) => {
        this.activities = Array.isArray(res.events) ? res.events : [];
        this.activityTotalPages = res.pagination?.pages || 1;
        this.activityLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.activityLoading = false;
        this.showError(this.extractApiError(error, 'Unable to load activity history right now.'));
        this.cdr.detectChanges();
      }
    });
  }

  loadRequests(): void {
    this.requestsLoading = true;
    this.api.get<{ requests: ServiceRequestRecord[] }>('/admin/service-requests').subscribe({
      next: (res) => {
        this.requests = Array.isArray(res.requests) ? res.requests : [];
        this.requestsLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.requestsLoading = false;
        this.showError(this.extractApiError(error, 'Unable to load service requests right now.'));
        this.cdr.detectChanges();
      }
    });
  }

  loadReferrals(): void {
    this.referralsLoading = true;
    this.api.get<{ referrals: ReferralRecord[] }>('/admin/referrals').subscribe({
      next: (res) => {
        this.referrals = Array.isArray(res.referrals) ? res.referrals : [];
        this.referralsLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.referralsLoading = false;
        this.showError(this.extractApiError(error, 'Unable to load referrals right now.'));
        this.cdr.detectChanges();
      }
    });
  }

  loadPrescriptions(): void {
    this.pharmacyLoading = true;
    const params = new URLSearchParams();
    params.set('page', String(this.pharmacyPage));
    params.set('limit', '25');

    this.api.get<{ prescriptions: PrescriptionRecord[]; pagination: Pagination }>(
      `/admin/prescriptions?${params.toString()}`
    ).subscribe({
      next: (res) => {
        this.prescriptions = Array.isArray(res.prescriptions) ? res.prescriptions : [];
        this.pharmacyTotalPages = res.pagination?.pages || 1;
        this.pharmacyLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.pharmacyLoading = false;
        this.showError(this.extractApiError(error, 'Unable to load prescriptions right now.'));
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  onRoleFilter(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevActivityPage(): void {
    if (this.activityPage > 1) {
      this.activityPage--;
      this.loadActivity();
    }
  }

  nextActivityPage(): void {
    if (this.activityPage < this.activityTotalPages) {
      this.activityPage++;
      this.loadActivity();
    }
  }

  prevPharmacyPage(): void {
    if (this.pharmacyPage > 1) {
      this.pharmacyPage--;
      this.loadPrescriptions();
    }
  }

  nextPharmacyPage(): void {
    if (this.pharmacyPage < this.pharmacyTotalPages) {
      this.pharmacyPage++;
      this.loadPrescriptions();
    }
  }

  formatRxItems(items: PrescriptionRecord['items']): string {
    if (!Array.isArray(items) || items.length === 0) return 'No items';
    return items.map(i => i.name || i.medication || 'Unknown').join(', ');
  }

  updateRole(user: UserRecord, newRole: string): void {
    this.actionError = '';
    this.api.patch<{ user: UserRecord }>(`/admin/users/${user.id}/role`, { role: newRole }).subscribe({
      next: (res) => {
        user.role = res.user.role;
        this.showNotice('Role updated successfully.');
      },
      error: (error) => {
        this.showError(this.extractApiError(error, 'Unable to update role.'));
      }
    });
  }

  toggleStatus(user: UserRecord): void {
    this.actionError = '';
    const newActive = !user.is_operating;
    this.api.patch<{ user: UserRecord }>(`/admin/users/${user.id}/status`, { active: newActive }).subscribe({
      next: (res) => {
        user.is_operating = res.user.is_operating;
        this.showNotice(user.is_operating ? 'User enabled successfully.' : 'User disabled successfully.');
      },
      error: (error) => {
        this.showError(this.extractApiError(error, 'Unable to update user status.'));
      }
    });
  }

  updateRequestStatus(request: ServiceRequestRecord, status: ServiceRequestRecord['status']): void {
    if (request.status === status) {
      return;
    }

    this.actionError = '';
    this.api.patch<{ request: ServiceRequestRecord }>(`/admin/service-requests/${request.id}`, { status }).subscribe({
      next: (res) => {
        request.status = res.request.status;
        request.updated_at = res.request.updated_at;
        request.handled_by_name = res.request.handled_by_name;
        this.showNotice('Request status updated successfully.');
      },
      error: (error) => {
        this.showError(this.extractApiError(error, 'Unable to update request status.'));
        this.loadRequests();
      }
    });
  }

  confirmAndUpdateRequestStatus(request: ServiceRequestRecord, nextStatusRaw: string): void {
    if (!this.isServiceRequestStatus(nextStatusRaw)) {
      this.showError('Please choose a valid request status.');
      return;
    }
    const status = nextStatusRaw;
    if (request.status === status) {
      return;
    }
    const confirmed = window.confirm(`Confirm changing service request status to "${status}"?`);
    if (!confirmed) {
      return;
    }
    this.updateRequestStatus(request, status);
  }

  updateRequestWorkflowStatus(request: ServiceRequestRecord, workflowStatus: AdminWorkflowStatus): void {
    this.actionError = '';
    this.api.patch<{ request: ServiceRequestRecord }>(`/admin/service-requests/${request.id}`, { workflowStatus }).subscribe({
      next: (res) => {
        request.admin_workflow_status = res.request.admin_workflow_status || null;
        request.admin_workflow_updated_by_name = res.request.admin_workflow_updated_by_name || null;
        request.admin_workflow_updated_at = res.request.admin_workflow_updated_at || null;
        this.showNotice('Request workflow updated successfully.');
      },
      error: (error) => {
        this.showError(this.extractApiError(error, 'Unable to update request workflow.'));
        this.loadRequests();
      }
    });
  }

  confirmAndUpdateRequestWorkflowStatus(request: ServiceRequestRecord, nextWorkflowRaw: string): void {
    if (!this.isWorkflowStatus(nextWorkflowRaw)) {
      this.showError('Please choose a valid workflow status.');
      return;
    }
    const workflowStatus = nextWorkflowRaw;
    if (request.admin_workflow_status === workflowStatus) {
      return;
    }
    const confirmed = window.confirm(`Confirm setting request workflow to "${this.formatWorkflowStatus(workflowStatus)}"?`);
    if (!confirmed) {
      return;
    }
    this.updateRequestWorkflowStatus(request, workflowStatus);
  }

  updatePrescriptionContactStatus(
    prescription: PrescriptionRecord,
    contacted: boolean,
    workflowStatus: AdminWorkflowStatus = 'contacted'
  ): void {
    this.actionError = '';
    this.api.patch<{ prescription: PrescriptionRecord }>(`/admin/prescriptions/${prescription.id}/contact`, {
      contacted,
      workflowStatus
    }).subscribe({
      next: (res) => {
        prescription.patient_contacted = Boolean(res.prescription.patient_contacted);
        prescription.patient_contacted_at = res.prescription.patient_contacted_at || null;
        prescription.patient_contact_note = res.prescription.patient_contact_note || null;
        prescription.patient_contacted_by_name = res.prescription.patient_contacted_by_name || null;
        prescription.admin_workflow_status = res.prescription.admin_workflow_status || null;
        prescription.admin_workflow_updated_by_name = res.prescription.admin_workflow_updated_by_name || null;
        prescription.admin_workflow_updated_at = res.prescription.admin_workflow_updated_at || null;
        this.showNotice(contacted ? 'Patient contact logged.' : 'Patient contact cleared.');
      },
      error: (error) => {
        this.showError(this.extractApiError(error, 'Unable to update patient contact.'));
        this.loadPrescriptions();
      }
    });
  }

  confirmAndUpdatePrescriptionContactStatus(prescription: PrescriptionRecord, contacted: boolean): void {
    const action = contacted ? 'mark as contacted' : 'clear contact status';
    const confirmed = window.confirm(`Confirm ${action} for prescription "${prescription.code}"?`);
    if (!confirmed) {
      return;
    }
    this.updatePrescriptionContactStatus(prescription, contacted);
  }

  updateReferralWorkflowStatus(referral: ReferralRecord, workflowStatus: AdminWorkflowStatus): void {
    this.actionError = '';
    this.api.patch<{ referral: ReferralRecord }>(`/admin/referrals/${referral.id}/workflow`, { workflowStatus }).subscribe({
      next: (res) => {
        referral.admin_workflow_status = res.referral.admin_workflow_status || null;
        referral.admin_workflow_updated_by_name = res.referral.admin_workflow_updated_by_name || null;
        referral.admin_workflow_updated_at = res.referral.admin_workflow_updated_at || null;
        this.showNotice('Referral workflow updated successfully.');
      },
      error: (error) => {
        this.showError(this.extractApiError(error, 'Unable to update referral workflow.'));
        this.loadReferrals();
      }
    });
  }

  confirmAndUpdateReferralWorkflowStatus(referral: ReferralRecord, nextWorkflowRaw: string): void {
    if (!this.isWorkflowStatus(nextWorkflowRaw)) {
      this.showError('Please choose a valid workflow status.');
      return;
    }
    const workflowStatus = nextWorkflowRaw;
    if (referral.admin_workflow_status === workflowStatus) {
      return;
    }
    const confirmed = window.confirm(`Confirm setting referral workflow to "${this.formatWorkflowStatus(workflowStatus)}"?`);
    if (!confirmed) {
      return;
    }
    this.updateReferralWorkflowStatus(referral, workflowStatus);
  }

  toggleCreateUserPanel(): void {
    this.showCreateUser = !this.showCreateUser;
    this.actionError = '';
    if (!this.showCreateUser) {
      this.resetCreateUserForm();
    }
  }

  createUser(): void {
    if (this.creatingUser) {
      return;
    }

    const payload = {
      phone: this.createUserForm.phone.trim(),
      password: this.createUserForm.password,
      role: this.createUserForm.role,
      displayName: this.createUserForm.displayName.trim(),
      firstName: this.createUserForm.firstName.trim(),
      lastName: this.createUserForm.lastName.trim()
    };

    if (!payload.phone || !payload.password || !payload.role) {
      this.showError('Phone, role and password are required.');
      return;
    }

    if (payload.password.length < 8) {
      this.showError('Password must be at least 8 characters.');
      return;
    }

    this.creatingUser = true;
    this.actionError = '';
    this.actionNotice = '';

    this.api.post<{ user: UserRecord }>('/admin/users', payload).subscribe({
      next: () => {
        this.creatingUser = false;
        this.showCreateUser = false;
        this.resetCreateUserForm();
        this.showNotice('User created successfully.');
        this.currentPage = 1;
        this.loadUsers();
      },
      error: (error) => {
        this.creatingUser = false;
        this.showError(this.extractApiError(error, 'Unable to create user.'));
      }
    });
  }

  formatActivityAction(action: string): string {
    switch (action) {
      case 'user.created':
        return 'Created user';
      case 'user.role.updated':
        return 'Updated role';
      case 'user.status.updated':
        return 'Updated status';
      case 'service_request.status.updated':
        return 'Updated request status';
      case 'service_request.workflow.updated':
        return 'Updated request workflow';
      case 'prescription.patient_contact.updated':
        return 'Updated prescription contact';
      case 'prescription.workflow.updated':
        return 'Updated prescription workflow';
      case 'referral.workflow.updated':
        return 'Updated referral workflow';
      default:
        return action;
    }
  }

  formatWorkflowStatus(status: AdminWorkflowStatus | null | undefined): string {
    if (!status) return 'Not set';
    return status.replace(/_/g, ' ').replace(/\b\w/g, (value) => value.toUpperCase());
  }

  private isWorkflowStatus(value: string): value is AdminWorkflowStatus {
    return this.workflowStatuses.includes(value as AdminWorkflowStatus);
  }

  private isServiceRequestStatus(value: string): value is ServiceRequestRecord['status'] {
    return this.requestStatuses.includes(value as ServiceRequestRecord['status']);
  }

  getActivityTarget(event: AdminActivityEvent): string {
    return event.target_name || event.target_phone || 'Unknown user';
  }

  formatRequestType(type: string): string {
    switch (type) {
      case 'travel_flights':
        return 'Travel: Flights';
      case 'travel_stay':
        return 'Travel: Stay';
      case 'healwell_callback':
        return 'Heal Well Callback';
      default:
        return type.replace(/_/g, ' ').replace(/\b\w/g, (value) => value.toUpperCase());
    }
  }

  getRequestDestination(request: ServiceRequestRecord): string {
    return [request.region, request.city, request.hospital_name].filter(Boolean).join(' / ') || request.notes || 'General callback';
  }

  private resetCreateUserForm(): void {
    this.createUserForm = {
      phone: '',
      password: '',
      role: 'patient',
      displayName: '',
      firstName: '',
      lastName: ''
    };
  }

  private showNotice(message: string): void {
    this.actionNotice = message;
    if (this.noticeTimer) clearTimeout(this.noticeTimer);
    this.noticeTimer = setTimeout(() => { this.actionNotice = ''; }, 5000);
  }

  private showError(message: string): void {
    this.actionError = message;
    if (this.errorTimer) clearTimeout(this.errorTimer);
    this.errorTimer = setTimeout(() => { this.actionError = ''; }, 7000);
  }

  private extractApiError(error: unknown, fallback: string): string {
    const err = error as { error?: { error?: string } };
    return err?.error?.error || fallback;
  }

  get healthRoles(): { role: string; count: number }[] {
    if (!this.systemHealth) return [];
    return Object.entries(this.systemHealth.users.byRole).map(([role, count]) => ({ role, count }));
  }
}

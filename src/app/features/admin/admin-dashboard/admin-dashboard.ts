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
  created_at: string;
  updated_at: string;
}

interface PrescriptionRecord {
  id: string;
  code: string;
  items: Array<{ name?: string; medication?: string; dosage?: string }>;
  status: 'active' | 'claimed' | 'fulfilled';
  created_at: string;
  patient_name: string;
  patient_phone: string;
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
  systemHealth: SystemHealth | null = null;
  loading = true;
  activityLoading = false;
  requestsLoading = false;
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
  activeTab: 'users' | 'pharmacy' | 'activity' | 'requests' | 'health' = 'users';
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

  setTab(tab: 'users' | 'pharmacy' | 'activity' | 'requests' | 'health'): void {
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
      default:
        return action;
    }
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

import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboardComponent implements OnInit {
  users: UserRecord[] = [];
  systemHealth: SystemHealth | null = null;
  loading = true;
  searchQuery = '';
  roleFilter = '';
  currentPage = 1;
  totalPages = 1;
  totalUsers = 0;
  activeTab: 'users' | 'health' = 'users';

  readonly roles = ['patient', 'gp', 'doctor', 'specialist', 'pharmacist', 'pharmacy_tech', 'lab_tech', 'radiologist', 'pathologist', 'admin'];

  constructor(private api: ApiClientService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadSystemHealth();
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
      },
      error: () => { this.loading = false; }
    });
  }

  loadSystemHealth(): void {
    this.api.get<SystemHealth>('/admin/system/health').subscribe({
      next: (res) => { this.systemHealth = res; }
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

  updateRole(user: UserRecord, newRole: string): void {
    this.api.patch<{ user: UserRecord }>(`/admin/users/${user.id}/role`, { role: newRole }).subscribe({
      next: (res) => {
        user.role = res.user.role;
      }
    });
  }

  toggleStatus(user: UserRecord): void {
    const newActive = !user.is_operating;
    this.api.patch<{ user: UserRecord }>(`/admin/users/${user.id}/status`, { active: newActive }).subscribe({
      next: (res) => {
        user.is_operating = res.user.is_operating;
      }
    });
  }

  get healthRoles(): { role: string; count: number }[] {
    if (!this.systemHealth) return [];
    return Object.entries(this.systemHealth.users.byRole).map(([role, count]) => ({ role, count }));
  }
}

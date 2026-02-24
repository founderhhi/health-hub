import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ReferralsApiService } from '../../../core/api/referrals.service';
import { WsService } from '../../../core/realtime/ws.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './specialist-dashboard.html',
  styleUrl: './specialist-dashboard.scss',
})
export class SpecialistDashboardComponent implements OnInit, OnDestroy {
  referrals: any[] = [];
  stats = {
    pending: 0,
    appointments: 0,
    active: 0,
    patients: 0
  };
  private wsSubscription?: Subscription;

  get allCount() { return this.referrals.length; }
  get gpCount() { return this.referrals.filter(r => r.source === 'gp' || !r.source).length; }
  get specialistCount() { return this.referrals.filter(r => r.source === 'specialist').length; }

  constructor(
    private referralsApi: ReferralsApiService,
    private ws: WsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadReferrals();
    this.ws.connect('specialist');
    this.wsSubscription = this.ws.events$.subscribe((event) => {
      if (event.event === 'referral.created') {
        this.loadReferrals();
      }
    });
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
  }

  viewReferral(id: string): void {
    this.router.navigate(['/specialist/referral', id]);
  }

  acceptReferral(id: string): void {
    this.referralsApi.updateStatus(id, 'accepted').subscribe({
      next: () => this.loadReferrals()
    });
  }

  private loadReferrals(): void {
    this.referralsApi.listForSpecialist().subscribe({
      next: (response) => {
        this.referrals = response.referrals;
        this.stats.pending = this.referrals.filter((r) => r.status === 'new').length;
      }
    });
  }
}

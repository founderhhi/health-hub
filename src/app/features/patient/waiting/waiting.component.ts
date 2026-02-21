import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { WsService } from '../../../core/realtime/ws.service';
import { ConsultShellComponent, ConsultMode } from '../../../shared/components/consult-shell/consult-shell';

@Component({
  selector: 'app-patient-waiting',
  standalone: true,
  imports: [CommonModule, RouterModule, ConsultShellComponent],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss'
})
export class WaitingComponent implements OnInit {
  roomUrl = '';
  consultationId = '';
  consultMode: ConsultMode = 'video';
  gpName = '';
  showConsultShell = false;
  statusMessage = 'Waiting for a GP to accept your request...';

  private platformId = inject(PLATFORM_ID);

  constructor(private ws: WsService, private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Retrieve requested mode from sessionStorage (set by patient dashboard)
      const savedMode = sessionStorage.getItem('hhi_consult_mode');
      if (savedMode === 'audio' || savedMode === 'chat') {
        this.consultMode = savedMode;
      }

      const userId = localStorage.getItem('hhi_user_id') || '';
      this.ws.connect('patient', userId);
      this.ws.events$.subscribe((event) => {
        if (event.event === 'consult.accepted') {
          const data = event.data as any;
          this.roomUrl = this.extractRoomUrl(data);
          this.consultationId = this.extractConsultationId(data);
          this.gpName = data?.gpName || data?.consultation?.gp_name || '';
          this.statusMessage = 'GP accepted. You can join the consultation now.';
        }
        if (event.event === 'consult.completed') {
          const data = event.data as any;
          const id = data?.consultationId || data?.consultation?.id;
          if (id === this.consultationId) {
            this.statusMessage = 'Consultation has been completed by your GP.';
            this.showConsultShell = false;
          }
        }
      });
    }
  }

  joinConsult(): void {
    this.showConsultShell = true;
  }

  onLeaveConsultShell(): void {
    this.showConsultShell = false;
  }

  cancel(): void {
    this.router.navigate(['/patient/dashboard']);
  }

  private extractConsultationId(payload: any): string {
    return (
      payload?.consultation?.consultation_id ||
      payload?.consultation?.consultationId ||
      payload?.consultation?.id ||
      payload?.consultationId ||
      ''
    );
  }

  private extractRoomUrl(payload: any): string {
    return payload?.consultation?.daily_room_url || payload?.consultation?.roomUrl || payload?.roomUrl || '';
  }
}

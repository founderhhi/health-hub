import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { WsService } from '../../../core/realtime/ws.service';

@Component({
  selector: 'app-patient-waiting',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss'
})
export class WaitingComponent implements OnInit {
  roomUrl = '';
  statusMessage = 'Waiting for a GP to accept your request...';

  constructor(private ws: WsService, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('hhi_user_id') || '';
    this.ws.connect('patient', userId);
    this.ws.events$.subscribe((event) => {
      if (event.event === 'consult.accepted') {
        const data = event.data as any;
        this.roomUrl = data?.consultation?.daily_room_url || data?.roomUrl || '';
        this.statusMessage = 'GP accepted. You can join the consultation now.';
      }
    });
  }

  joinConsult(): void {
    if (this.roomUrl) {
      window.open(this.roomUrl, '_blank');
    }
  }

  cancel(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}

import {
  Component, OnInit, OnDestroy, inject, PLATFORM_ID
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ConsultationService } from '../../../shared/services/consultation.service';

@Component({
  selector: 'app-waiting-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.scss'],
})
export class WaitingScreenComponent implements OnInit, OnDestroy {
  private consultationService = inject(ConsultationService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  readonly TOTAL_SECONDS = 120;
  secondsLeft = this.TOTAL_SECONDS;

  isExpired = false;
  doctorJoined = false;

  private countdownSub?: Subscription;
  private pollSub?: Subscription;

  get minutes(): string {
    return String(Math.floor(this.secondsLeft / 60)).padStart(2, '0');
  }

  get seconds(): string {
    return String(this.secondsLeft % 60).padStart(2, '0');
  }

  get progressPercent(): number {
    return ((this.TOTAL_SECONDS - this.secondsLeft) / this.TOTAL_SECONDS) * 100;
  }

  ngOnInit(): void {
    // Guard: if no session exists, send back to form
    const session = this.consultationService.currentSession;
    if (!session) {
      this.router.navigate(['/pre-consultation/form']);
      return;
    }

    this.startCountdown();
    this.pollForDoctor();
  }

  ngOnDestroy(): void {
    this.countdownSub?.unsubscribe();
    this.pollSub?.unsubscribe();
  }

  private startCountdown(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.countdownSub = interval(1000).subscribe(() => {
      if (this.doctorJoined) return;

      if (this.secondsLeft > 0) {
        this.secondsLeft--;
      } else {
        this.isExpired = true;
        this.countdownSub?.unsubscribe();
      }
    });
  }

  /**
   * Polls localStorage every 3s to check if doctor has joined.
   * In production, replace with WebSocket or SSE subscription.
   */
  private pollForDoctor(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.pollSub = interval(3000).subscribe(() => {
      this.consultationService.refreshSessionFromStorage();
      const session = this.consultationService.currentSession;

      if (session?.patient_status === 'ready' || session?.doctor_status === 'joined') {
        this.doctorJoined = true;
        this.countdownSub?.unsubscribe();
        this.pollSub?.unsubscribe();
      }
    });
  }

  onGoBack(): void {
    this.router.navigate(['/pre-consultation/form']);
  }
}

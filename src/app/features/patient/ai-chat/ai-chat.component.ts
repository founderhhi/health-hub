import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { AiChatService } from '../../../shared/services/ai-chat.service';
import { PatientApiService } from '../../../core/api/patient.service';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BottomNavComponent],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss'
})
export class AiChatComponent implements AfterViewChecked {
  @ViewChild('messagesList') messagesList?: ElementRef<HTMLDivElement>;

  private readonly aiChatService = inject(AiChatService);
  private readonly router = inject(Router);
  private readonly patientApi = inject(PatientApiService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly PATIENT_TABS = PATIENT_TABS;
  readonly sessionLimit = this.aiChatService.sessionLimit;
  readonly state$ = this.aiChatService.state$;

  draftMessage = '';
  sending = false;
  sendError = '';
  connectingToGp = false;
  private shouldScrollToBottom = false;

  ngAfterViewChecked(): void {
    if (!this.shouldScrollToBottom) {
      return;
    }
    const el = this.messagesList?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
    this.shouldScrollToBottom = false;
  }

  sendMessage(): void {
    if (this.sending) {
      return;
    }

    const input = this.draftMessage.trim();
    if (!input) {
      return;
    }

    this.sending = true;
    this.sendError = '';
    this.shouldScrollToBottom = true;

    this.aiChatService.sendMessage(input).subscribe({
      next: () => {
        this.draftMessage = '';
        this.sending = false;
        this.shouldScrollToBottom = true;
      },
      error: (err) => {
        this.sending = false;
        const code = String(err?.error?.code || '').toUpperCase();
        this.sendError =
          code === 'AI_CHAT_UNAVAILABLE'
            ? 'HealthHub AI is temporarily unavailable. Please try again in a moment.'
            : 'Message failed to send. Please check your connection and try again.';
      }
    });
  }

  connectToGP(): void {
    if (this.connectingToGp) return;
    this.connectingToGp = true;

    const state = this.aiChatService.getCurrentState();
    const userMessages = state.messages
      .filter(m => m.role === 'user')
      .map(m => m.content);
    const assistantMessages = state.messages
      .filter(m => m.role === 'assistant')
      .map(m => m.content);
    const complaint = state.triage?.complaint || userMessages[0] || 'General consult';
    const triageAnswers = state.triage?.triageAnswers?.length
      ? state.triage.triageAnswers
      : userMessages.slice(1);
    const triageSummary = state.triage?.triageSummary
      || assistantMessages[assistantMessages.length - 1]
      || 'Patient requested Health Expert handoff after AI triage.';
    const recommendedNextStep = state.triage?.recommendedNextStep
      || 'Connect to a Health Expert for further assessment.';

    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('hhi_consult_mode', 'video');
    }

    this.patientApi.requestConsult('video', {
      source: 'ai-triage',
      complaint,
      triageAnswers,
      triageSummary,
      recommendedNextStep,
    }).subscribe({
      next: () => {
        this.connectingToGp = false;
        this.router.navigate(['/patient/waiting']);
      },
      error: () => {
        this.connectingToGp = false;
        this.sendError = 'Unable to connect to a Health Expert right now. Please try again.';
      }
    });
  }

  bookGpConsultation(): void {
    this.connectToGP();
  }

  goDiagnostics(): void {
    this.router.navigate(['/patient/waiting']);
  }
}

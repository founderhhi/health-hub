import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { AiChatService } from '../../../shared/services/ai-chat.service';

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

  readonly PATIENT_TABS = PATIENT_TABS;
  readonly sessionLimit = this.aiChatService.sessionLimit;
  readonly state$ = this.aiChatService.state$;

  draftMessage = '';
  sending = false;
  sendError = '';
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

  bookGpConsultation(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}

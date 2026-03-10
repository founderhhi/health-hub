import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class AiChatComponent {
  private readonly aiChatService = inject(AiChatService);
  private readonly router = inject(Router);

  readonly PATIENT_TABS = PATIENT_TABS;
  readonly sessionLimit = this.aiChatService.sessionLimit;
  readonly state$ = this.aiChatService.state$;

  draftMessage = '';
  sending = false;

  sendMessage(): void {
    if (this.sending) {
      return;
    }

    const input = this.draftMessage.trim();
    if (!input) {
      return;
    }

    this.sending = true;

    this.aiChatService.sendMessage(input).subscribe({
      next: () => {
        this.draftMessage = '';
        this.sending = false;
      },
      error: () => {
        this.sending = false;
      }
    });
  }

  bookGpConsultation(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}

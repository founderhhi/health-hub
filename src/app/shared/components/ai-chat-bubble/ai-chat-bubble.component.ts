import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { AiChatService } from '../../services/ai-chat.service';

@Component({
  selector: 'app-ai-chat-bubble',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ai-chat-bubble.component.html',
  styleUrl: './ai-chat-bubble.component.scss'
})
export class AiChatBubbleComponent {
  private readonly aiChatService = inject(AiChatService);

  isOpen = false;

  readonly state$ = this.aiChatService.state$;
  readonly previewMessages$ = this.state$.pipe(map((state) => state.messages.slice(-2)));

  togglePanel(): void {
    this.isOpen = !this.isOpen;
  }

  closePanel(): void {
    this.isOpen = false;
  }
}

import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-room.html',
  styleUrl: './video-room.scss'
})
export class VideoRoomComponent implements OnChanges {
  @Input() roomUrl = '';
  @Input() title = 'Consultation room';
  @Input() allowOpenInNewTab = true;
  @Input() showLeaveButton = true;

  @Output() leave = new EventEmitter<void>();
  @Output() openedInNewTab = new EventEmitter<string>();

  safeRoomUrl: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roomUrl']) {
      this.safeRoomUrl = this.roomUrl
        ? this.sanitizer.bypassSecurityTrustResourceUrl(this.roomUrl)
        : null;
    }
  }

  onLeave(): void {
    this.leave.emit();
  }

  openInNewTab(): void {
    if (!this.roomUrl || !isPlatformBrowser(this.platformId)) {
      return;
    }

    window.open(this.roomUrl, '_blank', 'noopener,noreferrer');
    this.openedInNewTab.emit(this.roomUrl);
  }
}

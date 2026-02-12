import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operational-status-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operational-status-toggle.html',
  styleUrl: './operational-status-toggle.scss'
})
export class OperationalStatusToggleComponent {
  @Input() isOperating = true;
  @Output() isOperatingChange = new EventEmitter<boolean>();

  toggle(): void {
    this.isOperatingChange.emit(!this.isOperating);
  }
}

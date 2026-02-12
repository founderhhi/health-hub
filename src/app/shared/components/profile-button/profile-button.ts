import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-button.html',
  styleUrl: './profile-button.scss'
})
export class ProfileButtonComponent {
  @Input() label = 'Open profile';
  @Input() initials = '';
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent {
  activeCategory: string = 'consultations';
  
  categories = [
    { id: 'consultations', label: 'Consultations', icon: 'stethoscope' },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'pill' },
    { id: 'lab-results', label: 'Lab Results', icon: 'flask' },
    { id: 'documents', label: 'Documents', icon: 'file' }
  ];

  records = [
    {
      id: '1',
      title: 'General Consultation',
      doctor: 'Dr. Sarah Johnson',
      date: 'Jan 28, 2026',
      type: 'consultation'
    },
    {
      id: '2',
      title: 'Blood Test Results',
      doctor: 'City Diagnostics',
      date: 'Jan 25, 2026',
      type: 'lab'
    },
    {
      id: '3',
      title: 'Prescription - Amoxicillin',
      doctor: 'Dr. Michael Chen',
      date: 'Jan 20, 2026',
      type: 'prescription'
    }
  ];

  constructor(public router: Router) {}

  setCategory(categoryId: string): void {
    this.activeCategory = categoryId;
  }
}

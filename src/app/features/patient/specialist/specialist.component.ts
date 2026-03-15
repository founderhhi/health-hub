import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { PatientApiService } from '../../../core/api/patient.service';

interface SpecialistProfile {
  id?: string;
  display_name: string;
  first_name?: string;
  last_name?: string;
  specialty: string;
  facility_name?: string;
  bio?: string;
}

const FALLBACK_SPECIALISTS: SpecialistProfile[] = [
  { display_name: 'Dr. Amara Osei', specialty: 'Cardiology', bio: 'Heart and cardiovascular specialist with 12 years of experience.' },
  { display_name: 'Dr. Priya Sharma', specialty: 'Dermatology', bio: 'Skin, hair, and nail conditions specialist.' },
  { display_name: 'Dr. Fatima Hassan', specialty: 'Orthopedics', bio: 'Bones, joints, and musculoskeletal system specialist.' },
  { display_name: 'Dr. James Mwangi', specialty: 'Neurology', bio: 'Brain and nervous system disorders specialist.' },
  { display_name: 'Dr. David Kimani', specialty: 'Pediatrics', bio: 'Children and adolescent health specialist.' },
  { display_name: 'Dr. Sarah Okonkwo', specialty: 'Oncology', bio: 'Cancer diagnosis, treatment planning, and follow-up care specialist.' },
  { display_name: 'Dr. Grace Njoroge', specialty: 'ENT', bio: 'Ear, nose, and throat specialist.' },
  { display_name: 'Dr. Ahmed Yusuf', specialty: 'Ophthalmology', bio: 'Eye care and vision specialist.' },
];

@Component({
  selector: 'app-patient-specialist',
  standalone: true,
  imports: [CommonModule, FormsModule, BottomNavComponent],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.scss',
})
export class PatientSpecialistComponent implements OnInit {
  PATIENT_TABS = PATIENT_TABS;

  specialists: SpecialistProfile[] = [];
  filteredSpecialists: SpecialistProfile[] = [];
  searchQuery = '';
  loading = true;

  private location = inject(Location);
  private patientApi = inject(PatientApiService);

  ngOnInit(): void {
    this.patientApi.getSpecialists().subscribe({
      next: (res) => {
        const list = res?.specialists || [];
        this.specialists = list.length > 0 ? list : FALLBACK_SPECIALISTS;
        this.filteredSpecialists = this.specialists;
        this.loading = false;
      },
      error: () => {
        this.specialists = FALLBACK_SPECIALISTS;
        this.filteredSpecialists = this.specialists;
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredSpecialists = this.specialists;
      return;
    }
    this.filteredSpecialists = this.specialists.filter(s =>
      s.display_name.toLowerCase().includes(query) ||
      s.specialty.toLowerCase().includes(query)
    );
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  }

  goBack(): void {
    this.location.back();
  }
}

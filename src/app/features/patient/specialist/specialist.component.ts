import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent, PATIENT_TABS } from '../../../shared/components/bottom-nav/bottom-nav.component';
import { PatientApiService } from '../../../core/api/patient.service';

interface SpecialistProfile {
  id?: string | null;
  display_name: string;
  first_name?: string | null;
  last_name?: string | null;
  specialty: string;
  facility_name?: string | null;
  bio?: string | null;
}

const SEEDED_SPECIALISTS: SpecialistProfile[] = [
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
  loadError = '';
  loading = true;
  showAvailabilityNotice = true;
  readonly availabilityNotice = 'This feature is not yet active for personal specialist consultation — we will notify you as soon as it is live.';

  private location = inject(Location);
  private patientApi = inject(PatientApiService);

  ngOnInit(): void {
    this.loadSpecialists();
  }

  private loadSpecialists(): void {
    this.loading = true;
    this.loadError = '';

    this.patientApi.getSpecialists().subscribe({
      next: (res) => {
        this.specialists = this.mergeSpecialists(this.normalizeSpecialists(res?.specialists));
        this.applySearchFilter();
        this.loading = false;
      },
      error: () => {
        this.specialists = SEEDED_SPECIALISTS;
        this.filteredSpecialists = SEEDED_SPECIALISTS;
        this.loadError = 'Showing the seeded specialist directory while live listings reconnect.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.applySearchFilter();
  }

  private applySearchFilter(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredSpecialists = this.specialists;
      return;
    }

    this.filteredSpecialists = this.specialists.filter(s =>
      String(s.display_name || '').toLowerCase().includes(query) ||
      String(s.specialty || '').toLowerCase().includes(query) ||
      String(s.facility_name || '').toLowerCase().includes(query) ||
      String(s.bio || '').toLowerCase().includes(query)
    );
  }

  private mergeSpecialists(liveSpecialists: SpecialistProfile[]): SpecialistProfile[] {
    const merged = [...SEEDED_SPECIALISTS, ...liveSpecialists];
    const seen = new Set<string>();

    return merged.filter((specialist) => {
      const key = `${specialist.display_name}|${specialist.specialty}`.toLowerCase();
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  private normalizeSpecialists(rawList: unknown): SpecialistProfile[] {
    if (!Array.isArray(rawList)) {
      return [];
    }

    return rawList.map((item: any) => {
      const fallbackName = [item?.first_name, item?.last_name]
        .filter((part: unknown) => typeof part === 'string' && part.trim())
        .join(' ')
        .trim();

      return {
        id: item?.id || null,
        display_name: (item?.display_name || fallbackName || 'Specialist').trim(),
        first_name: item?.first_name || null,
        last_name: item?.last_name || null,
        specialty: (item?.specialty || 'General Specialist').trim(),
        facility_name: item?.facility_name || null,
        bio: item?.bio || null,
      };
    });
  }

  getInitials(name: string): string {
    return String(name || 'S')
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  dismissAvailabilityNotice(): void {
    this.showAvailabilityNotice = false;
  }

  goBack(): void {
    this.location.back();
  }
}

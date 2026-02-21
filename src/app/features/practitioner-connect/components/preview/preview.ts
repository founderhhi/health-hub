import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Practitioner {
  id: string;
  name: string;
  specialty: string;
  facility: string;
  phone: string;
  available: boolean;
  rating: number;
}

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preview.html',
  styleUrl: './preview.scss',
})
export class Preview {
  searchQuery = '';
  selectedSpecialty = '';

  readonly specialties = ['All', 'General Practice', 'Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics', 'Neurology'];

  readonly practitioners: Practitioner[] = [
    { id: '1', name: 'Dr. Sarah Mwangi', specialty: 'General Practice', facility: 'HealthHub Demo Clinic', phone: '+254 712 345 678', available: true, rating: 4.8 },
    { id: '2', name: 'Dr. James Odhiambo', specialty: 'Cardiology', facility: 'Nairobi Heart Centre', phone: '+254 700 111 222', available: true, rating: 4.9 },
    { id: '3', name: 'Dr. Amina Hassan', specialty: 'Dermatology', facility: 'Skin Care Specialists', phone: '+254 700 333 444', available: false, rating: 4.7 },
    { id: '4', name: 'Dr. Peter Kimani', specialty: 'Orthopedics', facility: 'Joint & Bone Clinic', phone: '+254 700 555 666', available: true, rating: 4.6 },
    { id: '5', name: 'Dr. Grace Wanjiku', specialty: 'Pediatrics', facility: 'Children\'s Health Centre', phone: '+254 700 777 888', available: true, rating: 4.9 },
    { id: '6', name: 'Dr. David Njoroge', specialty: 'Neurology', facility: 'Brain & Spine Institute', phone: '+254 700 999 000', available: false, rating: 4.5 },
    { id: '7', name: 'Dr. Fatma Ali', specialty: 'General Practice', facility: 'Community Health Hub', phone: '+254 711 222 333', available: true, rating: 4.7 },
    { id: '8', name: 'Dr. Robert Ochieng', specialty: 'Cardiology', facility: 'Heart Care Nairobi', phone: '+254 711 444 555', available: true, rating: 4.8 },
  ];

  get filteredPractitioners(): Practitioner[] {
    return this.practitioners.filter(p => {
      const matchesSpecialty = !this.selectedSpecialty || this.selectedSpecialty === 'All' || p.specialty === this.selectedSpecialty;
      const matchesSearch = !this.searchQuery ||
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.specialty.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.facility.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesSpecialty && matchesSearch;
    });
  }

  selectSpecialty(specialty: string): void {
    this.selectedSpecialty = specialty === 'All' ? '' : specialty;
  }

  getInitials(name: string): string {
    return name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HealthVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  channel: string;
  tags: string[];
}

@Component({
  selector: 'app-video-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-search.html',
  styleUrl: './video-search.scss',
})
export class VideoSearch {
  searchQuery = '';
  selectedTag = '';
  popupBlocked = false;

  readonly tags = ['All', 'Nutrition', 'Exercise', 'Mental Health', 'Heart Health', 'Diabetes', 'Sleep'];

  readonly videos: HealthVideo[] = [
    {
      id: 'vyakarnam-1',
      title: 'Dr Vyakarnam Nageshwar | Importance of Gut Health | Tips to Improve Your Gut Health | SumanTV Health',
      description: 'Interview on why gut health matters and practical ways to improve digestion and everyday wellness.',
      youtubeId: 'oQJqndTSVMM',
      duration: '11:06',
      channel: 'SumanTV Health',
      tags: ['Nutrition']
    },
    {
      id: 'vyakarnam-2',
      title: 'Dr Vyakarnam Nageshwar About Gut Microbiota | Best Way to Improve Gut Health in Telugu | PlayEven',
      description: 'Telugu explainer focused on gut microbiota and habits that support a healthier digestive system.',
      youtubeId: 'gE_C6aCMmdI',
      duration: '11:24',
      channel: 'PlayEven',
      tags: ['Nutrition', 'Mental Health']
    },
    {
      id: 'vyakarnam-3',
      title: 'Dr  Vyakarnam Nageshwar : How to improve gut health naturally | Gut health foods | Gut health',
      description: 'Natural gut-health foods and routines discussed in a practical Telugu health segment.',
      youtubeId: '_a5Rlfc_8WQ',
      duration: '11:03',
      channel: 'SumanTV Health',
      tags: ['Nutrition']
    },
    {
      id: 'vyakarnam-4',
      title: 'Foods Good for Lungs and Breathing | Dr.Vyakarnam Nageshwar | Karun Media Health',
      description: 'Quick doctor-led guide to foods that may support lungs, breathing comfort, and respiratory wellness.',
      youtubeId: '2jFFvzoYENg',
      duration: '2:50',
      channel: 'karun media Health & Homeo',
      tags: ['Nutrition', 'Heart Health']
    },
    {
      id: 'vyakarnam-5',
      title: 'Dr Vyakarnam Nageshwar, On Yoga for life',
      description: 'Short yoga-for-life segment featuring Dr. Vyakarnam Nageshwar on movement and overall well-being.',
      youtubeId: 'GZaVSgxBbyA',
      duration: '3:03',
      channel: 'Iyer Kameshwaran',
      tags: ['Exercise', 'Mental Health']
    },
    {
      id: 'vyakarnam-6',
      title: '#AllergistDesk | Dr Vyakarnam Nageshwar | Misdiagnosed Allergies Leads to Psychiatric Issues?',
      description: 'Explains how missed allergy diagnoses can be mistaken for psychiatric issues and why proper evaluation matters.',
      youtubeId: 'NRnxz7BmDTo',
      duration: '1:43',
      channel: 'Aswini Allergy Centre',
      tags: ['Mental Health']
    },
    {
      id: 'vyakarnam-7',
      title: '#Aswiniallergy | Dr Vyakarnam Nageshwar | Allergic Rhinitis Treatment | Trichy Patient Testimonial',
      description: 'Patient story about allergic rhinitis, bronchitis, and restless legs, showing how chronic allergies can disrupt rest.',
      youtubeId: 'tDUZdqN_Vr4',
      duration: '15:41',
      channel: 'Aswini Allergy Centre',
      tags: ['Sleep']
    },
    {
      id: 'vyakarnam-8',
      title: '#AllergistDesk | Boosting Immunity to Tackle Allergies in Viral Infection | Dr Vyakarnam Nageshwar',
      description: 'Immunity-focused tips for allergy-prone patients during viral infection spikes, including diet and vitamin guidance.',
      youtubeId: 't4RDnJe0o94',
      duration: '3:04',
      channel: 'Aswini Allergy Centre',
      tags: ['Nutrition', 'Sleep']
    },
    {
      id: 'vyakarnam-9',
      title: 'Dr.Vyakarnam Nageshwar, Best Talk on Allergy & Asthma causes & Prevention 1800-425-0095.',
      description: 'Longer talk on allergy and asthma causes, prevention, and overall respiratory care.',
      youtubeId: 'Rpa5R7OZaz0',
      duration: '22:05',
      channel: 'DR.VYAKARNAM NAGESHWAR',
      tags: ['Heart Health', 'Sleep']
    },
    {
      id: 'vyakarnam-10',
      title: '#AllergistDesk | Monsoon Allergies Alerts | Tips & Precautions by Dr Vyakarnam Nageshwar',
      description: 'Monsoon-season precautions for allergy-prone patients, with practical steps to reduce symptoms and sleep disruption.',
      youtubeId: 'LNgKLQB-wL8',
      duration: '5:24',
      channel: 'Aswini Allergy Centre',
      tags: ['Sleep']
    },
  ];

  get filteredVideos(): HealthVideo[] {
    return this.videos.filter(v => {
      const matchesTag = !this.selectedTag || this.selectedTag === 'All' || v.tags.includes(this.selectedTag);
      const matchesSearch = !this.searchQuery ||
        v.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }

  selectTag(tag: string): void {
    this.selectedTag = tag === 'All' ? '' : tag;
  }

  getThumbnail(video: HealthVideo): string {
    return `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
  }

  getVideoUrl(video: HealthVideo): string {
    return `https://www.youtube.com/watch?v=${video.youtubeId}`;
  }

  openVideo(video: HealthVideo): void {
    this.popupBlocked = false;
    const opened = window.open(this.getVideoUrl(video), '_blank', 'noopener,noreferrer');
    this.popupBlocked = !opened;
  }
}

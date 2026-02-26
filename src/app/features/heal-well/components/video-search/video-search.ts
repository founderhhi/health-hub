import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HealthVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  tags: string[];
  url: string;
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

  readonly tags = ['All', 'Nutrition', 'Exercise', 'Mental Health', 'Heart Health', 'Diabetes', 'Sleep'];

  readonly videos: HealthVideo[] = [
    {
      id: '1', title: 'Understanding Blood Pressure',
      description: 'Learn what blood pressure numbers mean and how to keep them in a healthy range.',
      thumbnail: '', duration: '8:24',
      tags: ['Heart Health'], url: 'https://www.youtube.com/results?search_query=understanding+blood+pressure'
    },
    {
      id: '2', title: 'Balanced Diet Basics',
      description: 'A practical guide to building balanced meals for better health.',
      thumbnail: '', duration: '12:10',
      tags: ['Nutrition'], url: 'https://www.youtube.com/results?search_query=balanced+diet+basics'
    },
    {
      id: '3', title: '10-Minute Morning Stretch Routine',
      description: 'Start your day with this gentle stretch routine suitable for all fitness levels.',
      thumbnail: '', duration: '10:00',
      tags: ['Exercise'], url: 'https://www.youtube.com/results?search_query=morning+stretch+routine'
    },
    {
      id: '4', title: 'Managing Stress and Anxiety',
      description: 'Evidence-based techniques for managing everyday stress and anxiety.',
      thumbnail: '', duration: '15:32',
      tags: ['Mental Health'], url: 'https://www.youtube.com/results?search_query=managing+stress+anxiety+techniques'
    },
    {
      id: '5', title: 'Type 2 Diabetes Prevention',
      description: 'Simple lifestyle changes that can significantly reduce your diabetes risk.',
      thumbnail: '', duration: '11:45',
      tags: ['Diabetes', 'Nutrition'], url: 'https://www.youtube.com/results?search_query=type+2+diabetes+prevention'
    },
    {
      id: '6', title: 'Better Sleep Habits',
      description: 'Improve your sleep quality with these science-backed tips.',
      thumbnail: '', duration: '9:18',
      tags: ['Sleep', 'Mental Health'], url: 'https://www.youtube.com/results?search_query=better+sleep+habits'
    },
    {
      id: '7', title: 'Home Cardio Workout',
      description: 'A 20-minute cardio session you can do at home with no equipment.',
      thumbnail: '', duration: '20:00',
      tags: ['Exercise', 'Heart Health'], url: 'https://www.youtube.com/results?search_query=home+cardio+workout+no+equipment'
    },
    {
      id: '8', title: 'Understanding Your Lab Results',
      description: 'A simple guide to common blood test results and what they mean.',
      thumbnail: '', duration: '14:20',
      tags: ['Heart Health', 'Diabetes'], url: 'https://www.youtube.com/results?search_query=understanding+blood+test+results'
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

  openVideo(video: HealthVideo): void {
    const opened = window.open(video.url, '_blank', 'noopener,noreferrer');
    if (!opened) {
      window.location.assign(video.url);
    }
  }
}

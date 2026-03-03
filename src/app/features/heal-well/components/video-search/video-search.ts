import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HealthVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
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
      id: '1', title: 'Understanding Blood Pressure',
      description: 'Learn what blood pressure numbers mean and how to keep them in a healthy range.',
      youtubeId: 'rAwliNWe1bI', duration: '8:24',
      tags: ['Heart Health']
    },
    {
      id: '2', title: 'Balanced Diet Basics',
      description: 'A practical guide to building balanced meals for better health.',
      youtubeId: 'v6u7hJPE4J8', duration: '12:10',
      tags: ['Nutrition']
    },
    {
      id: '3', title: '10-Minute Morning Stretch Routine',
      description: 'Start your day with this gentle stretch routine suitable for all fitness levels.',
      youtubeId: 'I-4NZ9PM3gQ', duration: '10:00',
      tags: ['Exercise']
    },
    {
      id: '4', title: 'Managing Stress and Anxiety',
      description: 'Evidence-based techniques for managing everyday stress and anxiety.',
      youtubeId: 'yju9639nANg', duration: '15:32',
      tags: ['Mental Health']
    },
    {
      id: '5', title: 'Type 2 Diabetes Prevention',
      description: 'Simple lifestyle changes that can significantly reduce your diabetes risk.',
      youtubeId: '3k3uj6hTzBI', duration: '11:45',
      tags: ['Diabetes', 'Nutrition']
    },
    {
      id: '6', title: 'Better Sleep Habits',
      description: 'Improve your sleep quality with these science-backed tips.',
      youtubeId: '5MuIMqhT8DM', duration: '9:18',
      tags: ['Sleep', 'Mental Health']
    },
    {
      id: '7', title: 'Home Cardio Workout',
      description: 'A 20-minute cardio session you can do at home with no equipment.',
      youtubeId: 'J9qjK2RZ8dU', duration: '20:00',
      tags: ['Exercise', 'Heart Health']
    },
    {
      id: '8', title: 'Understanding Your Lab Results',
      description: 'A simple guide to common blood test results and what they mean.',
      youtubeId: 'rAwliNWe1bI', duration: '14:20',
      tags: ['Heart Health', 'Diabetes']
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

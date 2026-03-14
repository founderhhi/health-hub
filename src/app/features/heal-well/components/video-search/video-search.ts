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
      id: 'nageshwar-1',
      title: 'Healthy eating habits | Dr. D Nageshwar Reddy Daily Routine | Sakshi Life',
      description: 'Quick Telugu wellness segment on daily eating habits and practical food choices for a healthier routine.',
      youtubeId: 'ztZf8Os4aUg',
      duration: '4:24',
      channel: 'Sakshi Life',
      tags: ['Nutrition']
    },
    {
      id: 'nageshwar-2',
      title: 'World best healthy diet plan | Mediterranean diet for better health| Dr Nageshwar Reddy |Sakshi Life',
      description: 'Long-form Mediterranean diet explainer focused on gut-friendly eating patterns and better long-term wellness.',
      youtubeId: 'kWXv7EvEEv8',
      duration: '27:49',
      channel: 'Sakshi Life',
      tags: ['Nutrition', 'Heart Health']
    },
    {
      id: 'nageshwar-3',
      title: 'Probiotic foods and activities to support Gut health ||  Dr. D Nageshwar Reddy | Sakshi Life',
      description: 'Short Telugu guide to probiotic foods and daily habits that support gut health.',
      youtubeId: 'voVfR3yf_s0',
      duration: '3:24',
      channel: 'Sakshi Life',
      tags: ['Nutrition']
    },
    {
      id: 'nageshwar-4',
      title: '150 నిముషాలు వాకింగ్ = మీ జీవితం మారిపోతుంది! Dr. D Nageshwar Reddy Abt Walking & Exercise | SumanTV',
      description: 'Walking and exercise discussion built around the health benefits of reaching 150 minutes of movement each week.',
      youtubeId: '_baP2_ZjnTg',
      duration: '8:30',
      channel: 'SumanTV Arogyam',
      tags: ['Exercise', 'Heart Health']
    },
    {
      id: 'nageshwar-5',
      title: 'Gut brain connection | Gut heart connection | Gut health | Dr. D Nageshwar Reddy | Sakshi Life',
      description: 'A short explainer on how gut health connects with brain function, heart health, and overall well-being.',
      youtubeId: 'g0TrrqpQAh4',
      duration: '3:23',
      channel: 'Sakshi Life',
      tags: ['Mental Health', 'Heart Health']
    },
    {
      id: 'nageshwar-6',
      title: 'Dr.D Nageshwar Reddy about GERD | Early Dinner Benefits | Sleep Disorders | Life Style | Sakshi Life',
      description: 'Sleep-focused lifestyle talk covering GERD, the benefits of early dinners, and common sleep-disorder triggers.',
      youtubeId: 'y4ExGGug9Ag',
      duration: '15:10',
      channel: 'Sakshi Life',
      tags: ['Sleep', 'Nutrition']
    },
    {
      id: 'nageshwar-7',
      title: '300 ఉన్న షుగర్ 150 దిగుతుంది || Diabetes, sugar thaggalante #diabetes || Dr. D. Nageshwar Reddy',
      description: 'Telugu diabetes discussion focused on lowering high sugar readings and improving day-to-day glucose control.',
      youtubeId: 'jh2aTm2i2qo',
      duration: '39:34',
      channel: 'iD Health 360',
      tags: ['Diabetes']
    },
    {
      id: 'nageshwar-8',
      title: 'ఈ ఇంజక్షన్ తో షుగర్ కంట్రోల్.. Dr Nageshwar Reddy About Mounjaro Injection | Diabetes Control',
      description: 'Diabetes-management explainer on Mounjaro injection and how it is being discussed for blood sugar control.',
      youtubeId: 't7985tDmf-w',
      duration: '13:19',
      channel: 'PlayEven',
      tags: ['Diabetes']
    },
    {
      id: 'nageshwar-9',
      title: 'Dr. Nageshwar Reddy About Diseases With Frozen & Junk Food Eating | World IBD Day @life.sakshi',
      description: 'World IBD Day segment about the health risks linked to frozen and junk-food-heavy eating habits.',
      youtubeId: 'oviXfOJlbww',
      duration: '8:12',
      channel: 'Sakshi Life',
      tags: ['Nutrition', 'Heart Health']
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

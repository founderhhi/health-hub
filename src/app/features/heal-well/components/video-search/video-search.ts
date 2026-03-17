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

  readonly tags = ['All', 'Cold & Flu', 'Digestive Discomfort', 'Joint Pain', 'Blood Sugar Care', 'Stress & Sleep'];

  readonly videos: HealthVideo[] = [
    {
      id: 'cold-flu-1',
      title: 'Ancient Home Remedy for Colds and Flu - Made with 1, 2, or 3 Simple Ingredients',
      description: 'Simple at-home preparation ideas for easing common cold and flu symptoms.',
      youtubeId: 'JWvD587jeMQ',
      duration: '16:37',
      channel: "Mary's Nest",
      tags: ['Cold & Flu']
    },
    {
      id: 'cold-flu-2',
      title: 'How to get rid of cold and flu cough sore throat home remedies',
      description: 'General pharmacist-led tips for cough, sore throat comfort, and supportive home care.',
      youtubeId: 'oXAjj1UQ2N4',
      duration: '10:41',
      channel: 'AbrahamThePharmacist',
      tags: ['Cold & Flu']
    },
    {
      id: 'digestive-1',
      title: '3 simple ways to release trapped gas from your gut',
      description: 'Quick routine ideas that can reduce digestive discomfort and gas-related bloating.',
      youtubeId: 'mKEkEHqPx88',
      duration: '8:37',
      channel: 'Prashanth Yoga',
      tags: ['Digestive Discomfort']
    },
    {
      id: 'digestive-2',
      title: 'Reduce Bloating with these 3 Simple Steps',
      description: 'Short practical reminders for improving digestion habits and reducing routine bloating.',
      youtubeId: 'CxzCxmz76LY',
      duration: '2:08',
      channel: 'Ryan Fernando',
      tags: ['Digestive Discomfort']
    },
    {
      id: 'joint-pain-1',
      title: 'Knee pain and swelling: Home Remedies',
      description: 'Doctor-led overview of early home-care strategies for knee pain and swelling.',
      youtubeId: 'fsvbKjcJ65o',
      duration: '4:32',
      channel: 'Apollo Spectra',
      tags: ['Joint Pain']
    },
    {
      id: 'joint-pain-2',
      title: '5 BEST Natural Remedies for Arthritis',
      description: 'General arthritis-focused guidance on natural symptom support for chronic joint pain.',
      youtubeId: 'ZlGrTuYs8JY',
      duration: '0:59',
      channel: 'Dr. Diana Girnita - Rheumatologist OnCall',
      tags: ['Joint Pain']
    },
    {
      id: 'diabetes-1',
      title: '7 simple home remedies to control blood sugar',
      description: 'Nutrition-focused daily tips for supporting healthy blood-sugar routines at home.',
      youtubeId: 'MA4UPnPB-mc',
      duration: '4:53',
      channel: 'Aashirvaad',
      tags: ['Blood Sugar Care']
    },
    {
      id: 'diabetes-2',
      title: '4 Home Remedies to Control Diabetes | Natural Home remedies for Diabetes',
      description: 'Home-care basics and lifestyle consistency reminders for diabetes self-management.',
      youtubeId: 'w4zSBSM0Vhk',
      duration: '5:48',
      channel: 'Healthy Kadai',
      tags: ['Blood Sugar Care']
    },
    {
      id: 'stress-sleep-1',
      title: 'Super Fast Anti-Anxiety Relief Point!',
      description: 'Rapid, non-invasive pressure-point guidance to manage stress spikes in the moment.',
      youtubeId: 'nZP088xSDeQ',
      duration: '10:17',
      channel: 'motivationaldoc',
      tags: ['Stress & Sleep']
    },
    {
      id: 'stress-sleep-2',
      title: 'Instant Relaxation for Anxiety, Stress & Insomnia!',
      description: 'Breathing and relaxation prompts focused on stress release and better sleep readiness.',
      youtubeId: 'KVTKZKh2fuU',
      duration: '14:04',
      channel: 'motivationaldoc',
      tags: ['Stress & Sleep']
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

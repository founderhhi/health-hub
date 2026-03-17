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

interface GuideCard {
  title: string;
  body: string;
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

  readonly tags = [
    'All',
    'Cold & Flu',
    'Digestive Discomfort',
    'Joint Pain',
    'Blood Sugar Care',
    'Stress & Sleep',
    'Nutrition',
    'Exercise',
    'Mental Health',
    'Heart Health',
    'Sleep',
  ];

  readonly homeRemedyVideos: HealthVideo[] = [
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

  readonly legacyExpertVideos: HealthVideo[] = [
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

  readonly guideCards: GuideCard[] = [
    {
      title: 'Start with mild symptoms only',
      body: 'Use these videos for light self-care ideas such as rest, hydration, food choices, or gentle movement when symptoms are manageable.',
    },
    {
      title: 'Escalate to a Health Expert early',
      body: 'If symptoms are lingering, worsening, or affecting daily life, move from home care to a Health Expert consultation rather than waiting too long.',
    },
    {
      title: 'Know when home care is not enough',
      body: 'Breathing difficulty, severe pain, fainting, high fever, confusion, or chest symptoms should skip this page and go straight to urgent medical support.',
    },
  ];

  get filteredHomeRemedyVideos(): HealthVideo[] {
    return this.filterVideos(this.homeRemedyVideos);
  }

  get filteredLegacyVideos(): HealthVideo[] {
    return this.filterVideos(this.legacyExpertVideos);
  }

  get hasAnyFilteredVideos(): boolean {
    return this.filteredHomeRemedyVideos.length > 0 || this.filteredLegacyVideos.length > 0;
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

  private filterVideos(videos: HealthVideo[]): HealthVideo[] {
    return videos.filter((video) => this.matchesVideo(video));
  }

  private matchesVideo(video: HealthVideo): boolean {
    const normalizedQuery = this.searchQuery.toLowerCase().trim();
    const matchesTag = !this.selectedTag || this.selectedTag === 'All' || video.tags.includes(this.selectedTag);
    const matchesSearch = !normalizedQuery
      || video.title.toLowerCase().includes(normalizedQuery)
      || video.description.toLowerCase().includes(normalizedQuery)
      || video.channel.toLowerCase().includes(normalizedQuery);

    return matchesTag && matchesSearch;
  }
}

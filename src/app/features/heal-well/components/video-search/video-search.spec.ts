import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSearch } from './video-search';

describe('VideoSearch', () => {
  let component: VideoSearch;
  let fixture: ComponentFixture<VideoSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose only supported tags for curated videos', () => {
    const supportedTags = new Set(component.tags.filter((tag) => tag !== 'All'));

    expect(component.videos.length).toBeGreaterThanOrEqual(5);
    expect(component.videos.length).toBeLessThanOrEqual(10);

    for (const video of component.videos) {
      expect(video.tags.length).toBeGreaterThan(0);
      for (const tag of video.tags) {
        expect(supportedTags.has(tag)).toBe(true);
      }
    }
  });
});

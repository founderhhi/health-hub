import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'hhi_theme';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  private readonly currentThemeSubject = new BehaviorSubject<ThemeMode>('dark');
  readonly currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.currentThemeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.currentThemeSubject.next(theme);
    this.applyTheme(theme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  private initializeTheme(): void {
    const initialTheme = this.getStoredTheme();
    this.currentThemeSubject.next(initialTheme);
    this.applyTheme(initialTheme);
  }

  private getStoredTheme(): ThemeMode {
    if (!isPlatformBrowser(this.platformId)) {
      return 'dark';
    }

    const savedTheme = localStorage.getItem(this.storageKey);
    return savedTheme === 'light' ? 'light' : 'dark';
  }

  private applyTheme(theme: ThemeMode): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}

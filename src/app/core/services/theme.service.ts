import { effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme-preference';
  private readonly CUSTOM_THEME_KEY = 'app-custom-theme';

  private readonly _isDarkMode = signal<boolean>(false);

  readonly isDarkMode = this._isDarkMode.asReadonly();

  private readonly themes: Record<'light' | 'dark', ThemeConfig> = {
    light: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#14b8a6',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#a78bfa',
      accent: '#2dd4bf',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f9fafb',
    },
  };

  constructor() {
    this.initializeTheme();
    this.setupEffects();
  }

  initializeTheme(): void {
    const savedTheme = this.getSavedTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    this._isDarkMode.set(isDark);
  }

  private setupEffects(): void {
    effect(() => {
      const isDark = this._isDarkMode();
      this.applyThemeToDOM(isDark);
      this.saveTheme(isDark ? 'dark' : 'light');
    });
  }

  toggleTheme(): void {
    this._isDarkMode.update(current => !current);
  }

  setTheme(theme: Theme): void {
    this._isDarkMode.set(theme === 'dark');
  }

  getTheme(): Theme {
    return this._isDarkMode() ? 'dark' : 'light';
  }

  private applyThemeToDOM(isDark: boolean): void {
    const theme = isDark ? this.themes.dark : this.themes.light;
    const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    root.classList.toggle('dark', isDark);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.background);
    }
  }

  private saveTheme(theme: Theme): void {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }

  private getSavedTheme(): Theme | null {
    try {
      const saved = localStorage.getItem(this.THEME_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
    return null;
  }

  setCustomTheme(config: Partial<ThemeConfig>): void {
    const currentConfig = this._isDarkMode() ? this.themes.dark : this.themes.light;
    const newConfig = { ...currentConfig, ...config };

    this.saveCustomTheme(newConfig);
    this.applyCustomTheme(newConfig);
  }

  private saveCustomTheme(config: ThemeConfig): void {
    try {
      localStorage.setItem(this.CUSTOM_THEME_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save custom theme:', error);
    }
  }

  private applyCustomTheme(config: ThemeConfig): void {
    const root = document.documentElement;
    Object.entries(config).forEach(([key, value]) => {
      root.style.setProperty(`--custom-${key}`, value);
    });
  }

  resetCustomTheme(): void {
    try {
      localStorage.removeItem(this.CUSTOM_THEME_KEY);
      const root = document.documentElement;
      ['primary', 'secondary', 'accent', 'background', 'surface', 'text'].forEach(key => {
        root.style.removeProperty(`--custom-${key}`);
      });
    } catch (error) {
      console.error('Failed to reset custom theme:', error);
    }
  }

  enableHighContrast(): void {
    document.documentElement.classList.add('high-contrast');
  }

  disableHighContrast(): void {
    document.documentElement.classList.remove('high-contrast');
  }

  enableReducedMotion(): void {
    document.documentElement.classList.add('reduce-motion');
  }

  disableReducedMotion(): void {
    document.documentElement.classList.remove('reduce-motion');
  }
}

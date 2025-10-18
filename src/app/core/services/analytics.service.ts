import { DestroyRef, inject, Injectable, signal, computed } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environment';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

interface SessionMetrics {
  readonly startTime: number;
  readonly pageViewCount: number;
  readonly engagementTime: number;
  readonly lastActiveTime: number;
  readonly isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly GA_MEASUREMENT_ID = environment.googleAnalyticsId;

  private readonly _initialized = signal(false);
  private readonly _sessionMetrics = signal<SessionMetrics>({
    startTime: Date.now(),
    pageViewCount: 0,
    engagementTime: 0,
    lastActiveTime: Date.now(),
    isActive: true
  });

  readonly initialized = this._initialized.asReadonly();
  readonly sessionMetrics = this._sessionMetrics.asReadonly();
  readonly sessionDuration = computed(() =>
    Math.floor((Date.now() - this.sessionMetrics().startTime) / 1000)
  );

  private engagementIntervalId?: number;
  private inactivityTimerId?: number;

  initialize(): void {
    if (this._initialized()) {
      return;
    }

    if (!environment.features.analytics || !this.GA_MEASUREMENT_ID) {
      return;
    }

    this.initializeGoogleAnalytics();
    this.setupRouterTracking();
    this.setupSessionMetrics();
    this.setupCleanup();

    this._initialized.set(true);
  }

  trackPageView(url: string, title?: string): void {
    if (!this.isAnalyticsAvailable()) return;

    this._sessionMetrics.update(m => ({
      ...m,
      pageViewCount: m.pageViewCount + 1
    }));

    window.gtag!('event', 'page_view', {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
      page_view_count: this.sessionMetrics().pageViewCount,
    });
  }

  trackEvent(action: string, category: string, params?: EventParams): void {
    if (!this.isAnalyticsAvailable()) return;
    window.gtag!('event', action, { event_category: category, ...params });
  }

  trackTiming(name: string, value: number, category = 'Performance', label?: string): void {
    if (!this.isAnalyticsAvailable()) return;
    window.gtag!('event', 'timing_complete', {
      name,
      value,
      event_category: category,
      event_label: label,
    });
  }

  trackSocialInteraction(network: string, action: string, target?: string): void {
    if (!this.isAnalyticsAvailable()) return;
    window.gtag!('event', 'social_interaction', {
      social_network: network,
      social_action: action,
      social_target: target,
    });
  }

  trackContactFormSubmit(formName: string, success = true): void {
    this.trackEvent('form_submit', 'contact', {
      form_name: formName,
      success,
    });
  }

  trackResumeDownload(): void {
    this.trackEvent('resume_download', 'engagement');
  }

  private initializeGoogleAnalytics(): void {
    if (typeof window === 'undefined' || !this.GA_MEASUREMENT_ID) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
    });
  }

  private setupRouterTracking(): void {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  private setupSessionMetrics(): void {
    this.startEngagementTracking();
    this.setupInactivityDetection();
    this.setupVisibilityTracking();
  }

  private startEngagementTracking(): void {
    this.engagementIntervalId = window.setInterval(() => {
      if (this.sessionMetrics().isActive) {
        this._sessionMetrics.update(m => ({
          ...m,
          engagementTime: m.engagementTime + 1
        }));
      }
    }, 1000);
  }

  private setupInactivityDetection(): void {
    const resetInactivityTimer = () => {
      this._sessionMetrics.update(m => ({
        ...m,
        lastActiveTime: Date.now(),
        isActive: true
      }));

      if (this.inactivityTimerId) {
        clearTimeout(this.inactivityTimerId);
      }

      this.inactivityTimerId = window.setTimeout(() => {
        this._sessionMetrics.update(m => ({ ...m, isActive: false }));
      }, 30000);
    };

    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetInactivityTimer, { passive: true });
    });

    resetInactivityTimer();
  }

  private setupVisibilityTracking(): void {
    document.addEventListener('visibilitychange', () => {
      this._sessionMetrics.update(m => ({
        ...m,
        isActive: document.visibilityState === 'visible'
      }));
    });
  }

  private setupCleanup(): void {
    this.destroyRef.onDestroy(() => {
      if (this.engagementIntervalId) {
        clearInterval(this.engagementIntervalId);
      }
      if (this.inactivityTimerId) {
        clearTimeout(this.inactivityTimerId);
      }

      const metrics = this.sessionMetrics();
      this.trackEvent('session_end', 'engagement', {
        duration: this.sessionDuration(),
        engagement_time: metrics.engagementTime,
        page_views: metrics.pageViewCount,
      });
    });
  }

  private isAnalyticsAvailable(): boolean {
    return typeof window !== 'undefined' &&
      typeof window.gtag === 'function';
  }
}

import {inject, Injectable, isDevMode, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {environment} from '../../../environment';

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

@Injectable({providedIn: 'root'})
export class AnalyticsService implements OnDestroy {
  private router = inject(Router);
  private readonly GA_MEASUREMENT_ID = environment.googleAnalyticsId;
  private initialized = false;
  private sessionStartTime!: number;
  private pageViewCount = 0;

  private eventListeners: Array<{ target: any; event: string; handler: any }> = [];
  private engagementInterval?: number;
  private inactivityTimer?: number;

  private engagementTime = 0;
  private lastActiveTime = Date.now();
  private isActive = true;

  constructor() {
    if (environment.production && !isDevMode()) {
      this.initializeGoogleAnalytics();
      this.trackRouterEvents();
      this.trackSessionMetrics();
    }
  }

  trackPageView(url: string, title?: string): void {
    if (!this.isAnalyticsAvailable()) return;

    this.pageViewCount++;
    window.gtag!('event', 'page_view', {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
      page_view_count: this.pageViewCount,
    });
  }

  trackEvent(action: string, category: string, params?: EventParams): void {
    if (!this.isAnalyticsAvailable()) return;
    window.gtag!('event', action, {event_category: category, ...params});
  }

  trackException(description: string, fatal = false): void {
    if (!this.isAnalyticsAvailable()) return;
    window.gtag!('event', 'exception', {description, fatal});
  }

  trackTiming(name: string, value: number, category?: string, label?: string): void {
    if (!this.isAnalyticsAvailable()) return;
    window.gtag!('event', 'timing_complete', {
      name,
      value,
      event_category: category || 'Performance',
      event_label: label,
    });
  }

  trackSocialInteraction(network: string, action: string, target?: string): void {
    if (!this.isAnalyticsAvailable()) return;
    window.gtag!('event', 'social', {
      social_network: network,
      social_action: action,
      social_target: target || window.location.href,
    });
  }

  trackProjectView(projectId: string, projectName: string): void {
    this.trackEvent('view_project', 'projects', {
      event_label: projectName,
      project_id: projectId,
    });
  }

  trackContactFormSubmit(method: string): void {
    this.trackEvent('contact_form_submit', 'engagement', {
      event_label: method,
    });
  }

  trackResumeDownload(): void {
    this.trackEvent('resume_download', 'engagement', {
      event_label: 'pdf',
    });
  }

  trackSkillFilter(skill: string): void {
    this.trackEvent('filter_skills', 'engagement', {
      event_label: skill,
    });
  }

  trackScrollDepth(percentage: number): void {
    this.trackEvent('scroll', 'engagement', {
      event_label: `${percentage}%`,
      value: percentage,
    });
  }

  trackExternalLink(url: string): void {
    this.trackEvent('click', 'external_link', {
      event_label: url,
      transport_type: 'beacon',
    });
  }

  ngOnDestroy(): void {
    this.eventListeners.forEach(({target, event, handler}) => {
      target.removeEventListener(event, handler);
    });

    if (this.engagementInterval) clearInterval(this.engagementInterval);
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
  }

  private initializeGoogleAnalytics(): void {
    if (this.initialized || !this.GA_MEASUREMENT_ID) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer!.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.GA_MEASUREMENT_ID, {
      send_page_view: false,
      cookie_flags: 'SameSite=None;Secure',
    });

    this.initialized = true;
    this.sessionStartTime = Date.now();
  }

  private trackRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event: NavigationEnd) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  private trackSessionMetrics(): void {
    const beforeUnloadHandler = () => {
      const sessionDuration = Date.now() - this.sessionStartTime;
      this.trackEvent('session', 'duration', {
        value: Math.round(sessionDuration / 1000),
        event_label: 'session_end',
      });
    };

    this.addEventListener(window, 'beforeunload', beforeUnloadHandler);

    const trackEngagement = () => {
      if (this.isActive) this.engagementTime += Date.now() - this.lastActiveTime;
      this.lastActiveTime = Date.now();
    };

    const activityHandler = () => {
      if (!this.isActive) {
        this.isActive = true;
        this.lastActiveTime = Date.now();
      }
      trackEngagement();
    };

    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event =>
      this.addEventListener(window, event, activityHandler, {passive: true})
    );

    const resetInactivityTimer = () => {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = window.setTimeout(() => {
        this.isActive = false;
        trackEngagement();
      }, 30000);
    };

    this.addEventListener(window, 'mousemove', resetInactivityTimer, {passive: true});
    resetInactivityTimer();

    this.engagementInterval = window.setInterval(() => {
      if (this.engagementTime > 0) {
        this.trackEvent('engagement', 'time_spent', {
          value: Math.round(this.engagementTime / 1000),
        });
        this.engagementTime = 0;
      }
    }, 60000);
  }

  private addEventListener(target: any, event: string, handler: any, options?: any): void {
    target.addEventListener(event, handler, options);
    this.eventListeners.push({target, event, handler});
  }

  private isAnalyticsAvailable(): boolean {
    return typeof window !== 'undefined' &&
      !!window.gtag &&
      environment.production &&
      this.initialized;
  }
}

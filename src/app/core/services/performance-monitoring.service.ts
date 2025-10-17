import { DestroyRef, inject, Injectable, isDevMode, signal } from '@angular/core';
import { AnalyticsService } from './analytics.service';

export interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

@Injectable({ providedIn: 'root' })
export class PerformanceMonitoringService {
  private readonly analyticsService = inject(AnalyticsService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _metrics = signal<PerformanceMetrics>({});

  private observers: PerformanceObserver[] = [];
  private isMonitoring = false;

  initialize(): void {
    if (this.isMonitoring || isDevMode() || !this.isSupported()) {
      return;
    }

    this.isMonitoring = true;
    this.observeWebVitals();
    this.observeNavigationTiming();
    this.setupCleanup();
  }

  private observeWebVitals(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        if (!lastEntry) return;

        const value = lastEntry.renderTime || lastEntry.loadTime || 0;
        this.updateMetric('lcp', value);
        this.reportToAnalytics('LCP', value);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(lcpObserver);

      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as (PerformanceEntry & {
          processingStart?: number;
        })[];
        entries.forEach((entry) => {
          const value = (entry.processingStart || 0) - entry.startTime;
          this.updateMetric('fid', value);
          this.reportToAnalytics('FID', value);
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      this.observers.push(fidObserver);

      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        const entries = entryList.getEntries() as (PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        })[];
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value || 0;
          }
        });
        this.updateMetric('cls', clsValue);
        this.reportToAnalytics('CLS', clsValue);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(clsObserver);

      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.updateMetric('fcp', entry.startTime);
            this.reportToAnalytics('FCP', entry.startTime);
          }
        });
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
      this.observers.push(fcpObserver);

    } catch (error) {
      console.error('Error setting up performance observers:', error);
    }
  }

  private observeNavigationTiming(): void {
    if (!('performance' in window)) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navEntry) {
          const ttfb = navEntry.responseStart;
          this.updateMetric('ttfb', ttfb);
          this.reportToAnalytics('TTFB', ttfb);
          this.reportToAnalytics('DOMContentLoaded', navEntry.domContentLoadedEventEnd);
          this.reportToAnalytics('PageLoad', navEntry.loadEventEnd);
        }
      }, 0);
    });
  }

  private updateMetric(key: keyof PerformanceMetrics, value: number): void {
    this._metrics.update(current => ({ ...current, [key]: value }));
  }

  private reportToAnalytics(metric: string, value: number): void {
    const rounded = Math.round(value * 100) / 100;
    this.analyticsService.trackTiming(metric, rounded, 'Performance');
  }

  private setupCleanup(): void {
    this.destroyRef.onDestroy(() => {
      this.observers.forEach(observer => observer.disconnect());
      this.observers = [];
    });
  }

  private isSupported(): boolean {
    return typeof window !== 'undefined' &&
      'performance' in window &&
      'PerformanceObserver' in window;
  }
}

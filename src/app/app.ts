import {ChangeDetectionStrategy, Component, effect, inject, isDevMode} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import {ThemeService} from '@services/theme.service';
import {AnalyticsService} from '@services/analytics.service';
import {SeoService} from '@services/seo.service';
import {LoaderService} from '@services/loader.service';
import {PerformanceMonitoringService} from '@services/performance-monitoring.service';
import {ScrollService} from '@shared/services/scroll-to-top.service';

import {FooterComponent, ScrollToTopComponent, TopMenuComponent} from '@components/layout';
import {LoaderComponent} from '@components/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopMenuComponent,
    FooterComponent,
    LoaderComponent,
    ScrollToTopComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly seoService = inject(SeoService);
  private readonly loaderService = inject(LoaderService);
  private readonly performanceService = inject(PerformanceMonitoringService);
  private readonly scrollService = inject(ScrollService);

  constructor() {
    this.initializeApp();
    this.setupRouterEvents();
    this.setupThemeEffect();
  }

  private initializeApp(): void {
    this.themeService.initializeTheme();
    this.initializeAOS();
    this.seoService.setDefaultTags();
    this.analyticsService.initialize();
    if (!isDevMode()) {
      this.performanceService.initialize();
    }
  }

  private setupRouterEvents(): void {
    this.router.events
      .pipe(
        filter((e): e is NavigationStart => e instanceof NavigationStart),
        takeUntilDestroyed()
      )
      .subscribe(() => this.loaderService.show());

    this.router.events
      .pipe(
        filter(
          (e): e is NavigationEnd | NavigationCancel | NavigationError =>
            e instanceof NavigationEnd ||
            e instanceof NavigationCancel ||
            e instanceof NavigationError
        ),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.loaderService.hide();
        this.scrollService.scrollToTop();
      });
  }

  private setupThemeEffect(): void {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.themeService.isDarkMode());
    });
  }

  private initializeAOS(): void {
    if (typeof window === 'undefined') return;

    import('aos').then((AOS) => {
      (AOS as any).default.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50,
        delay: 0,
        anchorPlacement: 'top-bottom'
      });
    });
  }
}

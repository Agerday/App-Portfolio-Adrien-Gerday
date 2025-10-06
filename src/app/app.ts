import {ChangeDetectionStrategy, Component, effect, inject, isDevMode, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import {ThemeService} from '@services/theme.service';
import {AnalyticsService} from '@services/analytics.service';
import {SeoService} from '@services/seo.service';
import {LoaderService} from '@services/loader.service';
import {PerformanceMonitoringService} from '@services/performance-monitoring.service';
import {ScrollService} from '@shared/services/scroll-to-top.service';

import {FooterComponent, TopMenuComponent, ScrollToTopComponent} from '@components/layout';
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
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly seoService = inject(SeoService);
  private readonly loaderService = inject(LoaderService);
  private readonly performanceService = inject(PerformanceMonitoringService);
  private readonly scrollService = inject(ScrollService);

  private readonly darkModeEffect = effect(() => {
    document.documentElement.classList.toggle('dark', this.themeService.isDarkMode());
  });

  constructor() {
    this.themeService.initializeTheme();
    this.setupRouterEvents();
  }

  ngOnInit(): void {
    this.initializeAOS();
    this.seoService.setDefaultTags();
    this.analyticsService.trackPageView(this.router.url);

    if (!isDevMode()) {
      this.performanceService.initializeMonitoring();
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
        filter(e =>
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
        ),
        takeUntilDestroyed()
      )
      .subscribe((e) => {
        this.loaderService.hide();

        if (e instanceof NavigationEnd) {
          this.analyticsService.trackPageView(e.urlAfterRedirects);
          this.scrollService.scrollToTop();
          this.updateSeoFromRoute();
        }
      });
  }

  private updateSeoFromRoute(): void {
    const route = this.getActivatedRoute();
    const {title, description, keywords} = route.snapshot.data;

    if (title) {
      this.seoService.update({title, description, keywords});
    }
  }

  private getActivatedRoute() {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private initializeAOS(): void {
    import('aos')
      .then(AOS => {
        AOS.init({
          duration: 800,
          once: true,
          offset: 100,
          delay: 100
        });
      })
      .catch(err => console.error('Failed to load AOS:', err));
  }
}

import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {fromEvent, interval, Subject, throttleTime} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnalyticsService} from '@services/analytics.service';
import {SeoService} from '@services/seo.service';
import {GitHubService} from '@services/github.service';
import {
  ButtonComponent,
  CardComponent,
  ContributionGraphComponent, GitHubStatsComponent,
  LanguageChartComponent,
  SectionComponent
} from '@components/ui';
import {environment} from '../../../environment';

import {SKILL_ICON_MAP, TECH_STACK, TOP_SKILLS} from '@core/data/skills.data';
import {FEATURES, STATS} from '@core/data/portfolio.data';
import {FEATURED_PROJECTS} from '@core/data/projects.data';
import {PERSONAL_INFO} from '@core/data/resume.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ButtonComponent,
    SectionComponent,
    CardComponent,
    ContributionGraphComponent,
    LanguageChartComponent,
    GitHubStatsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly animatedStats = signal([0, 0, 0, 0]);
  readonly allTechStack = TECH_STACK;
  readonly topSkills = TOP_SKILLS;
  readonly stats = STATS;
  readonly features = FEATURES;
  readonly featuredProjects = FEATURED_PROJECTS;
  protected readonly PERSONAL_INFO = PERSONAL_INFO;

  private readonly analyticsService = inject(AnalyticsService);
  private readonly seoService = inject(SeoService);
  private readonly githubService = inject(GitHubService);
  private readonly destroy$ = new Subject<void>();

  readonly githubLoading = this.githubService.loading;
  readonly githubStats = this.githubService.stats;

  ngOnInit(): void {
    this.seoService.update({
      title: 'Home',
      description: 'Senior Frontend Engineer specializing in Angular, React, and TypeScript. ' +
        'Building high-performance web applications.',
      keywords: 'frontend engineer, angular developer, react developer, typescript, web development'
    });

    this.animateCounters();
    this.trackPageMetrics();
    this.githubService.fetchGitHubData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackResumeDownload(): void {
    this.analyticsService.trackResumeDownload();
    const link = document.createElement('a');
    link.href = 'assets/documents/Adrien-Gerday-Resume-React-Developer.pdf';
    link.download = 'Adrien-Gerday-Resume-React-Developer.pdf';
    link.click();
  }

  trackGitHubClick(): void {
    this.analyticsService.trackExternalLink(PERSONAL_INFO.contact.github);
  }

  getIconClass(name: string): string {
    return SKILL_ICON_MAP[name] || '';
  }

  private animateCounters(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.runCounterAnimation();
          observer.disconnect();
        }
      });
    }, {threshold: 0.3});

    setTimeout(() => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection) observer.observe(statsSection);
    }, 500);
  }

  private runCounterAnimation(): void {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const animation = interval(stepDuration)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        currentStep++;
        const progress = currentStep / steps;

        this.animatedStats.update(() =>
          this.stats.map(stat => Math.floor(stat.value * progress))
        );

        if (currentStep >= steps) {
          this.animatedStats.update(() => this.stats.map(stat => stat.value));
          animation.unsubscribe();
        }
      });
  }

  private trackPageMetrics(): void {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 75) {
          this.analyticsService.trackScrollDepth(75);
          this.destroy$.next();
        }
      });
  }
}

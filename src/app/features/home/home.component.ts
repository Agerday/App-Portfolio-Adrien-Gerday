import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AnalyticsService } from '@services/analytics.service';
import { SeoService } from '@services/seo.service';
import { GitHubService } from '@services/github.service';
import {
  ButtonComponent,
  CardComponent,
  SectionComponent,
  ActivityTimelineComponent,
  LanguageChartComponent
} from '@components/ui';

import { SKILL_ICON_MAP, TECH_STACK, TOP_SKILLS } from '@core/data/skills.data';
import { FEATURES } from '@core/data/portfolio.data';
import { FEATURED_PROJECTS } from '@core/data/projects.data';
import { PERSONAL_INFO } from '@core/data/resume.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ButtonComponent,
    SectionComponent,
    CardComponent,
    ActivityTimelineComponent,
    LanguageChartComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly analyticsService = inject(AnalyticsService);
  private readonly seoService = inject(SeoService);
  private readonly githubService = inject(GitHubService);

  readonly allTechStack = TECH_STACK;
  readonly topSkills = TOP_SKILLS;
  readonly features = FEATURES;
  readonly featuredProjects = FEATURED_PROJECTS;
  readonly PERSONAL_INFO = PERSONAL_INFO;

  readonly githubLoading = this.githubService.loading;
  readonly githubLanguages = this.githubService.topLanguages;

  constructor() {
    this.initializeSeo();
    this.githubService.fetchGitHubData();
    this.analyticsService.trackPageView('home');
  }

  getIconClass(skill: string): string {
    return SKILL_ICON_MAP[skill] || skill.toLowerCase();
  }

  trackResumeDownload(): void {
    this.analyticsService.trackEvent('resume_download', 'engagement');
    window.open('/assets/resume.pdf', '_blank');
  }

  trackGitHubClick(): void {
    this.analyticsService.trackEvent('github_click', 'social');
  }

  private initializeSeo(): void {
    this.seoService.update({
      title: 'Home',
      description: 'Senior Frontend Engineer specializing in Angular, React, and TypeScript. Building high-performance web applications.',
      keywords: 'Angular, React, TypeScript, Frontend Engineer, Web Development'
    });
  }
}

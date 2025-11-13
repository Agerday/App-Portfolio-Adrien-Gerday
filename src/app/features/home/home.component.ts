import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';

import {AnalyticsService} from '@services/analytics.service';
import {SeoService} from '@services/seo.service';
import {GitHubService} from '@services/github.service';
import {
  ActivityTimelineComponent,
  ButtonComponent,
  CardComponent,
  LanguageChartComponent,
  SectionComponent
} from '@components/ui';

import {TECH_STACK, TOP_SKILLS} from '@core/data/skills.data';
import {FEATURES} from '@core/data/portfolio.data';
import {FEATURED_PROJECTS} from '@core/data/projects.data';
import {PERSONAL_INFO} from '@core/data/resume.data';
import {SocialIconComponent} from '@components/ui/primitives/icon/social-icon.component';
import {RESUME_DOWNLOAD, RESUME_LINK, SOCIAL_LINKS} from '@core/data/social-links.data';
import {TechIconComponent} from '@components/ui/primitives/icon/tech-icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ButtonComponent,
    SectionComponent,
    CardComponent,
    ActivityTimelineComponent,
    LanguageChartComponent,
    SocialIconComponent,
    TechIconComponent
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
  readonly socialLinks = SOCIAL_LINKS;

  readonly githubLoading = this.githubService.loading;
  readonly githubLanguages = this.githubService.topLanguages;

  constructor() {
    this.initializeSeo();
    this.githubService.fetchGitHubData();
    this.analyticsService.trackPageView('home');
  }

  trackResumeDownload(): void {
    this.analyticsService.trackResumeDownload();
    const link = document.createElement('a');
    link.href = RESUME_LINK;
    link.download = RESUME_DOWNLOAD;
    link.click();
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

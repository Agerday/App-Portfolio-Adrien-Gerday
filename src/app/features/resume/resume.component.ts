import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {SeoService} from '@services/seo.service';
import {AnalyticsService} from '@services/analytics.service';
import {PageLayoutComponent} from '@components/layout';
import {ButtonComponent, CardComponent} from '@components/ui';
import {EDUCATION, EXPERIENCE, PERSONAL_INFO, SKILLS} from '@core/data/resume.data';
import {SocialIconComponent} from '@components/ui/primitives/icon/social-icon.component';
import {RESUME_DOWNLOAD, RESUME_LINK} from '@core/data/social-links.data';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [PageLayoutComponent, ButtonComponent, CardComponent, SocialIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  readonly personalInfo = PERSONAL_INFO;
  readonly experience = EXPERIENCE;
  readonly education = EDUCATION;
  readonly skills = SKILLS;
  private readonly seoService = inject(SeoService);
  private readonly analyticsService = inject(AnalyticsService);

  constructor() {
    this.seoService.update({
      title: 'Resume',
      description: `Professional resume of ${this.personalInfo.name}, ${this.personalInfo.title}`,
      keywords: 'resume, CV, frontend developer, professional experience, React, Angular'
    });
  }

  downloadPDF(): void {
    this.analyticsService.trackResumeDownload();
    const link = document.createElement('a');
    link.href = RESUME_LINK;
    link.download = RESUME_DOWNLOAD;
    link.click();
  }

  print(): void {
    this.analyticsService.trackEvent('resume_print', 'engagement');
    window.print();
  }
}

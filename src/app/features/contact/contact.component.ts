import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { SeoService } from '@services/seo.service';
import { AnalyticsService } from '@services/analytics.service';
import {
  ButtonComponent,
  CardComponent,
  ContactInfoItemComponent,
  PageHeaderComponent,
  SectionComponent,
  FaqItemComponent
} from '@components/ui';
import { PageLayoutComponent } from '@components/layout';
import { PERSONAL_INFO } from '@core/data/resume.data';
import { FAQS } from '@core/data/faq.data';

const ANIMATION_CONFIG = {
  cardDelay: 100,
  faqItemDelay: 50
} as const;

interface ContactInfoConfig {
  readonly icon: string;
  readonly label: string;
  readonly value: string;
  readonly link?: string;
  readonly pulse?: boolean;
}

interface SocialLinkConfig {
  readonly url: string;
  readonly label: string;
  readonly icon: string;
  readonly isIconFont?: boolean;
  readonly ariaLabel: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CardComponent,
    ButtonComponent,
    PageHeaderComponent,
    ContactInfoItemComponent,
    PageLayoutComponent,
    SectionComponent,
    FaqItemComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly analyticsService = inject(AnalyticsService);

  readonly personalInfo = PERSONAL_INFO;
  readonly faqs = FAQS;
  readonly animationConfig = ANIMATION_CONFIG;

  readonly contactInfoItems: readonly ContactInfoConfig[] = [
    {
      icon: 'mail',
      label: 'Email',
      value: PERSONAL_INFO.contact.email,
      link: `mailto:${PERSONAL_INFO.contact.email}`
    },
    {
      icon: 'public',
      label: 'Location',
      value: 'Asia • Open to Relocation'
    },
    {
      icon: 'check_circle',
      label: 'Status',
      value: 'Available Immediately',
      pulse: true
    },
    {
      icon: 'schedule',
      label: 'Time Zones',
      value: 'Experienced with -8h difference'
    }
  ] as const;

  readonly socialLinks: readonly SocialLinkConfig[] = [
    {
      url: PERSONAL_INFO.contact.linkedin,
      label: 'View Profile',
      icon: 'fab fa-linkedin',
      isIconFont: true,
      ariaLabel: 'View LinkedIn profile'
    },
    {
      url: `https://www.linkedin.com/messaging/compose/?recipient=${this.getLinkedInUsername()}`,
      label: 'Send Message',
      icon: 'send',
      ariaLabel: 'Send LinkedIn message'
    }
  ] as const;

  ngOnInit(): void {
    this.seoService.update({
      title: 'Contact - Hire Me',
      description: 'Senior Frontend Engineer available for relocation in APAC. Ready to commit long-term and deliver world-class results.',
      keywords: 'frontend engineer, hire developer, remote work, relocation, visa sponsorship, APAC'
    });

    this.analyticsService.trackPageView('contact');
  }

  trackSocialClick(platform: string): void {
    this.analyticsService.trackSocialInteraction('linkedin', 'click', platform);
  }

  trackEmailClick(): void {
    this.analyticsService.trackEvent('email_click', 'contact', {
      method: 'cta_button'
    });
  }

  private getLinkedInUsername(): string {
    const match = PERSONAL_INFO.contact.linkedin.match(/in\/([^/]+)/);
    return match ? match[1] : 'adrien-gerday';
  }
}

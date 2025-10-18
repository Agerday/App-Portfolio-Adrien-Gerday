import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PERSONAL_INFO} from '@core/data/resume.data';
import {SocialIconComponent} from '@components/ui/primitives/icon/social-icon.component';

interface SocialLink {
  name: string;
  url: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SocialIconComponent
  ],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: PERSONAL_INFO.contact.github,
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      name: 'LinkedIn',
      url: PERSONAL_INFO.contact.linkedin,
      ariaLabel: 'Connect with me on LinkedIn'
    },
    {
      name: 'Email',
      url: `mailto:${PERSONAL_INFO.contact.email}`,
      ariaLabel: 'Send me an email'
    },
  ];
  protected readonly PERSONAL_INFO = PERSONAL_INFO;
}

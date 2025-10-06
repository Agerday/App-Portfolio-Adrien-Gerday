import {ChangeDetectionStrategy, Component} from '@angular/core';
import {environment} from '../../../../../environment';

interface SocialLink {
  name: string;
  url: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: environment.social.github,
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      name: 'LinkedIn',
      url: environment.social.linkedin,
      ariaLabel: 'Connect with me on LinkedIn'
    },
    {
      name: 'Email',
      url: `mailto:${environment.social.email}`,
      ariaLabel: 'Send me an email'
    },
  ];

  getSocialIcon(name: string): string {
    const icons: Record<string, string> = {
      'GitHub': 'fab fa-github text-xl',
      'LinkedIn': 'fab fa-linkedin text-xl',
      'Email': 'fas fa-envelope text-xl'
    };
    return icons[name] || 'fas fa-link text-xl';
  }
}

import {PERSONAL_INFO} from './resume.data';

export type SocialPlatform = 'github' | 'linkedin' | 'email';

export interface SocialLink {
  platform: SocialPlatform;
  name: string;
  url: string;
  ariaLabel: string;
  label?: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    platform: 'github',
    name: 'GitHub',
    url: PERSONAL_INFO.contact.github,
    ariaLabel: 'Visit my GitHub profile'
  },
  {
    platform: 'linkedin',
    name: 'LinkedIn',
    url: PERSONAL_INFO.contact.linkedin,
    ariaLabel: 'Connect with me on LinkedIn',
    label: 'View Profile'
  },
  {
    platform: 'email',
    name: 'Email',
    url: `mailto:${PERSONAL_INFO.contact.email}`,
    ariaLabel: 'Send me an email'
  }
] as const;

export const LINKEDIN_MESSAGE_LINK = {
  platform: 'linkedin' as const,
  name: 'LinkedIn',
  url: `https://www.linkedin.com/messaging/compose/?recipient=adrien-gerday`,
  ariaLabel: 'Send LinkedIn message',
  label: 'Send Message'
};

import {Component, inject, OnInit} from '@angular/core';
import {SeoService} from '@services/seo.service';
import {AnalyticsService} from '@services/analytics.service';

interface Experience {
  company: string;
  position: string;
  location: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
  highlights?: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [
    {
      company: 'SPF Finances',
      position: 'React Frontend Lead',
      location: 'Brussels, Belgium',
      duration: 'Aug 2020 – Jan 2023',
      responsibilities: [
        'Led a team of 3 developers in building internal web tools for the Finance Department.',
        'Designed and implemented a scalable React architecture integrated with Java-based backend APIs.',
        'Introduced reusable form and table modules that reduced development time by 30%.'
      ],
      technologies: ['React', 'TypeScript', 'Java', 'REST APIs', 'Material UI', 'Docker'],
      highlights: ['Promoted to Lead after 6 months', 'Developed modular components reused across projects']
    },
    {
      company: 'European Commission',
      position: 'Frontend Developer',
      location: 'Remote (EU)',
      duration: 'Apr 2020 – Aug 2020',
      responsibilities: [
        'Implemented complex UI workflows for data visualization dashboards.',
        'Optimized Angular performance and improved rendering efficiency.',
        'Collaborated with UX designers and backend teams for feature alignment.'
      ],
      technologies: ['Angular', 'RxJS', 'SCSS', 'REST APIs'],
    },
    {
      company: 'Private Bank',
      position: 'Frontend Developer',
      location: 'Brussels, Belgium',
      duration: 'Jan 2020 – Apr 2020',
      responsibilities: [
        'Developed and maintained core banking front-office web components.',
        'Implemented authentication and account summary modules.',
        'Worked closely with QA to ensure high test coverage and compliance.'
      ],
      technologies: ['Angular', 'TypeScript', 'SASS', 'Jasmine'],
    }
  ];
  private seoService = inject(SeoService);
  private analytics = inject(AnalyticsService);

  ngOnInit(): void {
    this.seoService.update({
      title: 'Professional Experience | Career Journey',
      description: 'Detailed overview of my professional experience as a frontend developer, highlighting leadership and technical expertise in React and Angular.',
      keywords: 'frontend experience, Angular, React, developer career, software engineering'
    });
  }

  trackCompanyClick(company: string): void {
    this.analytics.trackEvent('experience_click', 'career', {company});
  }
}

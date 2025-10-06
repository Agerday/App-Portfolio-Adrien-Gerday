import {AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SeoService} from '@services/seo.service';
import {PageLayoutComponent} from '@components/layout/page-layout/page-layout.component';
import {PageHeaderComponent} from '@components/ui/page-header/page-header.component';
import {CardComponent} from '@components/ui/card/card.component';
import {ButtonComponent, SectionComponent} from '@components/ui';
import {BadgeComponent} from '@components/ui/badge/badge.component';

interface Timeline {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'achievement';
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    SectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly seoService = inject(SeoService);
  private scrollHandler?: () => void;

  timelineVisible = signal<boolean[]>([false, false, false, false, false, false, false, false]);
  timelineProgress = signal(0);

  readonly values: Value[] = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'Committed to delivering high-quality code and exceptional user experiences'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Embracing new technologies and approaches to solve complex problems'
    },
    {
      icon: '👥',
      title: 'Collaboration',
      description: 'Building strong relationships and fostering team success'
    }
  ];

  readonly timeline: Timeline[] = [
    {
      year: '2025',
      title: 'Full-Stack Solo Developer – NUMBR',
      description: `Built a full accounting SaaS from scratch using React, TypeScript, Node.js.
      Delivered responsive UI with MUI, handled backend APIs and authentication, and deployed through Firebase Hosting.`,
      type: 'work'
    },
    {
      year: '2024',
      title: 'Front End Lead – FPS Finance (Multi-Client Tax Management Platform)',
      description: `Led frontend modernization for four tax clients using Angular 17.
      Refactored legacy code, introduced modular architecture, enhanced UX feedback, and improved CI/CD.`,
      type: 'work'
    },
    {
      year: '2023',
      title: 'Front End Lead (React) & Back End Lead (Java) – FPS Finance (Data Visualization Platform)',
      description: `Delivered advanced analytics dashboards with React, Redux, and Chart.js. Implemented interactive visualizations, live calculations, and optimized large dataset rendering.`,
      type: 'work'
    },
    {
      year: '2021–2023',
      title: 'Front End Lead – FPS Finance (Document Factory Platform)',
      description: `Developed a modular, drag-and-drop system for digital document generation using React and Java.
       Built reusable UI templates, dynamic grid layouts, and real-time citizen feedback integration.`,
      type: 'work'
    },
    {
      year: '2020-2021',
      title: 'Front End Lead – European Commission (Dynamic Form Platform)',
      description: `Architected a modular form system for EU institutions using Angular 8 and RxJS. Delivered multilingual,
      responsive, and configurable forms across departments.`,
      type: 'work'
    },
    {
      year: '2020 (Q1)',
      title: 'Front End Lead – Private Bank (Financial Data Processing Tool)',
      description: `Developed performant XML data visualization and Excel export features using Angular and Apache POI.
       Optimized table performance and improved processing speed by 50%.`,
      type: 'work'
    },
    {
      year: '2019',
      title: 'Full-Stack Developer & Agile Training',
      description: `Completed intensive full-stack bootcamp in Angular, Java (Spring Boot), and agile methodologies.
      Built production-ready web applications through real-world simulations.`,
      type: 'education'
    }
  ];

  readonly highlights = [
    {
      icon: '📚',
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and best practices'
    },
    {
      icon: '🧭',
      title: 'Leadership & Mentorship',
      description: 'Guiding developers and helping teams grow through code reviews and shared best practices.'
    },
    {
      icon: '⚡',
      title: 'Performance & Optimization',
      description: 'Delivering fast, scalable applications that feel seamless and efficient.'
    },
    {
      icon: '🎨',
      title: 'Design & UX',
      description: 'Crafting interfaces that blend clarity, emotion, and precision.'
    },
    {
      icon: '🚀',
      title: 'Product Building',
      description: 'Turning ambitious ideas into high-quality, user-focused products.'
    }
  ];

  ngOnInit(): void {
    this.seoService.update({
      title: 'About Me',
      description: 'Learn about my professional journey, skills, and passion for Angular development',
      keywords: 'Angular developer, about, experience, skills, professional background'
    });

    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler, {passive: true});
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.handleScroll(), 100);
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  private handleScroll(): void {
    const timelineSection = document.querySelector('.max-w-5xl.mx-auto.relative');
    if (!timelineSection) return;

    const mobileItems = timelineSection.querySelectorAll('.md\\:hidden');
    const desktopItems = timelineSection.querySelectorAll('.hidden.md\\:block');

    const timelineItems = window.innerWidth >= 768 ? desktopItems : mobileItems;
    const newVisible = [...this.timelineVisible()];
    let visibleCount = 0;

    timelineItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85;

      if (isVisible && !newVisible[index]) {
        newVisible[index] = true;
      }

      if (newVisible[index]) {
        visibleCount++;
      }
    });

    this.timelineVisible.set(newVisible);
    this.timelineProgress.set((visibleCount / this.timeline.length) * 100);
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/documents/Adrien-Gerday-Resume-React-Developer.pdf';
    link.download = 'Adrien-Gerday-Resume-React-Developer.pdf';
    link.click();
  }
}

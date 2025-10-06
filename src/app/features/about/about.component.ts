import {AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';

import {SeoService} from '@services/seo.service';
import {PageLayoutComponent} from '@components/layout/page-layout/page-layout.component';
import {PageHeaderComponent} from '@components/ui/page-header/page-header.component';
import {CardComponent} from '@components/ui/card/card.component';
import {ButtonComponent, SectionComponent} from '@components/ui';
import {BadgeComponent} from '@components/ui/badge/badge.component';

import {HIGHLIGHTS, TIMELINE, VALUES} from '@core/data/about.data';

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
  readonly timelineVisible = signal<boolean[]>(new Array(TIMELINE.length).fill(false));
  readonly timelineProgress = signal(0);
  readonly values = VALUES;
  readonly timeline = TIMELINE;
  readonly highlights = HIGHLIGHTS;
  private readonly seoService = inject(SeoService);
  private scrollHandler?: () => void;

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

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/documents/Adrien-Gerday-Resume-React-Developer.pdf';
    link.download = 'Adrien-Gerday-Resume-React-Developer.pdf';
    link.click();
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
}

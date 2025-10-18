import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {SeoService} from '@services/seo.service';
import {AnalyticsService} from '@services/analytics.service';
import {TESTIMONIALS} from '@core/data/testimonials.data';
import {PROJECTS} from '@core/data/projects.data';
import {PageLayoutComponent} from '@components/layout';
import {CardComponent, CtaSectionComponent, PageHeaderComponent, SectionComponent} from '@components/ui';
import {SocialIconComponent} from '@components/ui/primitives/icon/social-icon.component';

type FilterType = 'all' | 'featured';

interface ProjectLink {
  id: string;
  title: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    SectionComponent,
    CardComponent,
    CtaSectionComponent,
    SocialIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {
  private readonly seoService = inject(SeoService);
  private readonly analyticsService = inject(AnalyticsService);

  readonly allTestimonials = TESTIMONIALS;
  readonly allProjects = PROJECTS;
  readonly activeFilter = signal<FilterType>('all');

  readonly filteredTestimonials = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'featured') {
      return this.allTestimonials.filter(t => t.featured);
    }
    return this.allTestimonials;
  });

  constructor() {
    this.seoService.update({
      title: 'Client Testimonials & Reviews',
      description: 'Read what colleagues say about working with me. Real feedback from real projects showcasing quality,' +
        ' reliability, and professional excellence.',
      keywords: 'testimonials, reviews, recommendations, professional references'
    });

    this.analyticsService.trackPageView('testimonials');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getRatingStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getProjectLinks(projectIds?: string[]): ProjectLink[] {
    if (!projectIds || projectIds.length === 0) {
      return [];
    }

    return projectIds
      .map(id => {
        const project = this.allProjects.find(p => p.id === id);
        return project ? {id: project.id, title: project.title} : null;
      })
      .filter((link): link is ProjectLink => link !== null);
  }
}

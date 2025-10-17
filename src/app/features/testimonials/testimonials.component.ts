import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SeoService} from '@services/seo.service';
import {AnalyticsService} from '@services/analytics.service';
import {TESTIMONIALS} from '@core/data/testimonials.data';
import {PageLayoutComponent} from '@components/layout';
import {ButtonComponent, CardComponent, PageHeaderComponent, SectionComponent} from '@components/ui';

type FilterType = 'all' | 'featured';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    RouterLink,
    PageLayoutComponent,
    PageHeaderComponent,
    SectionComponent,
    CardComponent,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly analyticsService = inject(AnalyticsService);

  readonly allTestimonials = TESTIMONIALS;
  readonly activeFilter = signal<FilterType>('all');

  readonly filteredTestimonials = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'featured') {
      return this.allTestimonials.filter(t => t.featured);
    }
    return this.allTestimonials;
  });

  ngOnInit(): void {
    this.seoService.update({
      title: 'Client Testimonials & Reviews',
      description: 'Read what colleagues say about working with me. Real feedback from real projects showcasing ' +
        'quality, reliability, and professional excellence.',
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
}

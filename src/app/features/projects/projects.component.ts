import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {AnalyticsService} from '@services/analytics.service';
import {SeoService} from '@services/seo.service';
import {PageLayoutComponent} from '@components/layout';
import {
  EmptyStateComponent,
  PageHeaderComponent,
  ProjectCardComponent,
  SearchInputComponent,
  SectionComponent
} from '@components/ui';
import {PROJECT_CATEGORIES, PROJECTS} from '@core/data/projects.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    SectionComponent,
    SearchInputComponent,
    ProjectCardComponent,
    EmptyStateComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  private readonly analyticsService = inject(AnalyticsService);
  private readonly seoService = inject(SeoService);

  readonly searchQuery = signal('');
  readonly selectedCategory = signal<string>('all');
  readonly projects = PROJECTS;
  readonly categories = PROJECT_CATEGORIES;

  readonly filteredProjects = computed(() => {
    let filtered = this.projects;
    if (this.selectedCategory() !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory());
    }
    const search = this.searchQuery().toLowerCase();
    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.technologies.some(t => t.toLowerCase().includes(search))
      );
    }
    return filtered;
  });

  readonly filteredFeatured = computed(() =>
    this.filteredProjects().filter(p => p.featured)
  );

  readonly filteredNonFeatured = computed(() =>
    this.filteredProjects().filter(p => !p.featured)
  );

  readonly showFeaturedSection = computed(() =>
    this.filteredFeatured().length > 0 &&
    this.selectedCategory() === 'all'
  );

  readonly hasActiveFilters = computed(() =>
    this.searchQuery() !== '' || this.selectedCategory() !== 'all'
  );

  constructor() {
    this.initializeSeo();
    this.analyticsService.trackPageView('projects');
  }

  private initializeSeo(): void {
    this.seoService.update({
      title: 'Projects',
      description: 'Explore my portfolio of Angular and React applications, showcasing modern web development ' +
        'practices and innovative solutions.',
      keywords: 'projects, portfolio, Angular, React, web development, case studies'
    });
  }

  getProjectCountByCategory(category: string): number {
    return this.projects.filter(p => p.category === category).length;
  }

  getCategoryLabel(category: string): string {
    return this.categories.find(c => c.value === category)?.label || category;
  }

  trackProjectClick(projectId: string, action: 'view' | 'live' | 'github'): void {
    this.analyticsService.trackEvent('project_click', 'projects', {
      project_id: projectId,
      action
    });
  }

  clearAllFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('all');
  }
}

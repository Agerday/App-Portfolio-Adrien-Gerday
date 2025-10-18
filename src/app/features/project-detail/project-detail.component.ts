import {ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {SeoService} from '@services/seo.service';
import {AnalyticsService} from '@services/analytics.service';
import {PROJECTS} from '@core/data/projects.data';
import {Project} from '@models/project.models';
import {SocialIconComponent} from '@components/ui/primitives/icon/social-icon.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    SocialIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);
  private readonly analyticsService = inject(AnalyticsService);

  readonly project = signal<Project | null>(null);
  readonly lightboxOpen = signal(false);
  readonly currentImageIndex = signal(0);

  constructor() {
    effect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.lightboxOpen()) {
          this.closeLightbox();
        }
      };
      if (this.lightboxOpen()) {
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
      }
      return undefined;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.loadProject(projectId);
    });
  }

  loadProject(id: string): void {
    const found = PROJECTS.find(p => p.id === id);
    if (found) {
      this.project.set(found);
      this.seoService.update({
        title: found.title,
        description: found.description
      });
      this.analyticsService.trackEvent('project_view', 'projects', {project_id: id});
    } else {
      this.router.navigate(['/projects']);
    }
  }

  trackLinkClick(type: 'github' | 'live', projectTitle: string): void {
    const label = type === 'github' ? 'GitHub Source' : 'Live Demo';
    this.analyticsService.trackEvent('project_link_click', 'projects', {
      link_type: type,
      project_title: projectTitle
    });
  }

  openLightbox(index: number): void {
    this.currentImageIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  nextImage(event?: Event): void {
    event?.stopPropagation();
    const project = this.project();
    if (project?.images) {
      const newIndex = (this.currentImageIndex() + 1) % project.images.length;
      this.currentImageIndex.set(newIndex);
    }
  }

  previousImage(event?: Event): void {
    event?.stopPropagation();
    const project = this.project();
    if (project?.images) {
      const current = this.currentImageIndex();
      const newIndex = current === 0 ? project.images.length - 1 : current - 1;
      this.currentImageIndex.set(newIndex);
    }
  }
}

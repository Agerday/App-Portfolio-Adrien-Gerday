import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SeoService } from '@services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);

  readonly errorCode = '404';
  readonly errorMessage = "The page you're looking for doesn't exist or has been moved.";
  readonly errorTime = new Date().toISOString();
  readonly errorId = this.generateErrorId();
  readonly quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  constructor() {
    this.seoService.update({
      title: '404 | Page Not Found',
      description: 'The page you are looking for could not be found. Navigate back to the homepage or explore other sections.',
      robots: 'noindex, nofollow',
    });

    console.warn(`404 Not Found: ${this.router.url}`);
  }

  private generateErrorId(): string {
    return `NF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
}

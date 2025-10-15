import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SeoService} from '@services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
  errorCode = '404';
  errorMessage =
    "The page you're looking for doesn't exist or has been moved.";
  errorTime = new Date().toISOString();
  errorId = this.generateErrorId();
  quickLinks = [
    {path: '/', label: 'Home'},
    {path: '/projects', label: 'Projects'},
    {path: '/about', label: 'About'},
    {path: '/contact', label: 'Contact'},
  ];
  private router = inject(Router);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.update({
      title: '404 | Page Not Found',
      description:
        'The page you are looking for could not be found. Navigate back to the homepage or explore other sections.',
      robots: 'noindex, nofollow',
    });

    console.warn(`404 Not Found: ${this.router.url}`);
  }

  private generateErrorId(): string {
    return `NF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
}

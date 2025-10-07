import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SeoService} from '@services/seo.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {
  errorCode: string = '500';
  errorMessage: string = '';
  errorId: string = '';
  errorTime: string = '';
  showDetails = true;
  quickLinks = [
    {path: '/', label: 'Home'},
    {path: '/projects', label: 'Projects'},
    {path: '/about', label: 'About'},
    {path: '/skills', label: 'Skills'},
    {path: '/contact', label: 'Contact'}
  ];
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.errorCode = params['code'] || '500';
      this.errorMessage = params['message'] || '';
      this.errorId = this.generateErrorId();
      this.errorTime = new Date().toISOString();
    });

    this.seoService.update({
      title: `Error ${this.errorCode}`,
      description: this.getErrorDescription(),
      robots: 'noindex, nofollow'
    });

    console.error(`Error ${this.errorCode}: ${this.errorMessage || this.getErrorDescription()}`);
  }

  getErrorTitle(): string {
    const titles: { [key: string]: string } = {
      '400': 'Bad Request',
      '401': 'Authentication Required',
      '403': 'Access Denied',
      '404': 'Page Not Found',
      '500': 'Internal Server Error',
      '502': 'Bad Gateway',
      '503': 'Service Unavailable',
      '504': 'Gateway Timeout'
    };
    return titles[this.errorCode] || 'Something Went Wrong';
  }

  getErrorDescription(): string {
    const descriptions: { [key: string]: string } = {
      '400': 'The request could not be understood by the server. Please check your input and try again.',
      '401': 'You need to be logged in to access this page. Please authenticate and try again.',
      '403': "You don't have permission to access this resource. Please contact support if you believe this is a mistake.",
      '404': "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
      '500': "We're experiencing technical difficulties. Our team has been notified and is working to fix this issue.",
      '502': 'We received an invalid response from the upstream server. Please try again in a moment.',
      '503': 'Our service is temporarily unavailable for maintenance. We\'ll be back shortly.',
      '504': 'The server took too long to respond. Please try again in a few moments.'
    };
    return descriptions[this.errorCode] || 'An unexpected error occurred. Please try again later.';
  }

  getDetailedExplanation(): string {
    const explanations: { [key: string]: string } = {
      '400': 'This error occurs when the server cannot process your request due to invalid syntax or missing required information.',
      '401': 'This error means you need to provide valid authentication credentials to access this resource.',
      '403': 'The server understood your request but refuses to authorize it. This might be due to insufficient permissions.',
      '404': 'The requested resource could not be found on our server. It may have been moved, deleted, or never existed.',
      '500': 'An unexpected condition was encountered on our server. This is typically a temporary issue.',
      '502': 'Our server, while acting as a gateway or proxy, received an invalid response from the upstream server.',
      '503': 'The server is currently unable to handle the request due to temporary overloading or maintenance.',
      '504': 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.'
    };
    return explanations[this.errorCode] || 'An error occurred while processing your request.';
  }

  refresh(): void {
    window.location.reload();
  }

  private generateErrorId(): string {
    return `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
}

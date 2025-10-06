import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {SeoService} from '@services/seo.service';
import {CERTIFICATIONS} from '@core/data/certifications.data';
import {PageLayoutComponent} from '@components/layout';
import {
  CardComponent,
  CertificationCardComponent,
  PageHeaderComponent,
  SectionComponent,
  StatCardComponent
} from '@components/ui';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    SectionComponent,
    StatCardComponent,
    CertificationCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './certifications.component.html'
})
export class CertificationsComponent implements OnInit {
  readonly certifications = CERTIFICATIONS;
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.update({
      title: 'Professional Certifications',
      description: 'Professional certifications and training in full-stack development, Angular, Java, ' +
        'and modern web technologies',
      keywords: 'certifications, full-stack developer, Angular, Java, Spring Boot, professional training'
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  }

  openCertificate(url?: string): void {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}

import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeoService} from '@services/seo.service';
import {AnalyticsService} from '@services/analytics.service';
import {ButtonComponent, CardComponent, ContactInfoItemComponent, PageHeaderComponent} from '@components/ui';
import {PageLayoutComponent} from '@components/layout';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    PageHeaderComponent,
    ContactInfoItemComponent,
    PageLayoutComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private seoService = inject(SeoService);
  private analyticsService = inject(AnalyticsService);

  ngOnInit(): void {
    this.seoService.update({
      title: 'Contact - Hire Me',
      description: 'Senior Frontend Engineer available for remote/hybrid roles. Get in touch!',
      keywords: 'frontend engineer, angular developer, hire, remote work'
    });

    this.analyticsService.trackPageView('contact');
  }
}

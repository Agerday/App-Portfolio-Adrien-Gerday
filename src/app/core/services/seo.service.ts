import {inject, Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../../environment';

interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  locale?: string;
  siteName?: string;
  robots?: string;
  canonical?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
}

interface StructuredData {
  '@context': string;
  '@type': string;

  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private document = inject(DOCUMENT);

  private readonly defaultConfig: SeoConfig = {
    title: 'Senior Angular Developer Portfolio',
    description: 'Professional portfolio showcasing expertise in Angular, TypeScript, and modern web development',
    keywords: 'Angular, TypeScript, RxJS, Web Development, Portfolio, Senior Developer',
    author: 'Your Name',
    type: 'website',
    locale: 'en_US',
    siteName: 'Developer Portfolio',
    robots: 'index, follow',
  };

  constructor() {
    this.listenToRouteChanges();
  }

  private listenToRouteChanges(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        this.updateFromRouteData(data);
      });
  }

  private updateFromRouteData(data: any): void {
    const config: SeoConfig = {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      type: data.type || this.defaultConfig.type,
    };

    this.update(config);
  }

  setDefaultTags(): void {
    this.update(this.defaultConfig);
    this.setStructuredData(this.getDefaultStructuredData());
  }

  update(config: SeoConfig): void {
    const finalConfig = {...this.defaultConfig, ...config};

    const title = finalConfig.title
      ? `${finalConfig.title} | ${this.defaultConfig.siteName}`
      : this.defaultConfig.title!;
    this.title.setTitle(title);

    this.updateTag('description', finalConfig.description!);
    this.updateTag('keywords', finalConfig.keywords!);
    this.updateTag('author', finalConfig.author!);
    this.updateTag('robots', finalConfig.robots!);

    this.updateProperty('og:title', finalConfig.title || this.defaultConfig.title!);
    this.updateProperty('og:description', finalConfig.description!);
    this.updateProperty('og:type', finalConfig.type!);
    this.updateProperty('og:url', finalConfig.url || this.getCurrentUrl());
    this.updateProperty('og:site_name', finalConfig.siteName!);
    this.updateProperty('og:locale', finalConfig.locale!);

    if (finalConfig.image) {
      this.updateProperty('og:image', finalConfig.image);
      this.updateProperty('og:image:alt', finalConfig.title || this.defaultConfig.title!);
    }

    if (finalConfig.image) {
      this.updateTag('twitter:image', finalConfig.image, 'name');
    }

    if (finalConfig.type === 'article') {
      if (finalConfig.articlePublishedTime) {
        this.updateProperty('article:published_time', finalConfig.articlePublishedTime);
      }
      if (finalConfig.articleModifiedTime) {
        this.updateProperty('article:modified_time', finalConfig.articleModifiedTime);
      }
      if (finalConfig.articleAuthor) {
        this.updateProperty('article:author', finalConfig.articleAuthor);
      }
      if (finalConfig.articleSection) {
        this.updateProperty('article:section', finalConfig.articleSection);
      }
      if (finalConfig.articleTags) {
        finalConfig.articleTags.forEach(tag => {
          this.updateProperty('article:tag', tag);
        });
      }
    }

    this.updateCanonical(finalConfig.canonical || this.getCurrentUrl());
  }

  private updateTag(name: string, content: string, attr: string = 'name'): void {
    if (!content) return;

    const selector = attr === 'name' ? `name="${name}"` : `property="${name}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({[attr]: name, content});
    } else {
      this.meta.addTag({[attr]: name, content});
    }
  }

  private updateProperty(property: string, content: string): void {
    this.updateTag(property, content, 'property');
  }

  private updateCanonical(url: string): void {
    const existing = this.document.querySelector('link[rel="canonical"]');
    if (existing) {
      existing.remove();
    }

    const link = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.document.head.appendChild(link);
  }

  private getCurrentUrl(): string {
    return `${window.location.origin}${this.router.url}`;
  }

  setStructuredData(data: StructuredData | StructuredData[]): void {
    const existing = this.document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  private getDefaultStructuredData(): StructuredData[] {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Your Name',
        url: window.location.origin,
        image: `${window.location.origin}/assets/images/profile.jpg`,
        sameAs: [
          environment.social.github,
          environment.social.linkedin,
        ],
        jobTitle: 'Senior Angular Developer',
        knowsAbout: [
          'Angular',
          'TypeScript',
          'JavaScript',
          'RxJS',
          'Web Development',
          'Software Architecture',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: window.location.origin,
        name: 'Developer Portfolio',
        author: {
          '@type': 'Person',
          name: 'Adrien Gerday',
        },
        description: this.defaultConfig.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ];
  }

  setProjectStructuredData(project: any): void {
    const data: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.name,
      description: project.description,
      url: project.url,
      author: {
        '@type': 'Person',
        name: this.defaultConfig.author,
      },
      dateCreated: project.createdDate,
      dateModified: project.modifiedDate,
      programmingLanguage: project.technologies?.join(', '),
      screenshot: project.screenshots,
      softwareVersion: project.version,
      applicationCategory: project.category,
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    };

    this.setStructuredData(data);
  }

  generateSitemapXml(): string {
    const urls = [
      {loc: '/', changefreq: 'weekly', priority: 1.0},
      {loc: '/about', changefreq: 'monthly', priority: 0.8},
      {loc: '/projects', changefreq: 'weekly', priority: 0.9},
      {loc: '/skills', changefreq: 'monthly', priority: 0.7},
      {loc: '/experience', changefreq: 'monthly', priority: 0.8},
      {loc: '/blog', changefreq: 'weekly', priority: 0.8},
      {loc: '/contact', changefreq: 'yearly', priority: 0.6},
      {loc: '/resume', changefreq: 'monthly', priority: 0.7},
    ];

    const baseUrl = window.location.origin;
    const lastmod = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${url.loc}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }
}

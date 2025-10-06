import {inject, Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../../environment';

interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  robots?: string;
  canonical?: string;
}

interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

@Injectable({providedIn: 'root'})
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private document = inject(DOCUMENT);

  private readonly defaultConfig: SeoConfig = {
    title: 'Senior Frontend Developer Portfolio',
    description: 'Professional portfolio showcasing expertise in Angular, TypeScript, and modern web development',
    keywords: 'Angular, TypeScript, RxJS, Web Development, Portfolio, Senior Developer',
    type: 'website',
    robots: 'index, follow',
  };

  setDefaultTags(): void {
    this.update(this.defaultConfig);
    this.setStructuredData(this.getDefaultStructuredData());
  }

  update(config: SeoConfig): void {
    const finalConfig = {...this.defaultConfig, ...config};

    const title = finalConfig.title
      ? `${finalConfig.title} | Developer Portfolio`
      : this.defaultConfig.title!;
    this.title.setTitle(title);

    this.updateTag('description', finalConfig.description!);
    this.updateTag('keywords', finalConfig.keywords!);
    this.updateTag('robots', finalConfig.robots!);

    this.updateProperty('og:title', title);
    this.updateProperty('og:description', finalConfig.description!);
    this.updateProperty('og:type', finalConfig.type!);
    this.updateProperty('og:url', finalConfig.url || this.getCurrentUrl());

    if (finalConfig.image) {
      this.updateProperty('og:image', finalConfig.image);
      this.updateProperty('og:image:alt', title);
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
    if (existing) existing.remove();

    const link = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.document.head.appendChild(link);
  }

  private getCurrentUrl(): string {
    return `${window.location.origin}${window.location.pathname}`;
  }

  setStructuredData(data: StructuredData | StructuredData[]): void {
    const existing = this.document.querySelector('script[type="application/ld+json"]');
    if (existing) existing.remove();

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
        name: 'Adrien Gerday',
        url: window.location.origin,
        sameAs: [environment.social.github, environment.social.linkedin],
        jobTitle: 'Senior Frontend Developer',
        knowsAbout: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Web Development'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: window.location.origin,
        name: 'Developer Portfolio',
        author: { '@type': 'Person', name: 'Adrien Gerday' },
        description: this.defaultConfig.description,
      },
    ];
  }
}

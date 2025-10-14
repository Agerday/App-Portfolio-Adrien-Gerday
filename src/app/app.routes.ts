import {PreloadingStrategy, Route, Routes} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return timer(1000).pipe(mergeMap(() => load()));
    }
    return of(null);
  }
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/home/home.component').then(m => m.HomeComponent),
    data: {
      animation: 'HomePage',
      title: 'Home | Senior Angular Developer Portfolio',
      description: 'Professional portfolio showcasing modern Angular development with TypeScript, RxJS, and cutting-edge web technologies',
      keywords: 'Angular, TypeScript, Senior Developer, Portfolio, Web Development',
    },
  },
  {
    path: 'about',
    loadComponent: () => import('@features/about/about.component').then(m => m.AboutComponent),
    data: {
      animation: 'AboutPage',
      title: 'About | Professional Background & Skills',
      description: 'Learn about my professional journey, technical expertise, and passion for creating exceptional web experiences',
      preload: true,
    },
  },
  {
    path: 'projects',
    loadComponent: () => import('@features/projects/projects.component').then(m => m.ProjectsComponent),
    data: {
      animation: 'ProjectsPage',
      title: 'Projects | Portfolio Showcase',
      description: 'Explore my portfolio of Angular applications, open-source contributions, and enterprise solutions',
      preload: true,
    },
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('@features/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    data: {
      animation: 'ProjectDetailPage',
      title: 'Project Details',
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('@features/contact/contact.component').then(m => m.ContactComponent),
    data: {
      animation: 'ContactPage',
      title: 'Contact | Get In Touch',
      description: 'Connect with me for collaboration, consulting, or career opportunities',
      preload: true,
    },
  },
  {
    path: 'resume',
    loadComponent: () => import('@features/resume/resume.component').then(m => m.ResumeComponent),
    data: {
      animation: 'ResumePage',
      title: 'Resume | Professional CV',
      description: 'Download my professional resume and detailed curriculum vitae',
    },
  },
  {
    path: 'certifications',
    loadComponent: () => import('@features/certifications/certifications.component').then(m => m.CertificationsComponent),
    data: {
      animation: 'CertificationsPage',
      title: 'Certifications | Professional Credentials',
      description: 'Professional certifications in Angular, cloud platforms, and software development',
    },
  },
  {
    path: 'error',
    loadComponent: () => import('@features/error/error.component').then(m => m.ErrorComponent),
    data: {
      animation: 'ErrorPage',
      title: 'Error | Something Went Wrong',
    },
  },
  {
    path: '404',
    loadComponent: () => import('@features/not-found/not-found.component').then(m => m.NotFoundComponent),
    data: {
      animation: 'NotFoundPage',
      title: '404 | Page Not Found',
    },
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

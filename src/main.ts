import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withRouterConfig, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';

import { routes } from './app/app.routes';
import { errorInterceptor } from '@interceptors/error.interceptor';
import { loaderInterceptor } from '@interceptors/loader.interceptor';
import { cacheInterceptor } from '@interceptors/cache.interceptor';
import { performanceInterceptor } from '@interceptors/performance.interceptor';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      }),
      withViewTransitions()
    ),
    provideHttpClient(
      withInterceptors([
        errorInterceptor,
        loaderInterceptor,
        cacheInterceptor,
        performanceInterceptor,
      ]),
      withFetch()
    ),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
}).catch((err) => console.error('Bootstrap Error:', err));

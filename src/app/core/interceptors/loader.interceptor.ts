import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '@services/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  if (shouldSkipLoader(req.url)) {
    return next(req);
  }

  loaderService.show('Loading...');

  return next(req).pipe(
    finalize(() => loaderService.hide())
  );
};

function shouldSkipLoader(url: string): boolean {
  const skipPatterns = [
    '/api/analytics',
    '/api/metrics',
    '.json', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico'
  ];

  return skipPatterns.some(pattern => url.includes(pattern));
}

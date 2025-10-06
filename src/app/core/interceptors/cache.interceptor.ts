import {HttpInterceptorFn, HttpResponse,} from '@angular/common/http';
import {inject} from '@angular/core';
import {of, tap} from 'rxjs';
import {CacheService} from '@services/cache.service';

export interface CacheConfig {
  strategy?: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  ttl?: number;
  key?: string;
}

function extractResourceFromUrl(url: string): string | null {
  try {
    const pathname = new URL(url, window.location.origin).pathname;
    const parts = pathname.split('/').filter(Boolean);
    return parts.length > 1 ? parts[1] : parts[0] || null;
  } catch {
    const parts = url.split('/').filter(Boolean);
    return parts.length > 1 ? parts[1] : parts[0] || null;
  }
}

function getCacheRules(): { pattern: RegExp; config: CacheConfig }[] {
  return [
    {
      pattern: /\/api\/users/,
      config: {strategy: 'cache-first', ttl: 10 * 60 * 1000},
    },
    {
      pattern: /\/api\/products/,
      config: {strategy: 'stale-while-revalidate', ttl: 2 * 60 * 1000},
    },
  ];
}

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  if (req.method !== 'GET') {
    const resource = extractResourceFromUrl(req.url);
    if (resource) {
      cacheService.invalidate(resource);
    }
    return next(req);
  }

  const strategy = req.headers.get('x-cache-strategy') as CacheConfig['strategy'];
  const ttl = req.headers.has('x-cache-ttl')
    ? parseInt(req.headers.get('x-cache-ttl')!, 10)
    : undefined;
  const key = req.headers.get('x-cache-key') || req.urlWithParams;

  let config: CacheConfig = {strategy, ttl, key};

  if (!config.strategy) {
    const matchedRule = getCacheRules().find(rule =>
      rule.pattern.test(req.url)
    );
    if (matchedRule) {
      config = {...config, ...matchedRule.config};
    }
  }

  if (!config.strategy) {
    config.strategy = 'network-first';
    config.ttl = 60 * 1000;
  }

  const cacheKey = config.key || req.urlWithParams;
  const cached = cacheService.get(cacheKey);

  if (config.strategy === 'cache-first' && cached) {
    return of(cached.clone());
  }

  if (config.strategy === 'stale-while-revalidate' && cached) {
    setTimeout(() => {
      next(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            cacheService.set(cacheKey, event, config.ttl);
          }
        })
      ).subscribe();
    }, 0);

    return of(cached.clone());
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cacheService.set(cacheKey, event, config.ttl);
      }
    })
  );
};

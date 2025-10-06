import {HttpInterceptorFn} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {isDevMode} from '@angular/core';

export const performanceInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isDevMode()) {
    return next(req);
  }

  const start = performance.now();
  const url = req.urlWithParams;

  return next(req).pipe(
    finalize(() => {
      const duration = performance.now() - start;

      if (duration > 1000) {
        console.warn(`🐌 SLOW REQUEST (${Math.round(duration)}ms): ${url}`);
      } else if (duration > 500) {
        console.warn(`⚠️ MODERATE (${Math.round(duration)}ms): ${url}`);
      } else if (duration > 200) {
        console.log(`📊 OK (${Math.round(duration)}ms): ${url}`);
      }
    })
  );
};

import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError, timer} from 'rxjs';
import {retry} from 'rxjs/operators';
import {NotificationService} from '@services/notifications.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  const maxRetries = 3;
  const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
  const retryDelay = 1000;

  return next(req).pipe(
    retry({
      count: maxRetries,
      delay: (error, retryCount) => {
        if (
          error instanceof HttpErrorResponse &&
          retryableStatusCodes.includes(error.status)
        ) {
          const delayMs = retryDelay * Math.pow(2, retryCount - 1);

          if (retryCount === 2) {
            notificationService.info('Connection issue detected. Retrying...');
          }

          return timer(delayMs);
        }

        throw error;
      }
    }),
    catchError((error: HttpErrorResponse) => {
      handleError(error, req.url, router, notificationService);
      return throwError(() => error);
    })
  );
};

function handleError(
  error: HttpErrorResponse,
  requestUrl: string,
  router: Router,
  notificationService: NotificationService,
): void {
  let userMessage = 'An unexpected error occurred. Please try again.';
  let shouldRedirect = false;
  let redirectPath = '/error';

  switch (error.status) {
    case 0:
      userMessage = 'Unable to connect to the server. Please check your internet connection.';
      notificationService.error(userMessage, {
        duration: 5000,
        action: {label: 'Retry', handler: () => window.location.reload()}
      });
      break;

    case 400:
      userMessage = error.error?.message || 'Invalid request. Please check your input.';
      notificationService.warning(userMessage);
      break;

    case 401:
      userMessage = 'Your session has expired. Please log in again.';
      notificationService.warning(userMessage);
      break;

    case 403:
      userMessage = 'You do not have permission to access this resource.';
      notificationService.error(userMessage);
      break;

    case 404:
      userMessage = 'The requested resource was not found.';
      notificationService.info(userMessage);

      if (!requestUrl.includes('/api/')) {
        shouldRedirect = true;
        redirectPath = '/404';
      }
      break;

    case 422:
      const validationErrors = extractValidationErrors(error);
      userMessage = validationErrors.length > 0
        ? validationErrors.join('\n')
        : 'Validation failed. Please check your input.';
      notificationService.error(userMessage, {duration: 7000});
      break;

    case 429:
      const retryAfter = error.headers.get('Retry-After');
      userMessage = retryAfter
        ? `Too many requests. Please try again in ${retryAfter} seconds.`
        : 'Too many requests. Please slow down.';
      notificationService.warning(userMessage);
      break;

    case 500:
      userMessage = 'A server error occurred. Our team has been notified.';
      notificationService.error(userMessage);
      shouldRedirect = true;
      break;

    default:
      if (error.status >= 500) {
        userMessage = 'A server error occurred. Please try again later.';
      } else if (error.error?.message) {
        userMessage = error.error.message;
      }
      notificationService.error(userMessage);
      break;
  }

  if (shouldRedirect && !router.url.includes(redirectPath)) {
    router.navigate([redirectPath], {
      queryParams: {code: error.status, message: userMessage}
    });
  }
}

function extractValidationErrors(error: HttpErrorResponse): string[] {
  const errors: string[] = [];

  if (error.error?.errors) {
    if (Array.isArray(error.error.errors)) {
      errors.push(...error.error.errors);
    } else if (typeof error.error.errors === 'object') {
      Object.values(error.error.errors).forEach(fieldErrors => {
        if (Array.isArray(fieldErrors)) {
          errors.push(...fieldErrors);
        } else if (typeof fieldErrors === 'string') {
          errors.push(fieldErrors);
        }
      });
    }
  } else if (error.error?.message) {
    errors.push(error.error.message);
  }

  return errors;
}

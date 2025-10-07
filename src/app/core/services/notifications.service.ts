import {Injectable, signal} from '@angular/core';
import {Subject} from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  options?: NotificationOptions;
}

export interface NotificationOptions {
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  activeNotifications = signal<Notification[]>([]);
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  show(type: Notification['type'], message: string, options?: NotificationOptions): void {
    const notification: Notification = {
      id: this.generateId(),
      type,
      message,
      options: {
        duration: options?.duration ?? 4000,
        ...options
      }
    };

    this.activeNotifications.update(notifications => [...notifications, notification]);
    this.notificationSubject.next(notification);

    if (notification.options?.duration && notification.options.duration > 0) {
      setTimeout(() => {
        this.dismiss(notification.id);
      }, notification.options.duration);
    }
  }

  success(message: string, options?: NotificationOptions): void {
    this.show('success', message, options);
  }

  error(message: string, options?: NotificationOptions): void {
    this.show('error', message, options);
  }

  warning(message: string, options?: NotificationOptions): void {
    this.show('warning', message, options);
  }

  info(message: string, options?: NotificationOptions): void {
    this.show('info', message, options);
  }

  dismiss(id: string): void {
    this.activeNotifications.update(notifications =>
      notifications.filter(n => n.id !== id)
    );
  }

  dismissAll(): void {
    this.activeNotifications.set([]);
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}

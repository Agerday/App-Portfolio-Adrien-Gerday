import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="classes()">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  variant = input<'primary' | 'secondary' | 'success' | 'warning' | 'error'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');

  readonly classes = computed(() => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors';

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    };

    const variantClasses = {
      primary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      secondary: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
    };

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]}`;
  });
}

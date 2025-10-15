import {ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [routerLink]="routerLink()"
      [class]="buttonClasses()"
      (click)="handleClick()">

      <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

      <span
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full
        group-hover:translate-x-full transition-transform duration-700"></span>

      <span class="relative flex items-center justify-center gap-2 sm:gap-3">
        <ng-content></ng-content>
      </span>
    </button>
  `
})
export class ButtonComponent {
  type = input<'button' | 'submit'>('button');
  disabled = input(false);
  variant = input<'primary' | 'white' | 'ghost'>('primary');
  routerLink = input<string | undefined>(undefined);

  clicked = output<void>();

  buttonClasses = computed(() => {
    const base = `
      group relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 font-semibold
      text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg
      hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      flex items-center justify-center gap-2 sm:gap-3 inline-flex
      touch-target min-h-[44px]
    `;

    const variants = {
      primary: `bg-gradient-to-r from-blue-600 to-blue-500 text-white
                shadow-blue-500/30 hover:shadow-blue-500/40`,
      white: `bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 dark:text-white
              border border-gray-200/50 dark:border-gray-700/50 hover:bg-white
              dark:hover:bg-gray-700/70 hover:border-gray-300 dark:hover:border-gray-600`,
      ghost: `bg-white/10 dark:bg-gray-700/50 backdrop-blur-sm text-white
              border border-white/20 dark:border-gray-600 hover:bg-white/20
              dark:hover:bg-gray-600/50`
    };

    return `${base} ${variants[this.variant()]}`;
  });

  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}

import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center mb-12 sm:mb-14 md:mb-16 relative px-4">
      <div
        class="absolute -top-8 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 dark:bg-blue-900
               rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl
               opacity-20 animate-pulse-slow"></div>
      <div
        class="absolute -top-8 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-300 dark:bg-blue-800
               rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl
               opacity-20 animate-pulse-slow"
        style="animation-delay: 2s;"></div>

      <div class="relative z-10">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          {{ title }}
        </h1>
        <p *ngIf="subtitle"
           class="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300
                  max-w-3xl mx-auto mb-2 leading-relaxed">
          {{ subtitle }}
        </p>
        <div class="mt-4 sm:mt-5 h-1 w-20 sm:w-28 bg-gradient-to-r from-blue-500 to-blue-600
                    mx-auto rounded-full"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    @keyframes pulse-slow {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.3; }
    }

    .animate-pulse-slow {
      animation: pulse-slow 8s ease-in-out infinite;
    }
  `]
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
}

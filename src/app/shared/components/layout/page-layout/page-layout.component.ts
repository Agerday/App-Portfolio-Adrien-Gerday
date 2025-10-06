import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div
          class="absolute top-0 -left-4 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-float"></div>
        <div
          class="absolute top-0 -right-4 w-96 h-96 bg-blue-400 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-float"
          style="animation-delay: 2s;"></div>
        <div
          class="absolute -bottom-8 left-20 w-96 h-96 bg-blue-200 dark:bg-blue-950 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-float"
          style="animation-delay: 4s;"></div>
      </div>

      <div class="relative z-10 container mx-auto px-6 py-20">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }

    .animate-float {
      animation: float 12s ease-in-out infinite;
    }
  `]
})
export class PageLayoutComponent {
}

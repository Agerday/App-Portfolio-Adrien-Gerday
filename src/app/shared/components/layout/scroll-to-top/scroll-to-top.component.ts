import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ScrollService } from '@shared/services/scroll-to-top.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <button
        (click)="scrollToTop()"
        class="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg
               bg-gradient-to-r from-primary-600 to-secondary-600
               text-white hover:from-primary-700 hover:to-secondary-700
               transition-all transform hover:scale-110 focus:outline-none"
        aria-label="Scroll to top"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 15l7-7 7 7" />
        </svg>
      </button>
    }
  `,
  styles: [`
    button {
      backdrop-filter: blur(8px);
      background-color: rgba(255, 255, 255, 0.15);
    }
  `]
})
export class ScrollToTopComponent {
  private readonly scrollService = inject(ScrollService);

  readonly isVisible = this.scrollService.isVisible;

  scrollToTop(): void {
    this.scrollService.scrollToTop(true);
  }
}

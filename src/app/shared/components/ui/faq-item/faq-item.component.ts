import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FAQ } from '@models/faq.models';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        (click)="toggleExpanded()"
        class="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left
               hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
        <span class="font-semibold text-base sm:text-lg text-gray-900 dark:text-white
                     group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {{ faq().question }}
        </span>
        <span class="material-symbols-rounded text-[24px] text-gray-400
                     transition-transform duration-300 flex-shrink-0"
              [class.rotate-180]="isExpanded()">
          expand_more
        </span>
      </button>

      @if (isExpanded()) {
        <div class="pb-4 sm:pb-5 pr-8 faq-answer">
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ faq().answer }}
          </p>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .faq-answer {
      animation: slideDown 0.3s ease-out;
    }
  `]
})
export class FaqItemComponent {
  readonly faq = input.required<FAQ>();
  readonly isExpanded = signal(false);

  toggleExpanded(): void {
    this.isExpanded.update(v => !v);
  }
}

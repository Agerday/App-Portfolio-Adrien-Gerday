import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LanguageStats } from '@models/github.models';
import { CardComponent } from '@components/ui';

@Component({
  selector: 'app-language-chart',
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Most Used Languages
      </h3>

      <div class="space-y-4">
        @for (lang of languages(); track lang.name) {
          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full" [style.background-color]="lang.color"></span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ lang.name }}</span>
              </div>
              <span class="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {{ lang.percentage }}%
              </span>
            </div>

            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000 ease-out"
                [style.width.%]="lang.percentage"
                [style.background-color]="lang.color">
              </div>
            </div>
          </div>
        }
      </div>
    </app-card>
  `
})
export class LanguageChartComponent {
  readonly languages = input.required<LanguageStats[]>();
}

import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { LanguageStats } from '@models/github.models';
import { CardComponent } from '@components/ui';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-language-chart',
  standalone: true,
  imports: [CardComponent, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card>
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Language Breakdown</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Based on {{ totalLines() | number }} lines of code across all projects
        </p>
      </div>

      <div class="space-y-5">
        @for (lang of languages(); track lang.name; let i = $index) {
          <div [attr.data-aos]="'fade-left'" [attr.data-aos-delay]="i * 100">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <span class="w-4 h-4 rounded-full shadow-md"
                      [style.background-color]="lang.color"></span>
                <span class="text-base font-semibold text-gray-900 dark:text-white">{{ lang.name }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ lang.linesOfCode | number }} lines
                </span>
              </div>
              <span class="text-lg font-bold text-gray-600 dark:text-gray-400">
                {{ lang.percentage }}%
              </span>
            </div>

            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <div
                class="h-full rounded-full transition-all duration-1000 ease-out"
                [style.width.%]="lang.percentage"
                [style.background-color]="lang.color">
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Total Summary -->
      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
        <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
          205K+
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Total Lines of Code Written
        </div>
      </div>
    </app-card>
  `
})
export class LanguageChartComponent {
  readonly languages = input.required<LanguageStats[]>();

  readonly totalLines = computed(() =>
    this.languages().reduce((sum, lang) => sum + lang.linesOfCode, 0)
  );
}

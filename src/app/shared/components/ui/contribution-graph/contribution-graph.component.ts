import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '@components/ui';

@Component({
  selector: 'app-contribution-graph',
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">
          Contribution Activity
        </h3>
        <a [href]="githubUrl()"
           target="_blank"
           rel="noopener noreferrer"
           class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View on GitHub →
        </a>
      </div>

      <div class="overflow-x-auto">
        <img
          [src]="'https://ghchart.rshah.org/' + username()"
          alt="GitHub Contribution Graph"
          class="w-full min-w-[600px] rounded-lg"
        />
      </div>

      <div
        class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
        <span>Last 6 months of activity</span>
        <div class="flex items-center gap-2">
          <span>Less</span>
          <div class="flex gap-1">
            <div class="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
            <div class="w-3 h-3 bg-green-200 dark:bg-green-900 rounded-sm"></div>
            <div class="w-3 h-3 bg-green-400 dark:bg-green-700 rounded-sm"></div>
            <div class="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-sm"></div>
            <div class="w-3 h-3 bg-green-700 dark:bg-green-400 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </app-card>
  `
})
export class ContributionGraphComponent {
  readonly username = input.required<string>();
  readonly githubUrl = input.required<string>();
}

import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {GitHubService} from '@services/github.service';
import {CardComponent} from '../../cards/card/card.component';

@Component({
  selector: 'app-activity-timeline',
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">6-Month Activity</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">Real commit data from GitHub</p>
        </div>
        <a [href]="githubUrl()"
           target="_blank"
           rel="noopener noreferrer"
           class="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
          <span>View on GitHub</span>
          <span class="material-symbols-rounded text-[16px]">arrow_forward</span>
        </a>
      </div>

      @if (githubService.loading()) {
        <div class="grid grid-cols-6 gap-3 mb-8">
          @for (i of [1, 2, 3, 4, 5, 6]; track i) {
            <div class="animate-pulse">
              <div class="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-3"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
            </div>
          }
        </div>
      } @else {
        <div class="grid grid-cols-6 gap-3 mb-8">
          @for (month of githubService.monthlyActivity(); track month.month; let i = $index) {
            <div class="text-center">
              <div class="relative h-40 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-3 group"
                   [attr.data-aos]="'fade-up'"
                   [attr.data-aos-delay]="i * 75">
                <div
                  class="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 via-purple-500 to-blue-600
                  transition-all duration-1000 ease-out group-hover:from-blue-600 group-hover:to-purple-600"
                  [style.height.%]="month.commits > 0 ? (month.commits / githubService.maxMonthlyCommits()) * 100 : 2">
                </div>

                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span
                    class="text-xl sm:text-2xl font-bold text-white drop-shadow-lg opacity-0 group-hover:opacity-100
                    transition-opacity duration-300">
                    {{ month.commits }}
                  </span>
                </div>
              </div>

              <div class="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {{ month.month }}
              </div>

              <div class="text-sm font-bold text-gray-900 dark:text-white">
                {{ month.commits }}
              </div>
            </div>
          }
        </div>

        <!-- Stats Summary -->
        @if (githubService.stats(); as stats) {
          <div class="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{{ stats.totalCommits }}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 font-medium">Total Commits</div>
            </div>

            <div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div
                class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{{ stats.mostCommitsInOneDay }}
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-400 font-medium">Busiest Day</div>
            </div>

            <div class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{{ stats.totalRepos }}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 font-medium">Repositories</div>
            </div>
          </div>
        }
      }

      <!-- Data source note -->
      <div class="mt-4 text-center">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Data fetched from GitHub contribution graph
        </p>
      </div>
    </app-card>
  `
})
export class ActivityTimelineComponent {
  readonly githubService = inject(GitHubService);
  readonly githubUrl = input.required<string>();
}

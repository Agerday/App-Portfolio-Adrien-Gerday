import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubStats } from '@models/github.models';
import { CardComponent } from '@components/ui';

@Component({
  selector: 'app-github-stats',
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card>
      <div class="flex items-center gap-3 mb-6">
        <i class="fab fa-github text-3xl text-gray-900 dark:text-white"></i>
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">GitHub Activity</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">Real-time coding statistics</p>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div class="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {{ stats().totalCommits }}+
          </div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Commits (6mo)
          </div>
        </div>

        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div class="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
            {{ stats().currentStreak }}
          </div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Day Streak
          </div>
        </div>

        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div class="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {{ stats().totalRepos }}
          </div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Repositories
          </div>
        </div>

        <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div class="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            {{ stats().longestStreak }}
          </div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Longest Streak
          </div>
        </div>
      </div>
    </app-card>
  `
})
export class GitHubStatsComponent {
  readonly stats = input.required<GitHubStats>();
}

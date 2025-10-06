import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '../card/card.component';

interface ProjectStats {
  total: number;
  featured: number;
  personal: number;
  enterprise: number;
}

@Component({
  selector: 'app-project-stats-card',
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <app-card class="text-center p-6">
        <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {{ stats().total }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Total Projects</div>
      </app-card>

      <app-card class="text-center p-6">
        <div class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
          {{ stats().featured }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Featured</div>
      </app-card>

      <app-card class="text-center p-6">
        <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
          {{ stats().personal }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Personal</div>
      </app-card>

      <app-card class="text-center p-6">
        <div class="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
          {{ stats().enterprise }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Enterprise</div>
      </app-card>
    </div>
  `
})
export class ProjectStatsCardComponent {
  stats = input.required<ProjectStats>();
}

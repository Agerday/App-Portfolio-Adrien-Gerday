import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '@models/project.models';

@Component({
  selector: 'app-featured-project-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-500 dark:border-blue-400 p-8 h-full">

      <!-- Badge -->
      <div class="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400
                  text-xs font-semibold rounded-full mb-4">
        {{ badge() }}
      </div>

      <!-- Category & Year -->
      <div class="flex items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
        <span class="font-medium uppercase tracking-wide">{{ categoryLabel() }}</span>
        <span>•</span>
        <span>{{ project().year }}</span>
      </div>

      <!-- Title -->
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {{ project().title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        {{ project().shortDescription }}
      </p>

      <!-- Tech Stack -->
      <div class="flex flex-wrap gap-3 mb-6">
        @for (tech of project().technologies.slice(0, 5); track tech) {
          <span class="text-sm text-gray-600 dark:text-gray-400">{{ tech }}</span>
        }
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap gap-3">
        @if (project().liveUrl) {

          <a [href]="project().liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            (click)="liveClick.emit()"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium
                   rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span class="material-symbols-rounded text-[16px]">open_in_new</span>
            <span>Live Demo</span>
          </a>
        }

        @if (project().githubUrl) {

          <a [href]="project().githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            (click)="githubClick.emit()"
            class="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600
                   text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg
                   hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <i class="fab fa-github"></i>
            <span>Source</span>
          </a>
        }


          <a [routerLink]="['/projects', project().id]"
          (click)="detailClick.emit()"
          class="inline-flex items-center gap-2 px-5 py-2.5 text-gray-700 dark:text-gray-300 text-sm font-medium
                 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <span>Details</span>
          <span class="material-symbols-rounded text-[16px]">arrow_forward</span>
        </a>
      </div>
    </div>
  `
})
export class FeaturedProjectCardComponent {
  project = input.required<Project>();
  categoryLabel = input.required<string>();
  badge = input<string>('Featured');

  liveClick = output<void>();
  githubClick = output<void>();
  detailClick = output<void>();
}

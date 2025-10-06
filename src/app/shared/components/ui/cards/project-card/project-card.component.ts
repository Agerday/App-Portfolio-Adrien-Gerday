import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '@models/project.models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="['/projects', project().id]"
      (click)="detailClick.emit()"
      class="block group h-full"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                  hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 h-full p-6">

        <!-- Category & Year -->
        <div class="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-400">
          <span class="font-medium uppercase tracking-wide">{{ categoryLabel() }}</span>
          <span>{{ project().year }}</span>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3
                   group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {{ project().title }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {{ project().shortDescription }}
        </p>

        <!-- Tech Stack -->
        <div class="flex flex-wrap gap-2 mb-4">
          @for (tech of project().technologies.slice(0, 3); track tech) {
            <span class="text-xs text-gray-600 dark:text-gray-400">{{ tech }}</span>
          }
          @if (project().technologies.length > 3) {
            <span class="text-xs text-gray-500 dark:text-gray-500">+{{ project().technologies.length - 3 }}</span>
          }
        </div>

        <!-- Links -->
        <div class="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          @if (project().liveUrl) {

            <a [href]="project().liveUrl"
               target="_blank"
               rel="noopener noreferrer"
               (click)="onLiveClick($event)"
               class="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Live</span>
              <span class="material-symbols-rounded text-[14px]">open_in_new</span>
            </a>
          }

          @if (project().githubUrl) {

            <a [href]="project().githubUrl"
               target="_blank"
               rel="noopener noreferrer"
               (click)="onGithubClick($event)"
               class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white inline-flex items-center gap-1"
            >
              <i class="fab fa-github"></i>
              <span>Code</span>
            </a>
          }

          <span class="ml-auto text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            <span class="material-symbols-rounded text-[20px]">arrow_forward</span>
          </span>
        </div>
      </div>
    </a>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProjectCardComponent {
  project = input.required<Project>();
  categoryLabel = input.required<string>();

  liveClick = output<void>();
  githubClick = output<void>();
  detailClick = output<void>();

  onLiveClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.liveClick.emit();
    window.open(this.project().liveUrl, '_blank', 'noopener,noreferrer');
  }

  onGithubClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.githubClick.emit();
    window.open(this.project().githubUrl, '_blank', 'noopener,noreferrer');
  }
}

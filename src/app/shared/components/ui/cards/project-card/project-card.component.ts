import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Project} from '@models/project.models';

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
      <div class="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700
                  hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20
                  transition-all duration-500 h-full transform hover:-translate-y-2 flex flex-col
                  hover:ring-2 hover:ring-blue-500/50 dark:hover:ring-blue-400/50">

        <!-- Screenshot Preview -->
        <div
          class="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
          @if (project().image) {
            <img
              [src]="project().image"
              [alt]="project().title"
              class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          }

          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>

          @if (project().featured) {
            <div
              class="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <span class="material-symbols-rounded text-[14px]">star</span>
              Featured
            </div>
          }

          <div
            class="absolute top-4 left-4 backdrop-blur-md bg-white/20 dark:bg-gray-900/40 border border-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            {{ categoryLabel() }}
          </div>

          <div
            class="absolute bottom-4 left-4 text-white font-bold text-sm backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
            {{ project().year }}
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 flex-grow flex flex-col">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2
                     group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {{ project().title }}
          </h3>

          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed flex-grow">
            {{ project().shortDescription }}
          </p>

          <div class="flex flex-wrap gap-2 mb-5 min-h-[32px]">
            @for (tech of project().technologies.slice(0, 3); track tech) {
              <span
                class="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800">
                {{ tech }}
              </span>
            }
            @if (project().technologies.length > 3) {
              <span
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                +{{ project().technologies.length - 3 }}
              </span>
            }
          </div>

          <!-- Footer -->
          <div class="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto min-h-[60px]">
            <div class="flex items-center gap-3 flex-1">
              @if (project().liveUrl) {
                <a [href]="project().liveUrl" target="_blank" rel="noopener noreferrer"
                   (click)="onLiveClick($event)"
                   class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 transition-all">
                  <span class="material-symbols-rounded text-[16px]">open_in_new</span>
                  Live
                </a>
              }

              @if (project().githubUrl) {
                <a [href]="project().githubUrl" target="_blank" rel="noopener noreferrer"
                   (click)="onGithubClick($event)"
                   class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-all">
                  <i class="fab fa-github"></i>
                  Code
                </a>
              }
            </div>

            <div class="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold text-sm ml-auto">
              <span>Details</span>
              <span class="material-symbols-rounded text-[20px] transition-transform group-hover:translate-x-2">arrow_forward</span>
            </div>
          </div>
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

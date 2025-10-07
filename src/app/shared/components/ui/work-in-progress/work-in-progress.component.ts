// src/app/shared/components/ui/work-in-progress/work-in-progress.component.ts
import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '@components/ui';

@Component({
  selector: 'app-work-in-progress',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div class="max-w-3xl w-full text-center">
        <!-- Animated Icon with improved visual hierarchy -->
        <div class="relative mb-10 sm:mb-12 md:mb-16">
          <!-- Outer glow circle -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-gradient-to-r from-blue-200
                        to-purple-200 dark:from-blue-900/20 dark:to-purple-900/20
                        rounded-full animate-ping opacity-10"></div>
          </div>

          <!-- Middle pulse circle -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-gradient-to-br from-blue-100
                        to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30
                        rounded-full animate-pulse-slow opacity-30"></div>
          </div>

          <!-- Main icon container with enhanced shadow -->
          <div class="relative flex items-center justify-center">
            <div class="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-gradient-to-br from-blue-500
                        via-purple-500 to-blue-600 rounded-3xl sm:rounded-[2rem]
                        shadow-2xl shadow-purple-500/30 dark:shadow-purple-500/50
                        flex items-center justify-center transform hover:scale-110
                        hover:rotate-3 transition-all duration-500 group">
              <!-- Shine effect -->
              <div class="absolute inset-0 rounded-3xl sm:rounded-[2rem] bg-gradient-to-tr
                          from-white/20 to-transparent opacity-0 group-hover:opacity-100
                          transition-opacity duration-500"></div>

              <span class="material-symbols-rounded text-white text-5xl sm:text-6xl md:text-7xl
                           relative z-10 animate-pulse-slow">
                {{ icon() }}
              </span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-4 sm:space-y-5 md:space-y-6 mb-8 sm:mb-10 md:mb-12">
          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
            {{ title() }}
          </h1>

          <!-- Description -->
          <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto
                    leading-relaxed px-4">
            {{ description() }}
          </p>

          <!-- Feature hint -->
          @if (featureHint()) {
            <div class="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5
                        bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm sm:text-base
                        text-blue-700 dark:text-blue-400 font-medium">
              <span class="material-symbols-rounded text-[18px] sm:text-[20px]">schedule</span>
              <span>{{ featureHint() }}</span>
            </div>
          }
        </div>

        <!-- Progress Indicators -->
        <div class="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 max-w-md mx-auto px-4">
          @for (stage of stages; track stage.label) {
            <div class="flex flex-col items-center gap-2 sm:gap-3">
              <div [class]="getStageClasses(stage.status)"
                   class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl
                          flex items-center justify-center transition-all duration-300">
                <span class="material-symbols-rounded text-xl sm:text-2xl md:text-3xl">
                  {{ stage.icon }}
                </span>
              </div>
              <div class="text-xs sm:text-sm text-center">
                <div class="font-semibold text-gray-900 dark:text-white mb-0.5">
                  {{ stage.label }}
                </div>
                <div [class]="getStatusTextClass(stage.status)">
                  {{ stage.status }}
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <app-button [routerLink]="'/'" variant="primary">
            <span class="material-symbols-rounded text-[20px]">home</span>
            <span>Back to Home</span>
          </app-button>

          @if (showContactButton()) {
            <app-button [routerLink]="'/contact'" variant="white">
              <span class="material-symbols-rounded text-[20px]">email</span>
              <span>Stay Updated</span>
            </app-button>
          }
        </div>

        <!-- Additional Info -->
        @if (showProgressBar()) {
          <div class="mt-8 sm:mt-10 md:mt-12 max-w-md mx-auto px-4">
            <div class="flex items-center justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Overall Progress</span>
              <span class="font-semibold">{{ progressPercentage() }}%</span>
            </div>
            <div class="h-2 sm:h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600
                       rounded-full transition-all duration-1000 ease-out"
                [style.width.%]="progressPercentage()">
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }

    @keyframes ping {
      75%, 100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .animate-ping {
      animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
  `]
})
export class WorkInProgressComponent {
  // Inputs
  icon = input('construction');
  title = input('Work in Progress');
  description = input('This feature is currently under development. Check back soon!');
  featureHint = input<string | undefined>(undefined);
  showContactButton = input(true);
  showProgressBar = input(false);
  progressPercentage = input(45);

  // Stage configuration
  stages = [
    { label: 'Design', icon: 'design_services', status: 'Done' },
    { label: 'Development', icon: 'code', status: 'In Progress' },
    { label: 'Testing', icon: 'bug_report', status: 'Pending' }
  ];

  getStageClasses(status: string): string {
    const baseClasses = 'shadow-lg transition-all duration-300';

    switch (status) {
      case 'Done':
        return `${baseClasses} bg-green-500 text-white`;
      case 'In Progress':
        return `${baseClasses} bg-blue-500 text-white animate-pulse`;
      case 'Pending':
        return `${baseClasses} bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500`;
      default:
        return baseClasses;
    }
  }

  getStatusTextClass(status: string): string {
    switch (status) {
      case 'Done':
        return 'text-green-600 dark:text-green-400 font-medium';
      case 'In Progress':
        return 'text-blue-600 dark:text-blue-400 font-medium';
      case 'Pending':
        return 'text-gray-500 dark:text-gray-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  }
}

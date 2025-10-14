import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@components/ui';

type StageStatus = 'Done' | 'In Progress' | 'Pending';

interface Stage {
  readonly label: string;
  readonly icon: string;
  readonly status: StageStatus;
}

const STAGE_CLASSES: Readonly<Record<StageStatus, string>> = {
  'Done': 'bg-green-500 text-white',
  'In Progress': 'bg-blue-500 text-white animate-pulse',
  'Pending': 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
} as const;

const STATUS_TEXT_CLASSES: Readonly<Record<StageStatus, string>> = {
  'Done': 'text-green-600 dark:text-green-400 font-medium',
  'In Progress': 'text-blue-600 dark:text-blue-400 font-medium',
  'Pending': 'text-gray-500 dark:text-gray-400'
} as const;

const STAGE_BASE_CLASSES = 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center transition-all duration-500 ease-out hover:scale-110 hover:shadow-xl group' as const;

const ANIMATION_CONFIG = {
  stageDelay: 150,
  contentDelay: 300,
  buttonDelay: 300,
  progressDelay: 450
} as const;

@Component({
  selector: 'app-work-in-progress',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div class="max-w-3xl w-full">

        <!-- Animated Icon Section -->
        <div class="relative mb-12 sm:mb-16 flex items-center justify-center">
          <!-- Outer expanding ring -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="wip-ring-outer"></div>
          </div>

          <!-- Middle pulsing ring -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="wip-ring-middle"></div>
          </div>

          <!-- Main icon container with hover effects -->
          <div class="wip-icon-container group cursor-default">
            <div class="wip-icon-shine"></div>
            <span class="material-symbols-rounded text-white text-5xl sm:text-6xl md:text-7xl relative z-10 wip-icon-pulse">
              {{ icon() }}
            </span>
          </div>
        </div>

        <!-- Content Section -->
        <div class="text-center space-y-5 sm:space-y-6 mb-10 sm:mb-12 wip-fade-in">
          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
            {{ title() }}
          </h1>

          <!-- Description -->
          <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed px-4">
            {{ description() }}
          </p>

          <!-- Feature hint badge -->
          @if (featureHint()) {
            <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm sm:text-base text-blue-700 dark:text-blue-400 font-medium wip-fade-in"
                 [style.animation-delay.ms]="animationConfig.contentDelay">
              <span class="material-symbols-rounded text-[20px] animate-pulse">schedule</span>
              <span>{{ featureHint() }}</span>
            </div>
          }
        </div>

        <!-- Progress Indicators Grid -->
        <div class="grid grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 max-w-lg mx-auto px-4">
          @for (stage of stages; track stage.label; let i = $index) {
            <div class="flex flex-col items-center gap-3 wip-stage-item"
                 [style.animation-delay.ms]="i * animationConfig.stageDelay">
              <!-- Stage icon -->
              <div [class]="stageContainerClasses()[stage.status]">
                <span class="material-symbols-rounded text-xl sm:text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110">
                  {{ stage.icon }}
                </span>
              </div>

              <!-- Stage info -->
              <div class="text-xs sm:text-sm text-center space-y-1">
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ stage.label }}
                </div>
                <div [class]="statusTextClasses()[stage.status]">
                  {{ stage.status }}
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 mb-8 wip-fade-in text-center"
             [style.animation-delay.ms]="animationConfig.buttonDelay">
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

        <!-- Progress Bar Section -->
        @if (showProgressBar()) {
          <div class="mt-10 sm:mt-12 max-w-md mx-auto px-4 wip-fade-in"
               [style.animation-delay.ms]="animationConfig.progressDelay">
            <!-- Progress label -->
            <div class="flex items-center justify-between mb-3 text-sm text-gray-600 dark:text-gray-400">
              <span class="font-medium">Overall Progress</span>
              <span class="font-bold tabular-nums">{{ progressPercentage() }}%</span>
            </div>

            <!-- Progress bar -->
            <div class="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative shadow-inner">
              <div class="wip-progress-bar" [style.width.%]="progressPercentage()">
                <div class="wip-progress-shine"></div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    @keyframes wip-fade-in-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes wip-ring-pulse {
      0%, 100% {
        transform: scale(0.95);
        opacity: 0.7;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.3;
      }
    }

    @keyframes wip-ring-expand {
      0% {
        transform: scale(1);
        opacity: 0.1;
      }
      100% {
        transform: scale(1.3);
        opacity: 0;
      }
    }

    @keyframes wip-icon-pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.85;
      }
    }

    @keyframes wip-progress-fill {
      from {
        width: 0;
      }
    }

    @keyframes wip-shine {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(200%);
      }
    }

    .wip-icon-container {
      @apply relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36;
      @apply bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600;
      @apply rounded-3xl sm:rounded-[2rem];
      @apply shadow-2xl shadow-purple-500/30 dark:shadow-purple-500/40;
      @apply flex items-center justify-center overflow-hidden;
      @apply transition-all duration-500 ease-out;
    }

    .wip-icon-container:hover {
      @apply scale-110 rotate-6 shadow-purple-500/50 dark:shadow-purple-500/60;
    }

    .wip-icon-pulse {
      animation: wip-icon-pulse 3s ease-in-out infinite;
    }

    .wip-icon-shine {
      @apply absolute inset-0 rounded-3xl sm:rounded-[2rem];
      @apply bg-gradient-to-tr from-white/30 via-white/10 to-transparent;
      @apply opacity-0 transition-opacity duration-700 pointer-events-none;
    }

    .wip-icon-container:hover .wip-icon-shine {
      @apply opacity-100;
    }

    .wip-ring-outer {
      @apply w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64;
      @apply bg-gradient-to-r from-blue-200 to-purple-200;
      @apply dark:from-blue-900/20 dark:to-purple-900/20;
      @apply rounded-full;
      animation: wip-ring-expand 2.5s ease-out infinite;
    }

    .wip-ring-middle {
      @apply w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52;
      @apply bg-gradient-to-br from-blue-100 to-purple-100;
      @apply dark:from-blue-900/30 dark:to-purple-900/30;
      @apply rounded-full;
      animation: wip-ring-pulse 3s ease-in-out infinite;
      animation-delay: 500ms;
    }

    .wip-fade-in {
      animation: wip-fade-in-up 0.6s ease-out both;
    }

    .wip-stage-item {
      animation: wip-fade-in-up 0.5s ease-out both;
    }

    .wip-progress-bar {
      @apply h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600;
      @apply rounded-full relative overflow-hidden;
      @apply transition-all duration-1000 ease-out;
      animation: wip-progress-fill 1.5s ease-out;
    }

    .wip-progress-shine {
      @apply absolute inset-0 w-1/2;
      @apply bg-gradient-to-r from-transparent via-white/30 to-transparent;
      animation: wip-shine 2s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `]
})
export class WorkInProgressComponent {
  readonly icon = input('construction');
  readonly title = input('Work in Progress');
  readonly description = input('This feature is currently under development. Check back soon!');
  readonly featureHint = input<string>();
  readonly showContactButton = input(true);
  readonly showProgressBar = input(false);
  readonly progressPercentage = input(45);

  readonly stages: readonly Stage[] = [
    { label: 'Design', icon: 'design_services', status: 'Done' },
    { label: 'Development', icon: 'code', status: 'In Progress' },
    { label: 'Testing', icon: 'bug_report', status: 'Pending' }
  ] as const;

  readonly animationConfig = ANIMATION_CONFIG;

  readonly stageContainerClasses = computed(() => {
    const classMap: Record<StageStatus, string> = {} as Record<StageStatus, string>;

    for (const [status, classes] of Object.entries(STAGE_CLASSES)) {
      classMap[status as StageStatus] = `${STAGE_BASE_CLASSES} ${classes}`;
    }

    return classMap;
  });

  readonly statusTextClasses = computed(() => STATUS_TEXT_CLASSES);
}

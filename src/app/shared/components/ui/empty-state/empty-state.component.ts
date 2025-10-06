import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {ButtonComponent, IconComponent} from '@components/ui';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IconComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center py-16 px-4">
      @if (icon()) {
        <div class="w-20 h-20 mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <app-icon [name]="icon()" [size]="'lg'" class="text-gray-400 dark:text-gray-600"></app-icon>
        </div>
      }

      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {{ title() }}
      </h3>

      @if (description()) {
        <p class="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          {{ description() }}
        </p>
      }

      @if (actionLabel()) {
        <app-button (clicked)="action.emit()" [variant]="'primary'">
          {{ actionLabel() }}
        </app-button>
      }
    </div>
  `
})
export class EmptyStateComponent {
  icon = input<string>('inbox');
  title = input.required<string>();
  description = input<string>();
  actionLabel = input<string>();
  action = output<void>();
}

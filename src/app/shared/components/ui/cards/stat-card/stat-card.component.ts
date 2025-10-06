import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
      <div [class]="'text-4xl font-bold mb-2 ' + color()">
        {{ value() }}
      </div>
      <div class="text-gray-600 dark:text-gray-400">
        {{ label() }}
      </div>
    </div>
  `
})
export class StatCardComponent {
  value = input.required<string | number>();
  label = input.required<string>();
  color = input('text-blue-600 dark:text-blue-400');
}

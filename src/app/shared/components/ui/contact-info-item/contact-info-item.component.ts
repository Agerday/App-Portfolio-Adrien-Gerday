import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { IconBoxComponent } from '@components/ui';
import { IconComponent } from '@components/ui/icon/icon.component';

@Component({
  selector: 'app-contact-info-item',
  standalone: true,
  imports: [IconBoxComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-4 group cursor-pointer p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
      <app-icon-box [size]="'md'" [pulse]="pulse()">
        <app-icon [name]="icon()" [size]="'md'" [iconStyle]="'outlined'"></app-icon>
      </app-icon-box>

      <div class="flex-1">
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">{{ label() }}</p>

        @if (link(); as linkUrl) {
          <a
            [href]="linkUrl"
            class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {{ value() }}
          </a>
        } @else {
          <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ value() }}</p>
        }
      </div>

      @if (link()) {
        <app-icon
          [name]="'chevron_right'"
          [size]="'sm'"
          [iconStyle]="'rounded'"
          class="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
        </app-icon>
      }
    </div>
  `
})
export class ContactInfoItemComponent {
  icon = input<string>('mail');
  label = input.required<string>();
  value = input.required<string>();
  link = input<string>();
  pulse = input<boolean>(false);
}

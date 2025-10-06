import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="spacing()">
      @if (title()) {
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ title() }}
          </h2>
          @if (subtitle()) {
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {{ subtitle() }}
            </p>
          }
        </div>
      }
      <ng-content></ng-content>
    </section>
  `
})
export class SectionComponent {
  title = input<string>();
  subtitle = input<string>();
  spacing = input('py-12 md:py-16 lg:py-20');
}

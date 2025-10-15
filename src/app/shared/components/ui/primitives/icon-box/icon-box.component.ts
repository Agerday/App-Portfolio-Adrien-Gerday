import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-icon-box',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes()"
         class="group flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600
                text-white rounded-xl sm:rounded-2xl transition-all duration-300
                hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden flex-shrink-0">

      @if (pulse()) {
        <div class="absolute inset-0 rounded-xl sm:rounded-2xl bg-blue-400 animate-ping opacity-20"></div>
      }

      <div class="relative z-10 transition-transform duration-300 group-hover:scale-110">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class IconBoxComponent {
  size = input<'sm' | 'md' | 'lg'>('md');
  pulse = input<boolean>(false);

  readonly classes = computed(() => {
    const sizeMap = {
      sm: 'w-8 h-8 sm:w-10 sm:h-10',
      md: 'w-12 h-12 sm:w-14 sm:h-14',
      lg: 'w-16 h-16 sm:w-20 sm:h-20'
    };
    return sizeMap[this.size()];
  });
}

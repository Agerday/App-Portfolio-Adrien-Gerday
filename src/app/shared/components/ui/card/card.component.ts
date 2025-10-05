import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses()" class="group relative">
      <div
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <div class="relative">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  gradient = input<boolean>(false);

  readonly cardClasses = computed(() => {
    if (this.gradient()) {
      return 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-500 text-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-500 hover:shadow-blue-500/50 hover:scale-[1.02]';
    }
    return 'bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1';
  });
}

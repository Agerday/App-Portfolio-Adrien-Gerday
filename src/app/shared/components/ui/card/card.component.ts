import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses()" class="group relative overflow-hidden h-full">
      @if (gradient()) {
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rounded-3xl blur-3xl opacity-40
                      bg-[length:200%_200%] bg-gradient-to-tr from-blue-500 via-indigo-400 to-violet-400
                      animate-radiant"></div>
        </div>
      }

      <div class="relative z-10 h-full">
        <ng-content></ng-content>
      </div>

      <div
        class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
               -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class CardComponent {
  gradient = input<boolean>(false);

  readonly cardClasses = computed(() => {
    if (this.gradient()) {
      return [
        'relative rounded-2xl p-8 md:p-12 text-white',
        'bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300',
        'shadow-2xl shadow-purple-500/40',
        'transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-600/50'
      ].join(' ');
    }

    return [
      'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6',
      'transition-all duration-500 hover:shadow-xl hover:-translate-y-1',
      'border border-gray-100 dark:border-gray-700'
    ].join(' ');
  });
}

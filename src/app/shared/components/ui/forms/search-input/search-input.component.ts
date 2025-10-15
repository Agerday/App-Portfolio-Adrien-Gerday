import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <span class="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
        search
      </span>
      <input
        [value]="value()"
        (input)="valueChange.emit($any($event.target).value)"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        type="text"
        class="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
               focus:outline-none focus:ring-2 focus:ring-blue-500
               disabled:opacity-50 disabled:cursor-not-allowed
               placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
      @if (value() && showClear()) {
        <button
          (click)="clearSearch()"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear search"
          type="button"
        >
          <span class="material-symbols-rounded text-[18px]">close</span>
        </button>
      }
    </div>
  `
})
export class SearchInputComponent {
  value = input<string>('');
  placeholder = input<string>('Search...');
  disabled = input<boolean>(false);
  showClear = input<boolean>(true);

  valueChange = output<string>();

  clearSearch(): void {
    this.valueChange.emit('');
  }
}

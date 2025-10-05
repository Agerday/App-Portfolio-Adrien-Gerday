import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white
             font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40
             hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50
             disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3">

      <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

      <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

      <span class="relative">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  type = input<'button' | 'submit'>('button');
  disabled = input<boolean>(false);
}

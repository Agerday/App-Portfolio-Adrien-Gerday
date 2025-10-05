// src/app/shared/components/button/button.component.ts
import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [routerLink]="routerLink()"
      [class]="buttonClasses()"
      (click)="handleClick()">

      <!-- Shimmer effect -->
      <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

      <!-- Slide effect -->
      <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

      <!-- Content wrapper with proper flex alignment -->
      <span class="relative flex items-center justify-center gap-3">
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
  // Inputs
  type = input<'button' | 'submit'>('button');
  disabled = input(false);
  variant = input<'primary' | 'white'>('primary');
  routerLink = input<string | undefined>(undefined);

  // Output
  clicked = output<void>();

  // Computed classes based on variant
  buttonClasses = computed(() => {
    const base = `
      group relative overflow-hidden px-8 py-4 font-semibold rounded-2xl shadow-lg
      hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      flex items-center justify-center gap-3
    `;

    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30 hover:shadow-blue-500/40',
      white: 'bg-white text-blue-600 shadow-gray-200 hover:shadow-gray-300 border border-gray-200'
    };

    return `${base} ${variants[this.variant()]}`;
  });

  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}

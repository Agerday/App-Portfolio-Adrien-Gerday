import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      [class]="iconClass()"
      class="select-none"
    >
      {{ name() }}
    </span>
  `,
  styles: [`
    .material-symbols-outlined,
    .material-symbols-rounded {
      font-variation-settings: 'FILL' var(--icon-fill, 0),
      'wght' var(--icon-weight, 400),
      'GRAD' 0,
      'opsz' var(--icon-size, 24);
      display: inline-flex;
      vertical-align: middle;
      transition: color 0.2s ease;
    }
  `]
})
export class IconComponent {
  name = input.required<string>();
  iconStyle = input<'outlined' | 'rounded'>('rounded');
  size = input<'sm' | 'md' | 'lg'>('md');

  readonly iconClass = computed(() => {
    const style = `material-symbols-${this.iconStyle()}`;
    const sizeClass = this.getSizeClass();
    return `${style} ${sizeClass}`;
  });

  private getSizeClass(): string {
    const sizeMap = {
      sm: 'text-[18px]',
      md: 'text-[24px]',
      lg: 'text-[32px]'
    };
    return sizeMap[this.size()];
  }
}

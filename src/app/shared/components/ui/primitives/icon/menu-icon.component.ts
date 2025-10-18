import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'menu-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="pixelSize()"
      [attr.height]="pixelSize()"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="inline-block align-middle select-none"
      [ngClass]="sizeClass()"
    >
      <path [attr.d]="iconPath()"/>
    </svg>
  `,
  imports: [
    NgClass
  ]
})
export class IconComponent {
  name = input.required<string>();
  size = input<'sm' | 'md' | 'lg'>('md');

  readonly iconPath = computed(() => ICONS[this.name()] || '');
  readonly pixelSize = computed(() => {
    const sizeMap = { sm: 18, md: 24, lg: 32 };
    return sizeMap[this.size()];
  });

  sizeClass(): string {
    return {
      sm: 'text-[18px]',
      md: 'text-[24px]',
      lg: 'text-[32px]'
    }[this.size()];
  }
}

const ICONS: Record<string, string> = {
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  close: 'M18.3 5.71L12 12l6.3 6.29-1.42 1.42L12 13.41l-6.29 6.3-1.42-1.42L10.59 12 4.29 5.71 5.71 4.29 12 10.59l6.29-6.3z',
  arrow_forward: 'M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8z',
  keyboard_arrow_down: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z',
  dark_mode: 'M9.37 5.51A7 7 0 0012 19a7 7 0 006.49-9.37A9 9 0 119.37 5.5z',
  light_mode: `
    M12 4.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 12 4.75zm0 14.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75z
    M4.75 12a.75.75 0 0 1 .75-.75v-.5a.75.75 0 0 1 1.5 0v.5a.75.75 0 0 1-.75.75H4.75zm12.25 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75z
    M6.22 6.22a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 1 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06zm10.9 10.9a.75.75 0 0 1 1.06 0l.35.35a.75.75 0 0 1-1.06 1.06l-.35-.35a.75.75 0 0 1 0-1.06z
    M6.22 17.78a.75.75 0 0 1 1.06 0l.35-.35a.75.75 0 1 1-1.06-1.06l-.35.35a.75.75 0 0 1 0 1.06zm10.9-10.9a.75.75 0 0 1 1.06 0l.35-.35a.75.75 0 1 1-1.06-1.06l-.35.35a.75.75 0 0 1 0 1.06z
    M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8z`
};

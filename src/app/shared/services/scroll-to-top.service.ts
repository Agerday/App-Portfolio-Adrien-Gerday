import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private scrollThreshold = 200;
  isVisible = signal(false);

  constructor() {
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
  }

  private onScroll(): void {
    this.isVisible.set(window.scrollY > this.scrollThreshold);
  }

  scrollToTop(smooth = true): void {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }
}

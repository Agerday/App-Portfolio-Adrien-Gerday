import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollService {
  isVisible = signal(false);
  private scrollThreshold = 200;

  constructor() {
    window.addEventListener('scroll', this.onScroll.bind(this), {passive: true});
  }

  scrollToTop(smooth = true): void {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }

  private onScroll(): void {
    this.isVisible.set(window.scrollY > this.scrollThreshold);
  }
}

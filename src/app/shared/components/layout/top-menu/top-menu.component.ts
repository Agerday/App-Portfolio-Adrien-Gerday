import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '@services/theme.service';
import { ButtonComponent } from '@components/ui';

interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent {
  readonly logo = 'AG';
  readonly isMobileMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly openDropdowns = signal<Set<string>>(new Set());

  // timers to debounce hover close per dropdown label
  private readonly hoverCloseTimers = new Map<string, number>();

  readonly menuItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    {
      label: 'Work',
      path: '/work',
      children: [
        { label: 'Projects', path: '/projects' },
        { label: 'Experience', path: '/experience' },
        { label: 'Certifications', path: '/certifications' },
        { label: 'Skills', path: '/skills' },
      ],
    },
    { label: 'Resume', path: '/resume' },
    { label: 'Contact', path: '/contact' },
  ];

  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  readonly isDarkMode = this.themeService.isDarkMode;

  constructor() {
    this.setupScrollListener();
    this.setupRouteListener();
  }

  /* -------------------------
     Mobile / general helpers
     ------------------------- */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    this.closeDropdowns();
  }

  toggleDropdown(label: string): void {
    // used for mobile click toggles
    this.openDropdowns.update((set) => {
      const newSet = new Set(set);
      newSet.has(label) ? newSet.delete(label) : newSet.add(label);
      return newSet;
    });
  }

  isDropdownOpen(label: string): boolean {
    return this.openDropdowns().has(label);
  }

  closeDropdowns(): void {
    this.clearAllHoverTimers();
    this.openDropdowns.set(new Set());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /* -------------------------
     Hover logic (robust)
     ------------------------- */

  // Called on mouseenter of wrapper
  onMouseEnter(label: string): void {
    this.clearHoverCloseTimer(label);
    this.openDropdown(label);
  }

  // Called on mouseleave of wrapper
  onMouseLeave(label: string): void {
    this.scheduleHoverClose(label, 150); // small delay to avoid flicker
  }

  private openDropdown(label: string): void {
    this.openDropdowns.update((set) => {
      const newSet = new Set(set);
      newSet.add(label);
      return newSet;
    });
  }

  private scheduleHoverClose(label: string, delay = 150): void {
    this.clearHoverCloseTimer(label);
    const id = window.setTimeout(() => {
      this.openDropdowns.update((set) => {
        const newSet = new Set(set);
        newSet.delete(label);
        return newSet;
      });
      this.hoverCloseTimers.delete(label);
    }, delay);
    this.hoverCloseTimers.set(label, id);
  }

  private clearHoverCloseTimer(label: string): void {
    const t = this.hoverCloseTimers.get(label);
    if (t != null) {
      clearTimeout(t);
      this.hoverCloseTimers.delete(label);
    }
  }

  private clearAllHoverTimers(): void {
    for (const t of this.hoverCloseTimers.values()) {
      clearTimeout(t);
    }
    this.hoverCloseTimers.clear();
  }

  /* -------------------------
     Listeners
     ------------------------- */

  private setupScrollListener(): void {
    window.addEventListener(
      'scroll',
      () => {
        this.isScrolled.set(window.scrollY > 10);
      },
      { passive: true }
    );
  }

  private setupRouteListener(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => {
        this.closeMobileMenu();
        this.closeDropdowns();
      });
  }
}

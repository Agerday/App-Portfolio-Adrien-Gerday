import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {filter} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ThemeService} from '@services/theme.service';
import {ButtonComponent} from '@components/ui';
import {IconComponent} from '@components/ui/primitives/icon/menu-icon.component';

interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonComponent, IconComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent {
  readonly logo = 'AG';
  readonly isMobileMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly openDropdowns = signal<Set<string>>(new Set());

  private readonly hoverCloseTimers = new Map<string, number>();

  readonly menuItems: NavItem[] = [
    {label: 'Home', path: '/'},
    {label: 'About', path: '/about'},
    {
      label: 'Work',
      path: '/work',
      children: [
        {label: 'Projects', path: '/projects'},
        {label: 'Certifications', path: '/certifications'},
        {label: 'Testimonials', path: '/testimonials'},
      ],
    },
    {label: 'Resume', path: '/resume'},
    {label: 'Contact', path: '/contact'},
  ];

  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  readonly isDarkMode = this.themeService.isDarkMode;

  constructor() {
    this.setupScrollListener();
    this.setupRouteListener();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    this.closeDropdowns();
  }

  toggleDropdown(label: string): void {
    this.openDropdowns.update((set) => {
      const newSet = new Set(set);
      newSet.has(label) ? newSet.delete(label) : newSet.add(label);
      return newSet;
    });
  }

  isDropdownOpen(label: string): boolean {
    return this.openDropdowns().has(label);
  }

  onMouseEnter(label: string): void {
    if (this.hoverCloseTimers.has(label)) {
      window.clearTimeout(this.hoverCloseTimers.get(label));
      this.hoverCloseTimers.delete(label);
    }
    this.openDropdowns.update((set) => {
      const newSet = new Set(set);
      newSet.add(label);
      return newSet;
    });
  }

  onMouseLeave(label: string): void {
    const timer = window.setTimeout(() => {
      this.openDropdowns.update((set) => {
        const newSet = new Set(set);
        newSet.delete(label);
        return newSet;
      });
      this.hoverCloseTimers.delete(label);
    }, 150);
    this.hoverCloseTimers.set(label, timer);
  }

  closeDropdowns(): void {
    this.openDropdowns.set(new Set());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private setupScrollListener(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 20);
    });
  }

  private setupRouteListener(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.closeMobileMenu();
      });
  }
}

// src/app/shared/components/layout/top-menu/top-menu.component.ts
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

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    this.closeDropdowns();
  }

  toggleDropdown(label: string): void {
    this.openDropdowns.update((dropdowns) => {
      const newDropdowns = new Set(dropdowns);
      if (newDropdowns.has(label)) {
        newDropdowns.delete(label);
      } else {
        newDropdowns.clear();
        newDropdowns.add(label);
      }
      return newDropdowns;
    });
  }

  openDropdown(label: string): void {
    this.openDropdowns.update((dropdowns) => {
      const newDropdowns = new Set(dropdowns);
      newDropdowns.add(label);
      return newDropdowns;
    });
  }

  closeDropdown(label: string): void {
    setTimeout(() => {
      this.openDropdowns.update((dropdowns) => {
        const newDropdowns = new Set(dropdowns);
        newDropdowns.delete(label);
        return newDropdowns;
      });
    }, 200);
  }

  isDropdownOpen(label: string): boolean {
    return this.openDropdowns().has(label);
  }

  closeDropdowns(): void {
    this.openDropdowns.set(new Set());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

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

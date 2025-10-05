import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '@services/theme.service';

interface NavItem {
  label: string;
  path: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);

  readonly logo = 'AG';
  readonly isMobileMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly openDropdowns = signal<Set<string>>(new Set());

  readonly isDarkMode = this.themeService.isDarkMode;

  readonly navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    {
      label: 'Work',
      path: '/work',
      children: [
        { label: 'Projects', path: '/projects' },
        { label: 'Experience', path: '/experience' },
        { label: 'Skills', path: '/skills' },
      ]
    },
    {
      label: 'Content',
      path: '/content',
      children: [
        { label: 'Blog', path: '/blog' },
        { label: 'Testimonials', path: '/testimonials' },
        { label: 'Certifications', path: '/certifications' },
      ]
    },
    { label: 'Resume', path: '/resume' },
    { label: 'Contact', path: '/contact' },
  ];

  constructor() {
    this.setupScrollListener();
    this.setupRouteListener();
  }

  private setupScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 10);
    }, { passive: true });
  }

  private setupRouteListener(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.closeMobileMenu();
        this.closeDropdowns();
      });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(state => !state);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleDropdown(path: string): void {
    this.openDropdowns.update(dropdowns => {
      const newDropdowns = new Set(dropdowns);
      if (newDropdowns.has(path)) {
        newDropdowns.delete(path);
      } else {
        newDropdowns.clear();
        newDropdowns.add(path);
      }
      return newDropdowns;
    });
  }

  isDropdownOpen(path: string): boolean {
    return this.openDropdowns().has(path);
  }

  closeDropdowns(): void {
    this.openDropdowns.set(new Set());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

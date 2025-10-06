import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';
import {filter} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ThemeService} from '@services/theme.service';
import {ButtonComponent} from '@components/ui';

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
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly logo = 'AG';
  readonly isMobileMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly openDropdowns = signal<Set<string>>(new Set());
  readonly navItems: NavItem[] = [
    {label: 'Home', path: '/'},
    {label: 'About', path: '/about'},
    {
      label: 'Work',
      path: '/work',
      children: [
        {label: 'Projects', path: '/projects'},
        {label: 'Experience', path: '/experience'},
        {label: 'Skills', path: '/skills'},
      ]
    },
    {
      label: 'Content',
      path: '/content',
      children: [
        {label: 'Blog', path: '/blog'},
        {label: 'Testimonials', path: '/testimonials'},
        {label: 'Certifications', path: '/certifications'},
      ]
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
    this.isMobileMenuOpen.update(state => !state);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    this.closeDropdowns();
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

  openDropdown(path: string): void {
    this.openDropdowns.update(dropdowns => {
      const newDropdowns = new Set(dropdowns);
      newDropdowns.add(path);
      return newDropdowns;
    });
  }

  closeDropdown(path: string): void {
    setTimeout(() => {
      this.openDropdowns.update(dropdowns => {
        const newDropdowns = new Set(dropdowns);
        newDropdowns.delete(path);
        return newDropdowns;
      });
    }, 200);
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

  private setupScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 10);
    }, {passive: true});
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
}

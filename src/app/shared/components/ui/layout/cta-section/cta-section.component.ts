import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../../primitives/button/button.component';
import {CardComponent} from '@components/ui';
import {SectionComponent} from '../section/section.component';

interface CtaButton {
  label: string;
  route: string;
  variant: 'primary' | 'white' | 'ghost';
}

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [RouterLink, ButtonComponent, CardComponent, SectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section>
      <app-card data-aos="fade-up">
        <div class="text-center">
          @if (icon()) {
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl
                        flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
              <span class="material-symbols-rounded text-white text-3xl">{{ icon() }}</span>
            </div>
          }

          <h2 class="text-3xl font-bold mb-6">
            {{ title() }}
          </h2>

          <p class="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {{ description() }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            @for (button of buttons(); track button.route) {
              <app-button
                [routerLink]="button.route"
                [variant]="button.variant"
                class="w-full sm:w-auto sm:min-w-[180px]">
                {{ button.label }}
              </app-button>
            }
          </div>
        </div>
      </app-card>
    </app-section>
  `
})
export class CtaSectionComponent {
  icon = input<string>();
  title = input<string>('Let\'s Work Together');
  description = input<string>('Ready to start your next project? Get in touch and let\'s ' +
    'create something amazing.');
  buttons = input<CtaButton[]>([
    {label: 'Get Started', route: '/contact', variant: 'primary'},
    {label: 'Learn More', route: '/about', variant: 'white'}
  ]);
}

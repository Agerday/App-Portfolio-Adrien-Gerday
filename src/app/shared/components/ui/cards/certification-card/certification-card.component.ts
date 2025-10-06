import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Certification } from '@core/data/certifications.data';
import { CardComponent } from '@components/ui';

@Component({
  selector: 'app-certification-card',
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card
      class="group hover:-translate-y-2 transition-all duration-300 cursor-default">

      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ cert().name }}
          </h3>

          <!-- Issuer -->
          @if (cert().issuerUrl) {
            <a
              [href]="cert().issuerUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              {{ cert().issuer }}
            </a>
          } @else {
            <p class="text-lg text-blue-600 dark:text-blue-400 font-semibold">
              {{ cert().issuer }}
            </p>
          }
        </div>

        <span
          class="material-symbols-rounded text-blue-600 dark:text-blue-400 text-3xl
          group-hover:scale-110 transition-transform">
          verified
        </span>
      </div>

      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        {{ cert().description }}
      </p>

      <!-- Details -->
      <div class="space-y-3 mb-6">
        <div class="flex items-center gap-3">
          <span class="material-symbols-rounded text-gray-400 text-[20px]">calendar_today</span>
          <div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Completed:</span>
            <span class="ml-2 text-gray-700 dark:text-gray-300 font-medium">{{ date() }}</span>
          </div>
        </div>

        @if (cert().credentialId) {
          <div class="flex items-center gap-3">
            <span class="material-symbols-rounded text-gray-400 text-[20px]">badge</span>
            <div>
              <span class="text-sm text-gray-500 dark:text-gray-400">Certificate ID:</span>
              <span class="ml-2 text-gray-700 dark:text-gray-300 font-mono text-sm">
                {{ cert().credentialId }}
              </span>
            </div>
          </div>
        }
      </div>

      <!-- Skills -->
      <div class="mb-6">
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Technologies Covered:
        </h4>
        <div class="flex flex-wrap gap-2">
          @for (skill of cert().skills; track skill) {
            <span
              class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400
              text-sm rounded-lg font-medium">
              {{ skill }}
            </span>
          }
        </div>
      </div>

      <!-- View Certificate (clickable area only) -->
      @if (cert().verificationUrl) {
        <div
          class="pt-4 border-t border-gray-200 dark:border-gray-700 cursor-pointer"
          (click)="cardClicked.emit()">
          <div
            class="flex items-center justify-between text-blue-600 dark:text-blue-400 font-semibold
            group-hover:text-blue-700 dark:group-hover:text-blue-300">
            <span>View Certificate</span>
            <span class="material-symbols-rounded text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </div>
      }
    </app-card>
  `
})
export class CertificationCardComponent {
  cert = input.required<Certification>();
  date = input.required<string>();
  cardClicked = output<void>();
}

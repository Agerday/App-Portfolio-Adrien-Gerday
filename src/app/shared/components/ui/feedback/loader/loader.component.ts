import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {LoaderService} from '@services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (active()) {
      <div class="loader-overlay">
        <div class="loader-content">
          <div class="spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
          </div>

          @if (text()) {
            <p class="loader-message">{{ text() }}</p>
          }

          @if (progressValue() !== undefined && progressValue() !== null) {
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="progressValue()"></div>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    }

    .loader-content {
      text-align: center;
    }

    .spinner {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }

    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1.5s linear infinite;
    }

    .spinner-ring:nth-child(2) {
      width: 70%;
      height: 70%;
      top: 15%;
      left: 15%;
      border-top-color: #8b5cf6;
      animation-duration: 1.2s;
      animation-direction: reverse;
    }

    .spinner-ring:nth-child(3) {
      width: 50%;
      height: 50%;
      top: 25%;
      left: 25%;
      border-top-color: #14b8a6;
      animation-duration: 1s;
    }

    .spinner-ring:nth-child(4) {
      width: 30%;
      height: 30%;
      top: 35%;
      left: 35%;
      border-top-color: #f59e0b;
      animation-duration: 0.8s;
      animation-direction: reverse;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .loader-message {
      color: white;
      margin-top: 20px;
      font-size: 14px;
      animation: pulse 1.5s ease infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }

    .progress-bar {
      width: 200px;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      margin: 20px auto 0;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  `]
})
export class LoaderComponent {
  isLoading = input<boolean>();
  message = input<string>();
  progress = input<number>();
  private readonly loader = inject(LoaderService);
  private readonly serviceIsLoading = this.loader.isLoading;
  readonly active = computed(() => this.isLoading() ?? this.serviceIsLoading());
  private readonly serviceMessage = this.loader.message;
  readonly text = computed(() => this.message() ?? this.serviceMessage());
  private readonly serviceProgress = this.loader.progress;
  readonly progressValue = computed(() => this.progress() ?? this.serviceProgress());
}

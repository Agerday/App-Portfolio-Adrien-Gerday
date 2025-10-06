import {computed, Injectable, signal} from '@angular/core';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

@Injectable({providedIn: 'root'})
export class LoaderService {
  private loadingState = signal<LoadingState>({isLoading: false});
  isLoading = computed(() => this.loadingState().isLoading);
  message = computed(() => this.loadingState().message);
  progress = computed(() => this.loadingState().progress);
  private activeRequests = signal(0);
  private loadingStartTime: number | null = null;
  private minimumLoadingTime = 300;

  show(message?: string): void {
    this.loadingStartTime = Date.now();
    this.activeRequests.update(c => c + 1);
    this.loadingState.set({isLoading: true, message});
  }

  hide(): void {
    const elapsed = this.loadingStartTime
      ? Date.now() - this.loadingStartTime
      : this.minimumLoadingTime;
    const delay = Math.max(0, this.minimumLoadingTime - elapsed);

    setTimeout(() => {
      this.activeRequests.update(c => Math.max(0, c - 1));
      if (this.activeRequests() === 0) {
        this.loadingState.set({isLoading: false});
        this.loadingStartTime = null;
      }
    }, delay);
  }

  forceHide(): void {
    this.activeRequests.set(0);
    this.loadingState.set({isLoading: false});
    this.loadingStartTime = null;
  }

  updateMessage(message: string): void {
    this.loadingState.update(s => ({...s, message}));
  }

  updateProgress(progress: number): void {
    const clamped = Math.max(0, Math.min(100, progress));
    this.loadingState.update(s => ({...s, progress: clamped}));
  }
}

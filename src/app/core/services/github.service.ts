import { Injectable, signal, computed } from '@angular/core';
import { GITHUB_STATS, LANGUAGE_STATS } from '@core/data/github.data';
import { GitHubStats, LanguageStats } from '@models/github.models';

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private readonly _stats = signal<GitHubStats>(GITHUB_STATS);
  private readonly _languages = signal<readonly LanguageStats[]>(LANGUAGE_STATS);
  private readonly _loading = signal(false);

  readonly stats = this._stats.asReadonly();
  readonly languages = this._languages.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly topLanguages = computed(() => this._languages().slice(0, 5));
  readonly totalLinesOfCode = computed(() => this._languages()
    .reduce((sum, lang) => sum + lang.linesOfCode, 0));

  fetchGitHubData(): void {
    this._loading.set(true);
    setTimeout(() => this._loading.set(false), 300);
  }
}

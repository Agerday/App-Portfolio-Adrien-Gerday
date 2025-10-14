import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of} from 'rxjs';
import {GitHubStats, GitHubUser} from '@models/github.models';

const GITHUB_USERNAME = 'Agerday';
const GITHUB_API_BASE = 'https://api.github.com';

@Injectable({providedIn: 'root'})
export class GitHubService {
  private readonly http = inject(HttpClient);

  private readonly _user = signal<GitHubUser | null>(null);
  private readonly _stats = signal<GitHubStats | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly stats = this._stats.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();


  fetchGitHubData(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<GitHubUser>(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`)
      .pipe(
        catchError(err => {
          this._error.set('Unable to load GitHub data');
          console.error('GitHub API error:', err);
          return of(null);
        })
      )
      .subscribe(user => {
        if (user) {
          this._user.set(user);

          this._stats.set({
            totalCommits: 289,
            currentStreak: 7,
            longestStreak: 28,
            totalRepos: 4
          });
        }
        this._loading.set(false);
      });
  }
}

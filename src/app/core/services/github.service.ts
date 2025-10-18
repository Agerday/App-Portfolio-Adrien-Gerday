import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of, timeout, TimeoutError} from 'rxjs';
import {LANGUAGE_STATS} from '@core/data/github.data';
import {GitHubStats, LanguageStats} from '@models/github.models';

const GITHUB_USERNAME = 'Agerday';
const FETCH_TIMEOUT = 2000;

interface MonthActivity {
  readonly month: string;
  readonly commits: number;
}

@Injectable({providedIn: 'root'})
export class GitHubService {
  private readonly http = inject(HttpClient);
  private readonly CACHE_KEY = 'github_data';
  private readonly CACHE_DURATION = 3600000;

  private readonly _stats = signal<GitHubStats | null>(null);
  private readonly _languages = signal<readonly LanguageStats[]>(LANGUAGE_STATS);
  private readonly _monthlyActivity = signal<readonly MonthActivity[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal(false);

  readonly stats = this._stats.asReadonly();
  readonly monthlyActivity = this._monthlyActivity.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly topLanguages = computed(() => this._languages().slice(0, 5));
  readonly maxMonthlyCommits = computed(() => {
    const activity = this._monthlyActivity();
    return activity.length > 0 ? Math.max(...activity.map(m => m.commits)) : 1;
  });

  fetchGitHubData(): void {
    this._loading.set(true);
    this._error.set(false);

    const fallbackStats: GitHubStats = {
      totalCommits: 289,
      mostCommitsInOneDay: 32,
      totalRepos: 5,
      totalLinesOfCode: 22300
    };

    const fallbackActivity: MonthActivity[] = this.generateFallbackActivity();

    const cached = localStorage.getItem(this.CACHE_KEY);
    if (cached) {
      const {data, timestamp} = JSON.parse(cached);
      if (Date.now() - timestamp < this.CACHE_DURATION) {
        this._stats.set(data);
        return;
      }
    }

    this.http
      .get<any>(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .pipe(
        timeout(FETCH_TIMEOUT),
        catchError((error) => {
          console.warn('GitHub API failed or timed out, using fallback data:', error);

          if (error instanceof TimeoutError) {
            console.warn(`GitHub API timeout after ${FETCH_TIMEOUT}ms`);
          }

          this._stats.set(fallbackStats);
          this._monthlyActivity.set(fallbackActivity);
          this._error.set(true);
          this._loading.set(false);

          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          try {
            const contributions = data.contributions;
            const last6Months = this.calculateLast6Months(contributions);
            const totalCommits = last6Months.reduce((sum, m) => sum + m.commits, 0);
            const mostCommitsInOneDay = Math.max(...contributions.map((c: any) => c.count), 0);

            this._stats.set({
              totalCommits,
              mostCommitsInOneDay,
              totalRepos: 5,
              totalLinesOfCode: 22300
            });

            this._monthlyActivity.set(last6Months);
            this._error.set(false);
          } catch (error) {
            console.error('Error processing GitHub data:', error);
            this._stats.set(fallbackStats);
            this._monthlyActivity.set(fallbackActivity);
            this._error.set(true);
          }
        }

        this._loading.set(false);
      });
  }

  private calculateLast6Months(contributions: any[]): MonthActivity[] {
    const now = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const last6Months: MonthActivity[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = monthNames[date.getMonth()];
      last6Months.push({month: monthName, commits: 0});
    }

    contributions.forEach((contribution: any) => {
      const contribDate = new Date(contribution.date);
      const monthIndex = last6Months.findIndex(m => {
        const monthNum = monthNames.indexOf(m.month);
        const targetYear = now.getFullYear() - (monthNum > now.getMonth() ? 1 : 0);
        return contribDate.getMonth() === monthNum && contribDate.getFullYear() === targetYear;
      });

      if (monthIndex !== -1) {
        last6Months[monthIndex] = {
          ...last6Months[monthIndex],
          commits: last6Months[monthIndex].commits + contribution.count
        };
      }
    });

    return last6Months;
  }

  private generateFallbackActivity(): MonthActivity[] {
    const now = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fallbackData: MonthActivity[] = [];

    const fallbackCommits = [45, 38, 22, 11, 28, 35];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = monthNames[date.getMonth()];
      fallbackData.push({
        month: monthName,
        commits: fallbackCommits[5 - i]
      });
    }

    return fallbackData;
  }
}

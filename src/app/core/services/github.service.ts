import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of} from 'rxjs';
import {LANGUAGE_STATS} from '@core/data/github.data';
import {GitHubStats, LanguageStats} from '@models/github.models';

const GITHUB_USERNAME = 'Agerday';

@Injectable({providedIn: 'root'})
export class GitHubService {
    private readonly http = inject(HttpClient);

    private readonly _stats = signal<GitHubStats | null>(null);
    private readonly _languages = signal<readonly LanguageStats[]>(LANGUAGE_STATS);
    private readonly _loading = signal(false);

    readonly stats = this._stats.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly topLanguages = computed(() => this._languages().slice(0, 5));

    fetchGitHubData(): void {
        this._loading.set(true);

        this.http.get<any>(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
            .pipe(
                catchError(error => {
                    console.error('Failed to fetch GitHub data:', error);
                    // Fallback to known stats
                    this._stats.set({
                        totalCommits: 289,
                        mostCommitsInOneDay: 32,
                        totalRepos: 20,
                        totalLinesOfCode: 205000
                    });
                    this._loading.set(false);
                    return of(null);
                })
            )
            .subscribe(data => {
                if (data) {
                    const contributions = data.contributions;

                    const totalCommits = contributions.reduce((sum: number, day: any) => sum + day.count, 0);
                    const mostCommitsInOneDay = Math.max(...contributions.map((day: any) => day.count));

                    this._stats.set({
                        totalCommits,
                        mostCommitsInOneDay,
                        totalRepos: 4,
                        totalLinesOfCode: 205000
                    });
                }
                this._loading.set(false);
            });
    }
}

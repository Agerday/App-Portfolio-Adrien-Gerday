import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of} from 'rxjs';
import {LANGUAGE_STATS} from '@core/data/github.data';
import {GitHubStats, LanguageStats} from '@models/github.models';

const GITHUB_USERNAME = 'Agerday';

interface MonthActivity {
    readonly month: string;
    readonly commits: number;
}

@Injectable({providedIn: 'root'})
export class GitHubService {
    private readonly http = inject(HttpClient);

    private readonly _stats = signal<GitHubStats | null>(null);
    private readonly _languages = signal<readonly LanguageStats[]>(LANGUAGE_STATS);
    private readonly _monthlyActivity = signal<readonly MonthActivity[]>([]);
    private readonly _loading = signal(false);

    readonly stats = this._stats.asReadonly();
    readonly monthlyActivity = this._monthlyActivity.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly topLanguages = computed(() => this._languages().slice(0, 5));
    readonly maxMonthlyCommits = computed(() => {
        const activity = this._monthlyActivity();
        return activity.length > 0 ? Math.max(...activity.map(m => m.commits)) : 1;
    });

    fetchGitHubData(): void {
        this._loading.set(true);

        this.http.get<any>(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
            .pipe(
                catchError(error => {
                    console.error('Failed to fetch GitHub data:', error);

                    this._stats.set({
                        totalCommits: 289,
                        mostCommitsInOneDay: 32,
                        totalRepos: 5,
                        totalLinesOfCode: 205000
                    });

                    this._loading.set(false);
                    return of(null);
                })
            )
            .subscribe(data => {
                if (data) {
                    const contributions = data.contributions;

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
                            return contribDate.getMonth() === monthNum &&
                                contribDate.getFullYear() === now.getFullYear() - (monthNum > now.getMonth() ? 1 : 0);
                        });

                        if (monthIndex !== -1) {
                            last6Months[monthIndex] = {
                                ...last6Months[monthIndex],
                                commits: last6Months[monthIndex].commits + contribution.count
                            };
                        }
                    });

                    const totalCommits = last6Months.reduce((sum, m) => sum + m.commits, 0);
                    const mostCommitsInOneDay = Math.max(...contributions.map((c: any) => c.count));

                    this._stats.set({
                        totalCommits,
                        mostCommitsInOneDay,
                        totalRepos: 5,
                        totalLinesOfCode: 205000
                    });

                    this._monthlyActivity.set(last6Months);
                }

                this._loading.set(false);
            });
    }
}

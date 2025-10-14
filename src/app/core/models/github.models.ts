export interface GitHubUser {
  readonly login: string;
  readonly id: number;
  readonly avatar_url: string;
  readonly html_url: string;
  readonly name: string | null;
  readonly company: string | null;
  readonly blog: string | null;
  readonly location: string | null;
  readonly email: string | null;
  readonly bio: string | null;
  readonly public_repos: number;
  readonly public_gists: number;
  readonly followers: number;
  readonly following: number;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface GitHubStats {
  readonly totalCommits: number;
  readonly currentStreak: number;
  readonly longestStreak: number;
  readonly totalRepos: number;
}

export interface LanguageStats {
  readonly name: string;
  readonly percentage: number;
  readonly color: string;
}

export interface ContributionDay {
  readonly date: string;
  readonly count: number;
  readonly level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  readonly days: readonly ContributionDay[];
}

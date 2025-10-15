export interface GitHubStats {
  readonly totalCommits: number;
  readonly mostCommitsInOneDay: number;
  readonly totalRepos: number;
  readonly totalLinesOfCode: number;
}

export interface LanguageStats {
  readonly name: string;
  readonly percentage: number;
  readonly color: string;
  readonly linesOfCode: number;
}

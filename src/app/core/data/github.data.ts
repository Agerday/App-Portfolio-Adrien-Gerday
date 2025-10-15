export const GITHUB_STATS = {
  totalCommits: 289,
  mostCommitsInOneDay: 32,
  totalRepos: 4,
  totalLinesOfCode: 205000
} as const;

export const LANGUAGE_STATS = [
  { name: 'TypeScript', percentage: 57, color: '#3178c6', linesOfCode: 17442 },
  { name: 'JavaScript', percentage: 23, color: '#f1e05a', linesOfCode: 7610 },
  { name: 'Java', percentage: 10, color: '#b07219', linesOfCode: 2924 },
  { name: 'HTML', percentage: 5, color: '#e34c26', linesOfCode: 1514 },
  { name: 'SCSS', percentage: 5, color: '#c6538c', linesOfCode: 461 }
] as const;

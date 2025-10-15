import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { GitHubStats } from '@models/github.models';

interface PortfolioStat {
  readonly value: number | string;
  readonly label: string;
  readonly suffix?: string;
  readonly icon: string;
  readonly color: string;
}

@Component({
  selector: 'app-combined-stats',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative py-16 sm:py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
        <div class="absolute inset-0 bg-gradient-radial opacity-20"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-16"
            data-aos="zoom-in" data-aos-duration="600">
          Proven Track Record
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          @for (stat of combinedStats(); track stat.label; let i = $index) {
            <div class="text-center text-white transform hover:scale-110 transition-transform duration-300"
                 data-aos="flip-up"
                 data-aos-duration="800"
                 [attr.data-aos-delay]="i * 100">
              <div class="mb-4">
                <span [class]="'material-symbols-rounded text-5xl sm:text-6xl ' + stat.color">
                  {{ stat.icon }}
                </span>
              </div>
              <div class="text-4xl sm:text-5xl font-bold mb-2">
                {{ stat.value }}<span class="text-white/70 text-2xl">{{ stat.suffix }}</span>
              </div>
              <div class="text-sm sm:text-base text-white/90 font-medium">{{ stat.label }}</div>
            </div>
          }
        </div>

        <div class="mt-16 text-center">
          <div class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 border border-white/20">
            <span class="material-symbols-rounded text-[16px]">info</span>
            <span>Statistics include private repositories • Updated January 2025</span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CombinedStatsComponent {
  readonly githubStats = input.required<GitHubStats>();
  readonly yearsExperience = input(6);
  readonly projectsDelivered = input(7);

  readonly combinedStats = computed<PortfolioStat[]>(() => {
    const github = this.githubStats();

    return [
      {
        value: this.yearsExperience(),
        label: 'Years Experience',
        suffix: '+',
        icon: 'schedule',
        color: 'text-blue-200'
      },
      {
        value: this.projectsDelivered(),
        label: 'Projects Delivered',
        suffix: '',
        icon: 'rocket_launch',
        color: 'text-purple-200'
      },
      {
        value: github.totalCommits,
        label: 'Commits (6mo)',
        suffix: '+',
        icon: 'commit',
        color: 'text-green-200'
      },
      {
        value: github.mostCommitsInOneDay,
        label: 'Busiest Day',
        suffix: ' commits',
        icon: 'trending_up',
        color: 'text-orange-200'
      },
      {
        value: github.totalRepos,
        label: 'Total Personal Repos',
        suffix: '',
        icon: 'folder',
        color: 'text-cyan-200'
      }
    ];
  });
}

import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {SeoService} from '@services/seo.service';
import {AnalyticsService} from '@services/analytics.service';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

interface Skill {
  name: string;
  category: string;
  level: number;
  experience: string;
  icon?: string;
  description?: string;
  projects?: number;
  certifications?: string[];
}

interface SkillCategory {
  name: string;
  icon: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  searchTerm = '';
  searchQuery = signal('');
  selectedCategory = signal<string>('all');
  categories: SkillCategory[] = [
    {
      name: 'Frontend',
      icon: '🎨',
      description: 'Client-side technologies and frameworks',
      color: '#3b82f6'
    },
    {
      name: 'Backend',
      icon: '⚙️',
      description: 'Server-side technologies and databases',
      color: '#10b981'
    },
    {
      name: 'DevOps',
      icon: '🚀',
      description: 'Deployment, CI/CD, and cloud services',
      color: '#f59e0b'
    },
    {
      name: 'Tools',
      icon: '🛠️',
      description: 'Development tools and methodologies',
      color: '#8b5cf6'
    }
  ];
  skills: Skill[] = [
    {
      name: 'Angular',
      category: 'Frontend',
      level: 95,
      experience: '5+ years',
      icon: '🅰️',
      description: 'Expert in Angular 2+ including latest features like signals, standalone components, and control flow',
      projects: 25,
      certifications: ['Google Developer Expert']
    },
    {
      name: 'TypeScript',
      category: 'Frontend',
      level: 92,
      experience: '5+ years',
      icon: '📘',
      description: 'Advanced TypeScript features, generics, decorators, and type manipulation',
      projects: 30
    },
    {
      name: 'RxJS',
      category: 'Frontend',
      level: 88,
      experience: '4+ years',
      icon: '🔄',
      description: 'Reactive programming, complex data streams, and custom operators',
      projects: 20
    },
    {
      name: 'React',
      category: 'Frontend',
      level: 75,
      experience: '2+ years',
      icon: '⚛️',
      description: 'React hooks, context API, and modern React patterns',
      projects: 8
    },
    {
      name: 'Node.js',
      category: 'Backend',
      level: 85,
      experience: '4+ years',
      icon: '🟢',
      description: 'RESTful APIs, Express.js, authentication, and microservices',
      projects: 15
    },
    {
      name: 'PostgreSQL',
      category: 'Backend',
      level: 80,
      experience: '3+ years',
      icon: '🐘',
      description: 'Complex queries, optimization, and database design',
      projects: 12
    },
    {
      name: 'MongoDB',
      category: 'Backend',
      level: 75,
      experience: '3+ years',
      icon: '🍃',
      description: 'NoSQL design patterns, aggregation pipelines',
      projects: 10
    },
    {
      name: 'Docker',
      category: 'DevOps',
      level: 80,
      experience: '3+ years',
      icon: '🐳',
      description: 'Containerization, Docker Compose, multi-stage builds',
      projects: 15
    },
    {
      name: 'AWS',
      category: 'DevOps',
      level: 75,
      experience: '3+ years',
      icon: '☁️',
      description: 'EC2, S3, Lambda, CloudFront, RDS',
      projects: 10,
      certifications: ['AWS Certified Developer']
    },
    {
      name: 'CI/CD',
      category: 'DevOps',
      level: 85,
      experience: '4+ years',
      icon: '🔁',
      description: 'GitHub Actions, Jenkins, GitLab CI, automated testing',
      projects: 20
    },
    {
      name: 'Git',
      category: 'Tools',
      level: 90,
      experience: '6+ years',
      icon: '📚',
      description: 'Git flow, branching strategies, conflict resolution',
      projects: 50
    },
    {
      name: 'Testing',
      category: 'Tools',
      level: 85,
      experience: '4+ years',
      icon: '🧪',
      description: 'Unit testing, E2E testing, Jest, Cypress, Karma',
      projects: 25
    }
  ];
  tools = [
    'VS Code', 'WebStorm', 'Postman', 'Chrome DevTools', 'Webpack', 'Vite',
    'ESLint', 'Prettier', 'npm', 'yarn', 'pnpm', 'Figma', 'Jira', 'Confluence',
    'Slack', 'Teams', 'GraphQL', 'REST API', 'WebSockets', 'JWT', 'OAuth',
    'Tailwind CSS', 'Material Design', 'Bootstrap', 'SASS/SCSS', 'Redux',
    'NgRx', 'Nginx', 'Linux', 'Bash', 'Agile', 'Scrum', 'Kanban'
  ];
  currentlyLearning = [
    'Next.js 14', 'Rust', 'WebAssembly', 'Kubernetes', 'Machine Learning'
  ];
  filteredSkills = computed(() => {
    let filtered = [...this.skills];

    // Filter by category
    if (this.selectedCategory() !== 'all') {
      filtered = filtered.filter(s => s.category === this.selectedCategory());
    }

    // Filter by search
    const search = this.searchQuery().toLowerCase();
    if (search) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(search) ||
        s.description?.toLowerCase().includes(search) ||
        s.category.toLowerCase().includes(search)
      );
    }

    return filtered;
  });
  private seoService = inject(SeoService);
  private analyticsService = inject(AnalyticsService);

  ngOnInit(): void {
    this.seoService.update({
      title: 'Technical Skills',
      description: 'Comprehensive overview of technical skills including Angular, TypeScript, and modern web technologies',
      keywords: 'technical skills, Angular, TypeScript, web development, programming languages'
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.analyticsService.trackSkillFilter(category);
  }

  getSkillCountByCategory(category: string): number {
    return this.skills.filter(s => s.category === category).length;
  }

  getCategoryColor(category: string): string {
    return this.categories.find(c => c.name === category)?.color || '#6b7280';
  }

  getAverageProficiency(category: string): number {
    const categorySkills = this.skills.filter(s => s.category === category);
    if (categorySkills.length === 0) return 0;

    const total = categorySkills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / categorySkills.length);
  }
}

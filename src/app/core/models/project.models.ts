export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'enterprise' | 'opensource';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
  duration: string;
  role: string;
  teamSize?: number;
  highlights: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  technologies: string;
  badge: string;
}

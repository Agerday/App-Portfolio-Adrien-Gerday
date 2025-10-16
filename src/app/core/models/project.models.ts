export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'enterprise' | 'personal';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
  duration: string;
  role: string;
  teamSize?: number;
  highlights: string[];
  longDescription?: string;
  images?: string[];
  client?: string;
  challenges?: string[];
  solutions?: string[];
  features?: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  technologies: string;
  badge: string;
}

export interface ProjectCategory {
  value: string;
  label: string;
}

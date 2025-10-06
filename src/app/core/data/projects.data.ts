import {FeaturedProject, Project} from '@models/project.models';

export const PROJECTS: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform built with Angular 18, featuring real-time inventory management, payment processing, and admin dashboard.',
    shortDescription: 'Modern e-commerce solution with real-time features',
    image: 'assets/images/projects/ecommerce.jpg',
    technologies: ['Angular 18', 'TypeScript', 'NgRx', 'Node.js', 'PostgreSQL', 'Stripe API', 'Docker'],
    category: 'enterprise',
    liveUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/yourusername/ecommerce',
    featured: true,
    year: 2024,
    duration: '6 months',
    role: 'Lead Frontend Developer',
    teamSize: 5,
    highlights: [
      'Increased conversion rate by 35%',
      'Handles 10k+ concurrent users',
      'PWA with offline capabilities',
      '99.9% uptime'
    ]
  },
  {
    id: 'task-management',
    title: 'Task Management System',
    description: 'Collaborative task management application with real-time updates, drag-and-drop interface, and team analytics.',
    shortDescription: 'Real-time collaborative task management',
    image: 'assets/images/projects/taskmanager.jpg',
    technologies: ['Angular', 'RxJS', 'Material Design', 'Firebase', 'Chart.js'],
    category: 'web',
    liveUrl: 'https://tasks.example.com',
    featured: false,
    year: 2024,
    duration: '3 months',
    role: 'Full Stack Developer',
    teamSize: 3,
    highlights: [
      'Real-time collaboration',
      'Advanced analytics dashboard',
      'Mobile responsive design'
    ]
  }
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'ecommerce-platform',
    title: 'Enterprise SaaS Platform',
    description: 'Full-featured e-commerce platform with real-time inventory management',
    technologies: 'Angular • TypeScript • AWS',
    badge: 'Featured'
  },
  {
    id: 'task-management',
    title: 'Real-time Dashboard',
    description: 'Collaborative task management with live updates',
    technologies: 'React • Node.js • WebSocket',
    badge: 'Recent'
  }
];

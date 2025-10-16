import { Project, ProjectCategory } from '@models/project.models';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { value: 'personal', label: 'Personal Projects' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'web', label: 'Web Apps' }
];

export const PROJECTS: Project[] = [
  {
    id: 'numbr-accounting-system',
    title: 'NUMBR - Full Accounting SaaS',
    description: 'End-to-end accounting application built independently as a solo full-stack developer. Features responsive React UI with secure authentication, real-time Firestore sync, and optimized dashboards for small businesses.',
    shortDescription: 'Full-stack accounting SaaS with React, Firebase, and Node.js',
    image: 'assets/images/projects/numbr-main.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'Firebase', 'Firestore', 'MUI', 'Vite', 'Vitest'],
    category: 'personal',
    liveUrl: 'https://numbr-system.web.app/',
    featured: true,
    year: 2025,
    duration: '3 months (ongoing)',
    role: 'Full-Stack Solo Developer',
    teamSize: 1,
    highlights: [
      'Built complete frontend, backend, and deployment infrastructure',
      'Implemented secure authentication with Firebase Auth',
      'Real-time data synchronization with Firestore',
      'Comprehensive unit and integration testing with Vitest',
      'Responsive dashboard optimized for small business workflows'
    ],
    longDescription: `NUMBR is a modern accounting SaaS application I built entirely from scratch as a solo developer. This project showcases my ability to handle the full development lifecycle - from initial architecture design through deployment and maintenance.

The application provides small businesses with an intuitive interface for managing their accounting needs, featuring real-time data synchronization, secure user authentication, and a responsive design that works seamlessly across devices.

Built with modern web technologies including React, TypeScript, and Firebase, the system leverages Cloud Functions for backend processing and Firestore for real-time database capabilities. The development process included comprehensive testing strategies to ensure reliability across all critical features.`,
    images: [
      'assets/images/projects/numbr-main.jpg',
      'assets/images/projects/numbr-dashboard.jpg',
      'assets/images/projects/numbr-dues.jpg',
      'assets/images/projects/numbr-admin.jpg'
    ],
    challenges: [
      'Designing a scalable architecture as a solo developer',
      'Implementing secure financial data handling',
      'Creating an intuitive UX for complex accounting workflows',
      'Managing real-time data consistency across multiple users'
    ],
    solutions: [
      'Used Firebase ecosystem for rapid development with enterprise-grade security',
      'Implemented comprehensive Firestore security rules for data protection',
      'Conducted user research to simplify complex accounting concepts',
      'Leveraged Firestore transactions for data consistency guarantees'
    ],
    features: [
      'Real-time dashboard with business metrics',
      'Transaction management and categorization',
      'Invoice generation and tracking',
      'Financial reports and analytics',
      'Multi-currency support',
      'Secure user authentication',
      'Responsive design for mobile and desktop',
      'Cloud-based data backup'
    ]
  },
  {
    id: 'flight-booking-react',
    title: 'Flight Booking System',
    description: 'Modern flight booking application built with React featuring real-time flight search, booking management, and responsive design. Demonstrates advanced state management and API integration.',
    shortDescription: 'React-based flight booking with real-time search',
    image: 'assets/images/projects/flight-main.jpg',
    technologies: ['React', 'TypeScript', 'Redux', 'REST API', 'CSS3', 'Responsive Design'],
    category: 'web',
    liveUrl: 'https://flight-booking-app-react.web.app/',
    githubUrl: 'https://github.com/Agerday/flight-booking-app',
    featured: true,
    year: 2024,
    duration: '1 week',
    role: 'Frontend Developer',
    teamSize: 1,
    highlights: [
      'Real-time flight search and filtering',
      'Complex state management with Redux',
      'Responsive design for all devices',
      'Optimized performance with lazy loading'
    ],
    longDescription: `A comprehensive flight booking application that showcases modern React development practices. The application provides users with an intuitive interface to search for flights, compare prices, and manage bookings.

The project demonstrates proficiency in state management using Redux, API integration for real-time flight data, and creating responsive, user-friendly interfaces. Special attention was paid to performance optimization and code quality.`,
    images: [
      'assets/images/projects/flight-results.jpg',
      'assets/images/projects/flight-seats.jpg',
      'assets/images/projects/flight-extras.jpg',
      'assets/images/projects/flight-confirmation.jpg'
    ],
    challenges: [
      'Managing complex application state across multiple views',
      'Handling real-time flight data updates',
      'Creating an intuitive multi-step booking flow',
      'Optimizing performance for large datasets'
    ],
    solutions: [
      'Implemented Redux for predictable state management',
      'Used caching strategies for frequently accessed data',
      'Designed clear visual hierarchy for booking steps',
      'Applied virtualization for rendering large flight lists'
    ],
    features: [
      'Advanced flight search with multiple filters',
      'Real-time price comparison',
      'Multi-step booking process',
      'Booking history and management',
      'Responsive design',
      'Form validation',
      'Loading states and error handling',
      'Accessible interface (WCAG compliant)'
    ]
  },
  {
    id: 'tax-management-platform',
    title: 'Multi-Client Tax Management Platform',
    description: 'Led frontend migration from Angular 8 to 17 for Belgian federal tax system serving multiple government clients. Modernized architecture, reduced rollout time by 30%, and improved UX across 4 systems.',
    shortDescription: 'Enterprise tax platform modernization (Angular 8→17)',
    technologies: ['Angular 17', 'TypeScript', 'RxJS', 'NgRx', 'REST API', 'i18n'],
    category: 'enterprise',
    featured: false,
    year: 2024,
    duration: '13 months',
    role: 'Front End Lead',
    teamSize: 12,
    highlights: [
      'Migrated from Angular 8 to 17',
      'Reduced client rollout time by 30%',
      'Eliminated legacy technical debt',
      'Improved system reliability and UX'
    ],
    longDescription: `Led the complete frontend modernization of a critical tax management platform used by the Belgian Federal Public Service Finance. The system serves multiple government clients with complex tax workflow requirements.

This large-scale migration project involved upgrading from Angular 8 to Angular 17, introducing modular architecture patterns, and significantly improving the codebase maintainability. The project required careful coordination with backend teams and stakeholders while maintaining zero downtime for production systems.`
  },
  {
    id: 'data-visualization-platform',
    title: 'Advanced Data Visualization Platform',
    description: 'Built React-based analytics platform for Belgian federal finance with real-time multi-country data visualization. Handled 1M+ records with custom Recharts implementations and dynamic calculations.',
    shortDescription: 'Real-time analytics with complex visualizations',
    technologies: ['React', 'TypeScript', 'Redux', 'Recharts', 'Java Spring Boot', 'PostgreSQL'],
    category: 'enterprise',
    featured: false,
    year: 2023,
    duration: '12 months',
    role: 'Front End Lead / Back End Assist',
    teamSize: 6,
    highlights: [
      'Real-time multi-country data visualization',
      'Custom interactive Recharts components',
      'High-performance rendering for 1M+ records',
      'Backend calculations with Java Spring Boot'
    ],
    longDescription: `Developed a sophisticated analytics platform for the Belgian Federal Public Service Finance, providing real-time data visualization across multiple countries and datasets.

The project required handling massive datasets efficiently while maintaining smooth interactivity. Custom Recharts visualizations were developed to meet specific government reporting requirements, including bubble charts, line charts, and mixed chart types with dynamic data updates.`
  },
  {
    id: 'document-factory',
    title: 'Document Factory Platform',
    description: 'Created document automation system for Belgian federal finance enabling digital citizen workflows. Built drag-and-drop UI with reusable templates, reducing document creation time significantly.',
    shortDescription: 'Document automation with template system',
    technologies: ['React', 'TypeScript', 'Java Spring Boot', 'ItextPDF', 'REST API'],
    category: 'enterprise',
    featured: false,
    year: 2022,
    duration: '30 months',
    role: 'Front End Lead',
    teamSize: 7,
    highlights: [
      'Replaced paper-based processes with digital workflows',
      'Drag-and-drop template builder',
      'Reusable component library',
      'Scalable template engine'
    ],
    longDescription: `Built a comprehensive document automation platform for the Belgian Federal Public Service Finance, revolutionizing how government documents are created and distributed.

The system features an intuitive drag-and-drop interface for creating document templates, a reusable component library for consistent formatting, and integration with backend services for dynamic data population. This platform significantly reduced the time required to create and distribute official documents while improving accuracy and consistency.`
  }
];

export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured).map(p => ({
  id: p.id,
  title: p.title,
  description: p.shortDescription,
  technologies: p.technologies.slice(0, 3).join(' • '),
  badge: p.id === 'numbr-accounting-system' ? 'Latest' : 'Featured'
}));

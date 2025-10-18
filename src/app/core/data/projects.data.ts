import {Project, ProjectCategory} from '@models/project.models';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {value: 'personal', label: 'Personal Projects'},
  {value: 'enterprise', label: 'Enterprise'}
];

export const PROJECTS: Project[] = [
  {
    id: 'numbr-accounting-system',
    title: 'NUMBR – Full Accounting SaaS',
    description:
      'End-to-end accounting SaaS built independently as a full-stack solo developer. Includes secure auth, ' +
      'real-time sync, and responsive dashboards for small businesses.' +
      ' Test credentials: test@gmail.com/Test123',
    shortDescription: 'Full-stack accounting SaaS with React, Firebase, and Node.js.',
    image: 'assets/images/projects/numbr-main.webp',
    technologies: ['React', 'TypeScript', 'Node.js', 'Firebase', 'Firestore', 'MUI', 'Redux', 'Vite', 'Vitest', 'Recharts', 'Zod'],
    category: 'personal',
    liveUrl: 'https://numbr-system.web.app/',
    featured: true,
    year: 2025,
    duration: 'Started April 2025 (ongoing)',
    role: 'Full-Stack Solo Developer',
    teamSize: 1,
    highlights: [
      'Built complete frontend, backend, and deployment pipeline',
      'Implemented secure authentication with Firebase Auth',
      'Real-time data sync with Firestore and Cloud Functions',
      'Comprehensive Vitest coverage for critical features',
      'Responsive dashboard optimized for business workflows'
    ],
    longDescription: `NUMBR is a complete accounting SaaS I built from scratch as a solo developer.
    It demonstrates my ability to design, develop, and deploy a production-grade system handling authentication,
    data synchronization, and user-friendly dashboards for small businesses.
    Built with React, TypeScript, and Firebase, it features Cloud Functions for backend logic and Firestore for
    real-time data handling. The focus was on clean architecture, reliable state management, and smooth UX across all devices.`,
    images: [
      'assets/images/projects/numbr-main.webp',
      'assets/images/projects/numbr-dashboard.webp',
      'assets/images/projects/numbr-dues.webp',
      'assets/images/projects/numbr-admin.webp'
    ],
    challenges: [
      'Designing scalable architecture as a solo developer',
      'Securing financial data in real time',
      'Maintaining data consistency across users',
      'Simplifying complex accounting logic for non-experts'
    ],
    solutions: [
      'Used Firebase ecosystem for rapid, secure cloud development',
      'Implemented strict Firestore security rules and role-based access',
      'Created modular form system to simplify workflows',
      'Applied Firestore transactions for real-time consistency'
    ],
    features: [
      'Real-time dashboard and analytics',
      'Transaction management and categorization',
      'Member and invoice management',
      'Secure authentication and backups',
      'Mobile and desktop responsive design'
    ]
  },
  {
    id: 'flight-booking-react',
    title: 'Flight Booking System',
    description:
      'Modern flight booking demo built with React featuring real-time search, multi-step booking, ' +
      'and responsive UI with Redux state management.',
    shortDescription: 'React-based flight booking with real-time search and filtering.',
    image: 'assets/images/projects/flight-main.webp',
    technologies: ['React', 'TypeScript', 'Redux', 'REST API', 'Zod', 'CSS3', 'Responsive Design'],
    category: 'personal',
    liveUrl: 'https://flight-booking-app-react.web.app/',
    githubUrl: 'https://github.com/Agerday/flight-booking-app',
    featured: true,
    year: 2025,
    duration: '1 week',
    role: 'Frontend Developer',
    teamSize: 1,
    highlights: [
      'Real-time flight search and filtering',
      'Complex state management with Redux',
      'Optimized rendering with virtualization',
      'Fully responsive layout across devices'
    ],
    longDescription: `A flight booking web app demonstrating advanced React state management, API integration
    and UI/UX design. Built to simulate live flight search and multi-step booking flows, with efficient Redux usage and form validation.`,
    images: [
      'assets/images/projects/flight-main.webp',
      'assets/images/projects/flight-results.webp',
      'assets/images/projects/flight-seats.webp',
      'assets/images/projects/flight-extras.webp',
      'assets/images/projects/flight-confirmation.webp'
    ],
    challenges: [
      'Managing complex app state across booking steps',
      'Handling real-time data updates efficiently',
      'Ensuring UX clarity across devices'
    ],
    solutions: [
      'Implemented predictable Redux store with middleware',
      'Optimized component rendering using memoization',
      'Applied clear visual hierarchy and input validation'
    ],
    features: [
      'Live search with filtering',
      'Multi-step booking wizard',
      'Real-time price comparison',
      'Booking history management',
      'Accessible and mobile-ready UI'
    ]
  },
  {
    id: 'angular-portfolio',
    title: 'Personal Portfolio Platform',
    description:
      'Angular 18-based portfolio showcasing experience, projects, and skills with modern UI/UX, SEO optimization, and smooth animations.',
    shortDescription: 'Modern Angular 18 portfolio with advanced features and clean design.',
    image: 'assets/images/projects/portfolio-main.webp',
    technologies: ['Angular 18', 'TypeScript', 'TailwindCSS', 'Signals', 'Standalone Components', 'Firebase', 'AOS'],
    category: 'personal',
    githubUrl: 'https://github.com/Agerday/App-Portfolio-Adrien-Gerday',
    featured: true,
    year: 2025,
    duration: '10 days',
    role: 'Frontend Developer',
    teamSize: 1,
    highlights: [
      'Built with latest Angular 18 features: signals, standalone components, and new control flow',
      'Full responsive design with TailwindCSS utility-first approach',
      'SEO-optimized with meta tags and structured data',
      'Smooth animations and transitions using AOS library',
      'Dark mode support with theme persistence'
    ],
    longDescription: `A modern portfolio platform showcasing professional experience, technical skills, and personal projects.
    Built entirely with Angular 18's latest features including signals for reactive state management, standalone components
    for better modularity, and the new control flow syntax (@if, @for) for cleaner templates.
    The design prioritizes user experience with smooth scroll animations, responsive layouts across all devices, and a
    clean interface that puts content first. Deployed on Firebase Hosting with automated CI/CD pipeline for seamless updates.`,
    challenges: [
      'Mastering Angular 18 signal-based reactivity model',
      'Designing a clean, professional UI that stands out',
      'Optimizing performance with lazy loading and image optimization',
      'Implementing SEO best practices for a single-page application'
    ],
    solutions: [
      'Leveraged signals and computed properties for efficient state management',
      'Created custom TailwindCSS theme with consistent design system',
      'Implemented route-based code splitting and image lazy loading',
      'Added SSR-ready meta tags and structured JSON-LD data'
    ],
    features: [
      'Dynamic project showcase with filtering and search',
      'Interactive resume and experience timeline',
      'Contact form with validation',
      'Dark/light theme toggle with persistence',
      'Smooth scroll animations and page transitions',
      'Fully responsive across mobile, tablet, and desktop',
      'SEO-optimized with meta tags and sitemap',
      'Firebase hosting with automatic deployments'
    ]
  },
  {
    id: 'tax-management-platform',
    title: 'FPS Finance – Multi-Client Tax Management Platform',
    description:
      'Led frontend modernization and migration to Angular 17, optimizing tax workflows for four different government clients.',
    shortDescription: 'Enterprise tax management modernization (Angular 17).',
    technologies: [
      'Angular 17',
      'RxJS',
      'TypeScript',
      'Angular Material',
      'i18n',
      'SCSS',
      'GitLab CI/CD'
    ],
    category: 'enterprise',
    featured: false,
    year: 2025,
    duration: 'Jan 2024 – Feb 2025',
    role: 'Front End Lead',
    teamSize: 12,
    highlights: [
      'Migrated entire system from Angular 8 to 17',
      'Built modular architecture for multi-client support',
      'Improved scalability and user satisfaction',
      'Enhanced UX with real-time feedback and validation'
    ],
    longDescription: `Led the modernization of FPS Finance’s tax platform, upgrading from Angular 8 to 17 while
     maintaining production stability. Introduced reusable dynamic steppers, improved validation UX, and streamlined
     multi-client workflow architecture.`
  },
  {
    id: 'data-visualization-platform',
    title: 'FPS Finance – Advanced Data Visualization Platform',
    description:
      'Developed a high-performance analytics system handling large datasets with real-time interactive charts and data tables.',
    shortDescription: 'Interactive analytics platform with real-time data and charts.',
    technologies: [
      'React',
      'Redux',
      'Java (Spring Boot)',
      'Material UI',
      'Chart.js',
      'REST API',
      'GitLab CI/CD'
    ],
    category: 'enterprise',
    featured: false,
    year: 2024,
    duration: 'Jan 2023 – Jan 2024',
    role: 'Front End Lead / Back End Lead',
    teamSize: 7,
    highlights: [
      'Built complete charting and analytics modules',
      'Enabled real-time data visualization and interaction',
      'Integrated backend Java logic for live calculations',
      'Completed major module solo under tight deadline'
    ],
    longDescription: `Designed and built an advanced data visualization platform for FPS Finance, supporting massive
    datasets and live analytics. Delivered fully interactive, real-time charting modules with zoom, annotations, and
    backend-driven data shaping.`
  },
  {
    id: 'document-factory',
    title: 'FPS Finance – Document Factory Platform',
    description:
      'Developed a modular document generation system enabling full digitalization of citizen workflows with real-time feedback.',
    shortDescription: 'Document automation and digital workflow platform.',
    technologies: [
      'React',
      'Redux',
      'Java (Spring Boot)',
      'PrimeReact',
      'Dynamic Grid Layout',
      'Drag & Drop',
      'Role-based Access',
      'GitLab CI/CD'
    ],
    category: 'enterprise',
    featured: false,
    year: 2023,
    duration: 'Aug 2020 – Jan 2023',
    role: 'Front End Lead',
    teamSize: 7,
    highlights: [
      'Digitalized entire document workflow for citizens',
      'Built smart drag-and-drop grid and reusable UI blocks',
      'Enabled cross-department collaboration with modular components',
      'Reduced paper usage drastically across departments'
    ],
    longDescription: `Developed a robust document automation system for FPS Finance, allowing internal teams and
    citizens to manage, generate, and respond to official documents online. Integrated dynamic grid layouts,
    role-based views, and flexible template systems for efficient collaboration and digital processing.`
  },
  {
    id: 'eu-commission-dynamic-forms',
    title: 'European Commission – Dynamic Form Platform',
    description:
      'Led frontend for multi-department form platform supporting conditional logic, multilingual support, and responsive design.',
    shortDescription: 'Dynamic multilingual form system for EU institutions.',
    technologies: ['Angular 8', 'RxJS', 'Material', 'SCSS', 'Responsive Design', 'i18n', 'GitLab CI/CD'],
    category: 'enterprise',
    featured: false,
    year: 2020,
    duration: 'Apr 2020 – Aug 2020',
    role: 'Front End Lead',
    teamSize: 4,
    highlights: [
      'Unified conditional logic across departments',
      'Improved UX and increased form completion rate',
      'Modular architecture for maintainability',
      'Added multilingual and accessibility support'
    ],
    longDescription: `Developed a dynamic form platform for the European Commission, managing dozens of
    department-specific variations within a unified codebase. Focused on modularity, multilingual support, and consistent UX across devices.`
  },
  {
    id: 'private-bank-processing-tool',
    title: 'Private Bank – Financial Data Processing Tool',
    description:
      'Developed a system to import and process massive XML datasets into dynamic tables, with real-time Excel export and optimization.',
    shortDescription: 'Processed and visualized large XML financial datasets with Excel export.',
    technologies: ['Angular 8', 'RxJS', 'Material', 'Java (Spring Boot)', 'Apache POI', 'XML', 'Excel', 'GitLab CI/CD'],
    category: 'enterprise',
    featured: false,
    year: 2020,
    duration: 'Jan 2020 – Apr 2020',
    role: 'Front End Lead',
    teamSize: 4,
    highlights: [
      'Optimized large XML data processing and display by 50%',
      'Built performant data tables for 1000+ rows',
      'Integrated Excel export with Apache POI',
      'Ensured responsive UI under heavy data loads'
    ],
    longDescription: `Built a financial data processing platform capable of handling large XML files and converting
    them into structured data tables. Enabled Excel exports and optimized frontend performance, cutting data
    processing time by more than half.`
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured).map(p => ({
  id: p.id,
  title: p.title,
  description: p.shortDescription,
  technologies: p.technologies.slice(0, 3).join(' • '),
  badge: p.id === 'numbr-accounting-system' ? 'Latest' : 'Featured'
}));

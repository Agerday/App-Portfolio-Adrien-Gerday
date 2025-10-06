import {Education, Experience, PersonalInfo, SkillCategory} from '@models/resume.models';
import {environment} from '../../../environment';

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Adrien Gerday',
  title: 'Senior Frontend Developer',
  summary: `Frontend engineer with 6 years of experience building scalable applications for finance,
  government, and SaaS using React and Angular. Specialized in TypeScript with expertise across
  the full cycle: modern UI, backend APIs, CI/CD, and production deployment.
  Proven record leading migrations, shipping data-heavy platforms, and delivering secure, user-friendly solutions.`,
  contact: {
    email: environment.social.email,
    linkedin: environment.social.linkedin,
    github: environment.social.github
  }
};

export const EXPERIENCE: Experience[] = [
  {
    position: 'Full-Stack Solo Developer – Full Accounting Application',
    company: 'Numbr (Self-Initiated Product)',
    duration: '02/2025 – Present',
    responsibilities: [
      'Built an end-to-end accounting SaaS application independently (frontend, backend, deployment).',
      'Developed a responsive React + TypeScript UI with secure authentication and real-time Firestore sync.',
      'Deployed via Firebase Hosting + Cloud Functions, optimized for small business dashboards.',
      'Implemented unit/integration testing with Vitest for reliability across critical features.'
    ]
  },
  {
    position: 'Front End Lead – Multi-Client Tax Management Platform',
    company: 'FPS Finance, Egov Select (Belgium)',
    duration: '01/2024 – 02/2025',
    responsibilities: [
      'Migrated platform from Angular 8 → 17, modernizing stack and eliminating legacy issues.',
      'Introduced modular architecture, cutting rollout time for new clients by 30%.',
      'Reduced support tickets through improved UX and real-time validation.',
      'Built a configurable form stepper for dynamic workflows across 4 systems.'
    ]
  },
  {
    position: 'Front End Lead (React) / Back End Lead (Java)',
    company: 'FPS Finance – Advanced Data Visualization Platform',
    duration: '01/2023 – 01/2024',
    responsibilities: [
      'Developed React-based analytics platform with real-time multi-country data visualization.',
      'Implemented dynamic Recharts visualizations (bubble, line, mixed) with custom interactivity.',
      'Handled 1M+ record datasets with high-performance rendering.',
      'Built backend logic in Java (Spring Boot) for live calculations.'
    ]
  },
  {
    position: 'Front End Lead (React), Backend Assist',
    company: 'FPS Finance – Document Factory Platform',
    duration: '08/2020 – 01/2023',
    responsibilities: [
      'Built a document automation system for the federal finance department.',
      'Enabled digital citizen workflows, replacing paper processes.',
      'Developed a drag-and-drop UI with reusable templates, reducing creation time.',
      'Collaborated across SPF teams and assisted backend with scalable template engine.'
    ]
  },
  {
    position: 'Frontend Lead, Backend Assist',
    company: 'Earlier Projects – European Commission & Private Bank',
    duration: '01/2020 – 08/2020',
    responsibilities: [
      'Developed enterprise-grade Angular forms and large-data tooling.',
      'Unified validation logic and implemented i18n-ready components.',
      'Optimized Excel and XML processing (50% faster performance).'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: 'Full-Stack Developer & Agile Training',
    school: 'Switchfully',
    location: 'Belgium',
    duration: '01/2020 – 08/2020',
    description: 'Intensive bootcamp focused on Angular, Java (Spring Boot), testing, and agile practices.'
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: 'Frontend',
    items: ['React', 'TypeScript', 'Redux', 'Zustand', 'MUI', 'Vite', 'Vitest', 'Jest']
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Java (Spring Boot)', 'REST', 'Firebase', 'PostgreSQL']
  },
  {
    name: 'Tools',
    items: ['GitLab CI/CD', 'Webpack', 'ESLint', 'Agile (Scrum/Kanban)']
  },
  {
    name: 'Other',
    items: ['Angular (v8–17)', 'RxJS', 'Zod', 'i18n', 'Excel & Chart customization']
  }
];

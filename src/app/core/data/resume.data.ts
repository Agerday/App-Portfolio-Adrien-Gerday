import {Education, Experience, PersonalInfo, SkillCategory} from '@models/resume.models';

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Adrien Gerday',
  title: 'Senior Frontend Developer',
  summary: `Passionate Senior Frontend Developer with 6+ years of experience building scalable,
    high-performance web applications. Expert in Angular and React with a strong foundation in full-stack development.
    Proven track record leading frontend teams and delivering enterprise-grade solutions for government and financial institutions.`,
  contact: {
    email: 'adrien.gerday@gmail.com',
    linkedin: 'https://www.linkedin.com/in/adriengerday/',
    github: 'https://github.com/Agerday'
  }
};

export const EXPERIENCE: Experience[] = [
  {
    position: 'Full-Stack Solo Developer',
    company: 'NUMBR – Accounting SaaS',
    duration: '2025 – Present',
    responsibilities: [
      'Built complete accounting application from scratch using React, TypeScript, and Firebase.',
      'Designed responsive UI with Material-UI, implemented secure authentication and real-time Firestore sync.',
      'Developed backend APIs with Node.js and Cloud Functions.',
      'Deployed production application on Firebase Hosting with CI/CD pipeline.'
    ]
  },
  {
    position: 'Front End Lead',
    company: 'FPS Finance – Multi-Client Tax Management Platform',
    duration: '2024',
    responsibilities: [
      'Led frontend modernization for four tax clients using Angular 17.',
      'Refactored legacy code into modular architecture with reusable components.',
      'Enhanced UX with real-time feedback and improved error handling.',
      'Optimized CI/CD pipelines and improved build performance by 40%.'
    ]
  },
  {
    position: 'Front End Lead (React) & Back End Lead (Java)',
    company: 'FPS Finance – Data Visualization Platform',
    duration: '2023',
    responsibilities: [
      'Delivered advanced analytics dashboards with React, Redux, and Chart.js.',
      'Implemented interactive visualizations with live calculations.',
      'Optimized rendering for large datasets (1M+ records).',
      'Built backend logic in Java (Spring Boot) for real-time calculations.'
    ]
  },
  {
    position: 'Front End Lead',
    company: 'FPS Finance – Document Factory Platform',
    duration: '08/2020 – 01/2023',
    responsibilities: [
      'Built document automation system for federal finance department.',
      'Developed drag-and-drop UI with reusable templates using React.',
      'Enabled digital citizen workflows, replacing paper processes.',
      'Collaborated across teams and assisted backend with scalable template engine.'
    ]
  },
  {
    position: 'Frontend Lead',
    company: 'European Commission & Private Bank – Earlier Projects',
    duration: '01/2020 – 08/2020',
    responsibilities: [
      'Developed enterprise-grade Angular forms for EU institutions.',
      'Built XML/Excel data processing tools with 50% performance improvement.',
      'Implemented multilingual, responsive form systems.',
      'Unified validation logic and enhanced user feedback.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: 'Bachelor in Computer Science',
    school: 'EPFC (École Pratique des Hautes Études Commerciales)',
    location: 'Brussels, Belgium',
    duration: '2016 – 2019',
    description: 'Comprehensive degree program covering software development, algorithms, data structures, databases, networking, and system architecture.'
  },
  {
    degree: 'Full-Stack Developer & Agile Training',
    school: 'Switchfully',
    location: 'Belgium',
    duration: 'Sep 2019 - Dec 2019',
    description: 'Intensive bootcamp (4 months) focused on Angular, Java (Spring Boot), TypeScript, testing, and agile practices.'
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: 'Frontend',
    items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Redux', 'RxJS', 'Material-UI', 'Tailwind CSS']
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Java', 'Spring Boot', 'REST APIs', 'Firebase', 'PostgreSQL']
  },
  {
    name: 'Tools & Methods',
    items: ['Git', 'GitLab CI/CD', 'Webpack', 'Vite', 'Jest', 'Vitest', 'Agile/Scrum']
  },
  {
    name: 'Other',
    items: ['Responsive Design', 'Performance Optimization', 'Testing', 'i18n', 'Accessibility']
  }
];

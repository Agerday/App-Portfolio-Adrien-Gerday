export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerUrl?: string;
  issueDate: string;
  description: string;
  skills: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'epfc-bachelor-cs',
    name: 'Bachelor in Computer Science',
    issuer: 'EPFC',
    issuerUrl: 'https://www.epfc.eu/',
    issueDate: '2019-06-30',
    description:
      'Comprehensive three-year bachelor\'s degree program in Computer Science covering software development, ' +
      'algorithms, data structures, databases, networking, and system architecture. Built a strong foundation ' +
      'in computer science fundamentals and software engineering principles.',
    skills: [
      'Software Development',
      'Algorithms & Data Structures',
      'Object-Oriented Programming',
      'Databases',
      'Web Development',
      'System Architecture',
      'Software Engineering'
    ]
  },
  {
    id: 'switchfully-fullstack',
    name: 'Full-Stack Developer & Agile Training',
    issuer: 'Switchfully',
    issuerUrl: 'https://www.switchfully.com/',
    issueDate: '2019-12-20',
    description:
      'Intensive professional bootcamp (4 months) focused on modern full-stack development with Angular, Java (Spring Boot), ' +
      'TypeScript, testing practices, and agile methodologies. Hands-on training with real-world projects and ' +
      'industry best practices, immediately applied in professional enterprise environments.',
    skills: [
      'Angular',
      'Java',
      'Spring Boot',
      'TypeScript',
      'Unit Testing',
      'Integration Testing',
      'Agile/Scrum',
      'REST APIs'
    ]
  }
];

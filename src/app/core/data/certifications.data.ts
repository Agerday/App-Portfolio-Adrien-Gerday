export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerUrl?: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  description: string;
  skills: string[];
}


export const CERTIFICATIONS: Certification[] = [
  {
    id: 'switchfully-fullstack',
    name: 'Full-Stack Developer & Agile Training',
    issuer: 'Switchfully',
    issuerUrl: 'https://www.switchfully.com/',
    issueDate: '2019-12-20',
    verificationUrl: '/assets/documents/Switchfully-Certificate.pdf',
    description:
      'Intensive bootcamp focused on Angular, Java (Spring Boot), testing, and agile practices. ' +
      'Successfully completed training in modern full-stack development with hands-on project experience.',
    skills: ['Angular', 'Java', 'Spring Boot', 'TypeScript', 'Testing', 'Agile', 'Scrum']
  }
];


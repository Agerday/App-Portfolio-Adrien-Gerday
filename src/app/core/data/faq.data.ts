import { FAQ } from '@models/faq.models';

export const FAQS: readonly FAQ[] = [
  {
    id: 'availability',
    question: 'Are you currently available for work?',
    answer: 'Yes! I\'m actively seeking a permanent frontend role and ready to start immediately. I\'m fully committed ' +
      'to building a long-term career with the right company.',
    category: 'availability'
  },
  {
    id: 'location',
    question: 'Where are you based and open to relocation?',
    answer: 'I\'m currently in Asia and fully open to relocation anywhere in the APAC region for the right opportunity.' +
      ' I made the bold decision to leave my home country and move to Asia specifically to build a new career here,' +
      'I\'m committed for the long term.',
    category: 'availability'
  },
  {
    id: 'visa',
    question: 'Do you require visa sponsorship?',
    answer: 'Yes, I require visa sponsorship, and I\'m open to relocating to any country in the APAC region. ' +
      'I\'ve already made the leap across continents to pursue opportunities here, visa logistics won\'t slow me down.',
    category: 'general'
  },
  {
    id: 'motivation',
    question: 'What drives you? Why Asia?',
    answer: 'I left everything familiar behind in Europe to start fresh in Asia because I wanted more than comfort,' +
      ' I wanted challenge, growth, and impact. I\'m here to build something meaningful, contribute to innovative teams,' +
      ' and prove myself in one of the world\'s most dynamic tech ecosystems. I didn\'t come this far to play it safe.',
    category: 'general'
  },
  {
    id: 'remote',
    question: 'Do you work remotely?',
    answer: 'Absolutely! I have extensive experience with remote work and thrive in distributed teams. ' +
      'I\'ve been working remotely from South Korea, successfully managing a -8 hour time difference with ' +
      'European clients. I\'m equally comfortable with remote, hybrid, or office-based arrangements.',
    category: 'work'
  },
  {
    id: 'work-type',
    question: 'Do you accept contract/freelance work?',
    answer: 'I\'m primarily focused on permanent positions where I can grow with a company long-term.' +
      ' However, I\'m open to discussing substantial contracts (6+ months) that could lead to permanent opportunities.',
    category: 'work'
  },
  {
    id: 'tech-stack',
    question: 'What\'s your preferred tech stack?',
    answer: 'React and Angular for frontend, with TypeScript as the foundation. I\'m also experienced with Node.js' +
      ' and Java Spring Boot for full-stack projects. But honestly, I adapt fast, give me a new stack and I\'ll master it.',
    category: 'technical'
  },
  {
    id: 'start-date',
    question: 'How soon can you start?',
    answer: 'I can start tomorrow, first thing. No notice period, no delays. I\'m ready to contribute immediately.',
    category: 'availability'
  },
  {
    id: 'team-size',
    question: 'What size teams do you work best with?',
    answer: 'I thrive anywhere, from solo developer building entire applications (like my NUMBR accounting system) ' +
      'to leading small teams (3-8 developers) or contributing to large enterprise teams (15+ members). ' +
      'I adapt to what the mission needs.',
    category: 'work'
  },
  {
    id: 'commitment',
    question: 'How committed are you to staying in Asia?',
    answer: 'Fully committed. I didn\'t leave everything I knew behind to job-hop. I came to Asia to build a career ' +
      'I\'m proud of, join a team that challenges me, and grow with a company for the long haul. This isn\'t ' +
      'Plan B. This is THE plan.',
    category: 'general'
  }
] as const;

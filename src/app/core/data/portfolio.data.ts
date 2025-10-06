import {Feature, Stat} from '@models/portfolio.models';

export const STATS: Stat[] = [
  {value: 6, label: 'Years Experience', suffix: '+'},
  {value: 7, label: 'Projects Delivered', suffix: ''},
  {value: 289, label: 'GitHub Commits (Last 6 months)', suffix: '+'}
];

export const FEATURES: Feature[] = [
  {
    icon: '🏗️',
    title: 'Scalable Architecture',
    description: 'Designing robust, maintainable systems that grow seamlessly with your business needs.',
    link: '/projects'
  },
  {
    icon: '🎨',
    title: 'Pixel-Perfect UI',
    description: 'Translating designs into responsive, accessible interfaces with obsessive attention to detail.',
    link: '/projects'
  },
  {
    icon: '🧭',
    title: 'Agile Methodologies',
    description: 'Adapting quickly through iterative development, collaboration, and continuous improvement.',
    link: '/skills'
  },
  {
    icon: '😊',
    title: 'User-Friendly Design',
    description: 'Creating intuitive experiences that make complex interactions simple and enjoyable.',
    link: '/projects'
  },
  {
    icon: '👥',
    title: 'Technical Leadership',
    description: 'Mentoring teams, establishing best practices, and driving engineering excellence.',
    link: '/experience'
  },
  {
    icon: '📈',
    title: 'Business Impact',
    description: 'Delivering solutions that directly improve user engagement and business metrics.',
    link: '/testimonials'
  }
];

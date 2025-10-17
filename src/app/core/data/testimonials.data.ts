import {Testimonial} from '@models/testimonials.models';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Moussa Diallo',
    position: 'Business Analyst and Associate',
    company: 'FPS Finance (Belgium)',
    companyUrl: 'https://finance.belgium.be/en',
    quote: 'I had the chance to work with Adrien on the IRCT project in 2023 at FPS Finances ' +
      ', an advanced data visualization platform that demanded precision and scalability. His technical depth and ' +
      'problem-solving mindset made a real difference. In April 2025, we teamed up again to build NUMBR from scratch, ' +
      'and I was impressed by how quickly he turned complex ideas into a working product. Adrien brings structure, ' +
      'speed, and results every single time.',
    image: 'assets/images/colleagues/MD.jpg',
    rating: 5,
    date: '2025-08-15',
    projectId: ['data-visualization-platform', 'NUMBR'],
    tags: ['React', 'Java', 'Node.js', 'Efficiency'],
    featured: true
  },
  {
    id: '2',
    name: 'Jean-Yves Petit',
    position: 'Product & Service Manager',
    company: 'FPS Finance (Belgium)',
    companyUrl: 'https://finance.belgium.be/en',
    quote: 'Exceptional technical expertise combined with great communication skills. He scared me back then when' +
      ' he asked to refactor a massive legacy module to make it fully generic and reusable but I trusted him' +
      ' and he reworked everything in just one week. That decision ended up saving us countless hours on future ' +
      'implementations. A visionary. Adrien constantly challenged the business by proposing smarter functionalities to improve ' +
      'user experience and avoid the endless loop of filling forms and clicking send until there are no errors. ' +
      'I’ll truly miss him and wish him the best of luck in his new adventure in Asia.',
    rating: 5,
    date: '2025-01-25',
    projectId: ['tax-management-platform', 'data-visualization-platform'],
    tags: ['React', 'Java', 'User Experience', 'Performance'],
    featured: true
  },
  {
    id: '3',
    name: 'Kevin Gillet',
    position: 'Frontend Developer & Tester',
    company: 'Egov Select',
    companyUrl: 'https://egovselect.be/',
    linkedinUrl: 'https://www.linkedin.com/in/kevin-gillet-a67249175/',
    quote: 'I met Adrien during the Switchfully training back in 2019 and we’ve been learning, building, and ' +
      'laughing together. From our first projects to all the challenges that came after, he’s always ' +
      'been the guy who brings smart ideas, structure, and a good mood to the team. Adrien has this rare mix of ' +
      'technical skill and teamwork that makes everything easier and more fun. Working with him never felt like work,' +
      ' it felt like building cool stuff with a friend.',
    rating: 5,
    date: '2025-08-01',
    image: 'assets/images/colleagues/KG.jpg',
    tags: ['Frontend', 'Testing', 'Collaboration'],
    featured: false
  },
  {
    id: '4',
    name: 'Michèle Van Campenhout',
    position: 'Project Manager',
    company: 'Egov Select',
    companyUrl: 'https://egovselect.be/',
    linkedinUrl: 'https://www.linkedin.com/in/mich%C3%A8le-van-campenhout-52646aa2/',
    quote: 'Adrien has an exceptional eye for detail and a real passion for user experience. He anticipated user needs, ' +
      'simplified complex flows, and made every interaction feel effortless. His work made a real impact on both our ' +
      'product and our team. It’s been a real pleasure having him on board.',
    rating: 5,
    date: '2025-02-02',
    image: 'assets/images/colleagues/MVC.jpg',
    projectId: ['eu-commission-dynamic-forms'],
    tags: ['User Experience', 'Angular', 'Attention to details'],
    featured: false
  },
  {
    id: '5',
    name: 'Jim Ocket',
    position: 'Backend Developer',
    company: 'Egov Select',
    companyUrl: 'https://egovselect.be/',
    linkedinUrl: 'https://www.linkedin.com/in/jim-ocket/',
    quote: 'Professional, reliable, and incredibly efficient. We started our journey during the Switchfully training ' +
      'and it has been a blast! From our first projects to the most recent ones, ' +
      'collaboration with him has always been seamless. He has a real sense for clean architecture and knows how to ' +
      'make front-end and back-end communicate effortlessly. Even after moving to different teams, we kept in touch, ' +
      'always exchanging ideas and helping each other grow. Working with him has been one of the best professional ' +
      'experiences I’ve had.',
    rating: 5,
    date: '2025-02-09',
    image: 'assets/images/colleagues/JO.jpg',
    projectId: ['data-visualization-platform', 'private-bank-processing-tool'],
    tags: ['Angular', 'Java'],
    featured: false
  }
];

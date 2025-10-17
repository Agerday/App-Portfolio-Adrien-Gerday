export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  companyUrl?: string;
  linkedinUrl?: string;
  image?: string;
  quote: string;
  rating: number;
  date: string;
  projectId?: string[];
  tags: string[];
  featured: boolean;
}

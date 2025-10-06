export interface Experience {
  position: string;
  company: string;
  location?: string;
  duration: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  duration: string;
  description?: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

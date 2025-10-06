export interface Timeline {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'achievement';
}

export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category?: 'availability' | 'work' | 'technical' | 'general';
}

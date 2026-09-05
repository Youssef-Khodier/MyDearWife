export type ExperienceStage = 
  | 'intro'
  | 'timeline'
  | 'birthday-reveal'
  | 'birthday'
  | 'final-message';

export interface TimelineImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface MemorySubSection {
  id?: string;
  sectionName: string;
  title: string;
  description: string;
  images: TimelineImage[];
  caption?: string;
  location?: string;
  quote?: string;
  quoteSource?: string;
}

export interface TimelineMemory {
  id: string;
  year: number | string;
  date: string;
  title: string;
  description: string;
  images: TimelineImage[];
  caption?: string;
  location?: string;
  quote?: string;
  quoteSource?: string;
  type?: 'memory' | 'message' | 'milestone';
  subSections?: MemorySubSection[];
}

export interface BirthdayRecipient {
  name: string;
  nickname?: string;
  birthdayDate: string;
  ageCelebration?: string;
  openingQuote: string;
}

export interface FinaleData {
  transitionText1: string;
  transitionText2: string;
  cakeIntroText: string;
  wishPromptText: string;
  wishCelebrationHeadline: string;
  wishCelebrationSubline: string;
  letterTitle: string;
  letterGreeting: string;
  letterParagraphs: string[];
  letterClosing: string;
  authorName: string;
}

export interface BirthdayData {
  recipient: BirthdayRecipient;
  timeline: TimelineMemory[];
  finale: FinaleData;
}

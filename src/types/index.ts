export type ChapterId = 
  | 'intro'
  | 'room'
  | 'hub'
  | 'memories'
  | 'messages'
  | 'future'
  | 'interlude'
  | 'cake'
  | 'final-letter';

export interface RoomObject {
  id: string;
  name: string;
  category: string;
  iconName: string;
  position: { x: number; y: number }; // Percentage coordinates in room scene
  glowColor?: string;
  storySnippet: {
    title: string;
    subtitle: string;
    text: string;
    actionPrompt?: string;
    isKeyToNextChapter?: boolean;
  };
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  caption: string;
  story: string;
  quote?: string;
  moodTag: string;
}

export interface MessageItem {
  id: string;
  category: 'appreciation' | 'favorite-memories' | 'what-makes-me-smile' | 'admiration' | 'little-things' | 'hopes';
  categoryLabel: string;
  title: string;
  content: string[];
  signature?: string;
}

export interface FutureMoment {
  id: string;
  tag: string;
  title: string;
  description: string;
  promise: string;
  symbol: string;
  bgGradient: string;
}

export interface BirthdayData {
  recipient: {
    name: string;
    nickname?: string;
    birthdayDate: string;
    ageCelebration?: string;
    openingQuote: string;
    roomPrompt: string;
  };
  roomObjects: RoomObject[];
  memories: MemoryItem[];
  messages: MessageItem[];
  futureMoments: FutureMoment[];
  finale: {
    cakeIntroText: string;
    wishPromptText: string;
    wishCelebrationHeadline: string;
    wishCelebrationSubline: string;
    letterTitle: string;
    letterGreeting: string;
    letterParagraphs: string[];
    letterClosing: string;
    authorName: string;
  };
}

export interface Word {
  id: string;
  word: string;
  pronunciation: {
    romaji: string;
    katakana: string;
  };
  meaning: string;
  example: string;
  bookmarked?: boolean;
}

export interface WordBankState {
  words: Word[];
  currentIndex: number;
  currentWord: Word | null;
  bookmarkMode: boolean;
}

export interface ThemeState {
  theme: 'light' | 'dark';
}

export interface TTSState {
  isSupported: boolean;
  isPlaying: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
}

export type Theme = 'light' | 'dark';

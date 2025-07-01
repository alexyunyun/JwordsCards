import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      getSetting: (key: string) => Promise<any>;
      setSetting: (key: string, value: any) => Promise<boolean>;
      getBookmark: (wordId: string) => Promise<boolean>;
      setBookmark: (wordId: string, isBookmarked: boolean) => Promise<boolean>;
      getAllBookmarks: () => Promise<string[]>;
      setWindowOpacity: (opacity: number) => Promise<boolean>;
      getWindowOpacity: () => Promise<number>;
    };
  }
}

export {};

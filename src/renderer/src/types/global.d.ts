declare global {
  interface Window {
    api: {
      getSetting: (key: string) => Promise<any>;
      setSetting: (key: string, value: any) => Promise<boolean>;
      getBookmark: (wordId: string) => Promise<boolean>;
      setBookmark: (wordId: string, isBookmarked: boolean) => Promise<boolean>;
      getAllBookmarks: () => Promise<string[]>;
    };
  }
}

export {};

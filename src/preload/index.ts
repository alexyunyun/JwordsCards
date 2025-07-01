import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  // Settings
  getSetting: (key: string) => ipcRenderer.invoke('get-setting', key),
  setSetting: (key: string, value: any) =>
    ipcRenderer.invoke('set-setting', key, value),

  // Bookmarks
  getBookmark: (wordId: string) => ipcRenderer.invoke('get-bookmark', wordId),
  setBookmark: (wordId: string, isBookmarked: boolean) =>
    ipcRenderer.invoke('set-bookmark', wordId, isBookmarked),
  getAllBookmarks: () => ipcRenderer.invoke('get-all-bookmarks'),

  // Window opacity
  setWindowOpacity: (opacity: number) =>
    ipcRenderer.invoke('set-window-opacity', opacity),
  getWindowOpacity: () => ipcRenderer.invoke('get-window-opacity'),

  // Word position memory
  getWordPosition: () => ipcRenderer.invoke('get-word-position'),
  setWordPosition: (position: { currentIndex: number; bookmarkMode: boolean }) =>
    ipcRenderer.invoke('set-word-position', position),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}

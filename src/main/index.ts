import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import Store from 'electron-store';
import icon from '../../resources/icon.png?asset';

const store = new Store();

function createWindow(): void {
  // 获取保存的窗口位置，默认右下角
  const savedBounds = store.get('windowBounds', {
    width: 600,
    height: 320,
    x: undefined,
    y: undefined,
  }) as { width: number; height: number; x?: number; y?: number };

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: savedBounds.width,
    height: savedBounds.height,
    x: savedBounds.x,
    y: savedBounds.y,
    show: false,
    frame: false, // 无边框窗口
    alwaysOnTop: true, // 始终置顶
    resizable: false,
    transparent: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 如果没有保存的位置，设置到右下角
  if (savedBounds.x === undefined || savedBounds.y === undefined) {
    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth, height: screenHeight } =
      primaryDisplay.workAreaSize;

    mainWindow.setPosition(
      screenWidth - savedBounds.width - 20,
      screenHeight - savedBounds.height - 20,
    );
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // 保存窗口位置
  mainWindow.on('moved', () => {
    const bounds = mainWindow.getBounds();
    store.set('windowBounds', bounds);
  });

  mainWindow.on('resized', () => {
    const bounds = mainWindow.getBounds();
    store.set('windowBounds', bounds);
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.jwordcards.app');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC handlers
  ipcMain.handle('get-setting', (_, key: string) => {
    return store.get(key);
  });

  ipcMain.handle('set-setting', (_, key: string, value: any) => {
    store.set(key, value);
    return true;
  });

  ipcMain.handle('get-bookmark', (_, wordId: string) => {
    const bookmarks = store.get('bookmarks', []) as string[];
    return bookmarks.includes(wordId);
  });

  ipcMain.handle('set-bookmark', (_, wordId: string, isBookmarked: boolean) => {
    const bookmarks = store.get('bookmarks', []) as string[];
    if (isBookmarked && !bookmarks.includes(wordId)) {
      bookmarks.push(wordId);
    } else if (!isBookmarked && bookmarks.includes(wordId)) {
      const index = bookmarks.indexOf(wordId);
      bookmarks.splice(index, 1);
    }
    store.set('bookmarks', bookmarks);
    return true;
  });

  ipcMain.handle('get-all-bookmarks', () => {
    return store.get('bookmarks', []) as string[];
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s main process
// code. You can also put them in separate files and require them here.

import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, ipcMain, screen, shell } from 'electron';
import Store from 'electron-store';
import { join } from 'path';
import icon from '../../resources/icon.png?asset';
const iconMac = join(__dirname, '../../resources/icon.icns');

const store = new Store();
let mainWindow: BrowserWindow | null = null;

// 设置应用名称（必须在app.whenReady()之前设置）
if (process.platform === 'darwin') {
  app.setName('JWordCards');
}

function createWindow(): void {
  // 获取保存的窗口尺寸，如果没有则使用默认值
  const savedBounds = store.get('windowBounds', {
    width: 360,
    height: 220,
    x: undefined,
    y: undefined,
  }) as { width: number; height: number; x?: number; y?: number };

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: savedBounds.width,
    height: savedBounds.height,
    minWidth: 280, // 最小宽度，确保内容可读性
    minHeight: 180, // 最小高度，确保控制栏可见
    maxWidth: 800, // 最大宽度，避免过度拉伸
    maxHeight: 600, // 最大高度，保持合理比例
    x: savedBounds.x,
    y: savedBounds.y,
    show: false,
    titleBarStyle:
      process.platform === 'darwin' ? 'customButtonsOnHover' : 'default', // macOS悬停时显示按钮
    alwaysOnTop: true, // 始终置顶
    resizable: true, // 启用窗口大小调整
    transparent: true, // 保持透明窗口
    backgroundColor: '#00000000', // 设置透明背景色
    autoHideMenuBar: true,
    icon: process.platform === 'darwin' ? iconMac : icon, // 根据平台使用不同图标
    title: 'JWordCards', // 设置应用标题
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 如果没有保存的位置，设置到右下角
  if (savedBounds.x === undefined || savedBounds.y === undefined) {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth, height: screenHeight } =
      primaryDisplay.workAreaSize;

    mainWindow.setPosition(
      screenWidth - savedBounds.width - 20,
      screenHeight - savedBounds.height - 20,
    );
  }

  mainWindow.on('ready-to-show', () => {
    // 透明度完全由CSS背景层控制，不设置窗口透明度
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show();
    }
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // 保存窗口位置
  mainWindow.on('moved', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      const bounds = mainWindow.getBounds();
      store.set('windowBounds', bounds);
    }
  });

  mainWindow.on('resized', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      const bounds = mainWindow.getBounds();
      store.set('windowBounds', bounds);
    }
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

  // 设置应用详细信息（macOS）
  if (process.platform === 'darwin') {
    app.setAboutPanelOptions({
      applicationName: 'JWordCards',
      applicationVersion: '1.0.0',
      copyright: 'Copyright © 2024 JWordCards',
      credits: '日语单词学习应用',
    });
  }

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

  // 单词位置记忆功能
  ipcMain.handle('get-word-position', () => {
    return store.get('wordPosition', { currentIndex: 0, bookmarkMode: false });
  });

  ipcMain.handle(
    'set-word-position',
    (_, position: { currentIndex: number; bookmarkMode: boolean }) => {
      store.set('wordPosition', position);
      return true;
    },
  );

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

/* eslint-disable import/prefer-default-export */
const { resolve, join } = require('path');
const process = require('process');
const {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Menu,
} = require('electron');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    title: 'Rabet',
    width: 1118,
    height: 830,
    center: true,
    minWidth: 600,
    minHeight: 600,
    icon: join(__dirname, '../desktop-logo/png/rabet128r.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: `${resolve(__dirname, 'preload.js')}`,
    },
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.loadURL(`file://${resolve(__dirname, 'popup.html')}`);

  win.on('before-quit', (event) => {
    event.preventDefault();
  });
};

app.on('ready', createWindow);

app.on('close', (event) => {
  event.preventDefault();
  app.quit();
});

app.on('window-all-closed', (e) => {
  e.preventDefault();

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('user-data', (event) => {
  const path = app.getPath('userData');
  const storageFile = resolve(path, 'storage.json');

  event.returnValue = storageFile;
});

const template = [
  {
    label: 'Application',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:',
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:',
      },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:',
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:',
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:',
      },
    ],
  },
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));

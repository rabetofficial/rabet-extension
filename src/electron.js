const { join } = require('path');
const process = require('process');
const { app, BrowserWindow, shell } = require('electron');

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
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.loadFile('dist/popup.html');

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

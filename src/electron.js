const { join } = require('path');
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
    icon: join(__dirname, '../desktop-logo/png/rabet128.png'),
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.loadFile('dist/popup.html');

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

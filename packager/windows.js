const electronInstaller = require('electron-winstaller');

const resultPromise = electronInstaller.createWindowsInstaller({
  exe: 'Rabet.exe',
  authors: 'Rabet',
  outputDirectory: './dist/installer',
  appDirectory: './dist/rabet-win32-x64',
});

resultPromise.then(
  () => console.log('Successful'),
  (e) => console.log(`Error: ${e.message}`),
);

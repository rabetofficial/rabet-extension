import 'babel-polyfill';
import io from 'socket.io-client';

const socket = io.connect(`http://localhost:6813/extension`);

global.browser.downloads.onCreated.addListener(async (download) => {
  const setting = await global.browser.storage.local.get();
  if (setting.status) {
    await global.browser.downloads.cancel(download.id);
    
    socket.emit('download', download.url);
  }
});

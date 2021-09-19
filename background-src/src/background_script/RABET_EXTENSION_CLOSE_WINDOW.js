import WindowManager from '../helpers/Window';

export default (message, sender, sendResponse, sendResponseCollection, window) => {
  if (window && window.id) {
    WindowManager.remove(window.id);

    sendResponse({ ok: true, message: 'window-closed' });
  } else {
    sendResponse({ ok: false, message: 'no-window-to-be-closed' });
  }
};

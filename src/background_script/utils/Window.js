import config from '../../config';
import windowOptions from './windowOptions';

class WindowManager {
  static create(screenX, screenY, outerWidth) {
    return new Promise((resolve) => {
      chrome.windows.create(windowOptions({ screenX, screenY, outerWidth }), (windowResponse) => {
        this.removeAfter30s(windowResponse.id);

        resolve(windowResponse);
      });
    });
  }

  static remove(id) {
    chrome.windows.remove(id);
  }

  static removeAfter30s(id) {
    setTimeout(() => {
      this.remove(id);
    }, config.WINDOW_TIMEOUT_SECONDS * 1000);
  }
}

export default WindowManager;

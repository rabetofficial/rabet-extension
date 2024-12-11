import { ISend } from '../types';
import WindowManager from '../utils/WindowManager';
import { R_NO_WINDOW_TO_CLOSE, R_WINDOW_CLOSED } from '../../common/responses';

const closeWindow = (send: ISend, window: chrome.windows.Window) => {
  if (window && window.id) {
    WindowManager.remove(window.id);

    send(R_WINDOW_CLOSED);
  } else {
    send(R_NO_WINDOW_TO_CLOSE);
  }
};

export default closeWindow;

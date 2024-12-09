import sendResponseFactory from './utils/sendResponseFactory';

import RABET_EXTENSION_SIGN from './RABET_EXTENSION_SIGN';
import RABET_EXTENSION_LOGIN from './RABET_EXTENSION_LOGIN';
import RABET_EXTENSION_CONNECT from './RABET_EXTENSION_CONNECT';
import RABET_EXTENSION_DISCONNECT from './RABET_EXTENSION_DISCONNECT';
import RABET_EXTENSION_IS_UNLOCKED from './RABET_EXTENSION_IS_UNLOCKED';
import RABET_EXTENSION_CLOSE_WINDOW from './RABET_EXTENSION_CLOSE_WINDOW';
import RABET_EXTENSION_LOGIN_TO_SIGN from './RABET_EXTENSION_LOGIN_TO_SIGN';
import RABET_EXTENSION_SIGN_XDR_RESPONSE from './RABET_EXTENSION_SIGN_XDR_RESPONSE';
import RABET_EXTENSION_CONTACT_REQUEST_RESPONSE from './RABET_EXTENSION_CONTACT_REQUEST_RESPONSE';

let window;
let mainWindow;

const sendResponseCollection = {};

chrome.runtime.onMessage.addListener((message, sender, send) => {
  const sendResponse = sendResponseFactory(send);

  if (message.detail && message.detail.href) {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {
        [mainWindow] = tabs;
      },
    );
  }

  if (message.type === 'RABET_EXTENSION_CONNECT') {
    RABET_EXTENSION_CONNECT(
      message,
      sender,
      sendResponse,
      sendResponseCollection,
    ).then((newWindow) => {
      window = newWindow;
    });
  } else if (message.type === 'RABET_EXTENSION_LOGIN') {
    RABET_EXTENSION_LOGIN(
      message,
      sender,
      sendResponse,
      sendResponseCollection,
      window,
    );
  } else if (message.type === 'RABET_EXTENSION_LOGIN_TO_SIGN') {
    RABET_EXTENSION_LOGIN_TO_SIGN(
      message,
      sender,
      sendResponse,
      sendResponseCollection,
      window,
    );
  } else if (
    message.type === 'RABET_EXTENSION_CONTACT_REQUEST_RESPONSE'
  ) {
    RABET_EXTENSION_CONTACT_REQUEST_RESPONSE(
      message,
      sender,
      sendResponse,
      sendResponseCollection,
      window,
    );
  } else if (message.type === 'RABET_EXTENSION_SIGN') {
    RABET_EXTENSION_SIGN(
      message,
      sender,
      sendResponse,
      sendResponseCollection,
    ).then((newWindow) => {
      window = newWindow;
    });
  } else if (message.type === 'RABET_EXTENSION_SIGN_XDR_RESPONSE') {
    RABET_EXTENSION_SIGN_XDR_RESPONSE(
      message,
      sender,
      sendResponse,
      sendResponseCollection,
      window,
    );
  } else if (message.type === 'RABET_EXTENSION_CLOSE_WINDOW') {
    RABET_EXTENSION_CLOSE_WINDOW(
      message,
      sender,
      sendResponse,
      sendResponseCollection,
      window,
    );
  } else if (message.type === 'RABET_EXTENSION_DISCONNECT') {
    RABET_EXTENSION_DISCONNECT(
      message,
      sender,
      sendResponse,
      sendResponseCollection,
    );
  } else if (message.type === 'RABET_EXTENSION_IS_UNLOCKED') {
    RABET_EXTENSION_IS_UNLOCKED(message, sender, sendResponse);
  }

  chrome.windows.onRemoved.addListener((wIndex) => {
    if (wIndex === window.id && window && window.id) {
      setTimeout(() => {
        sendResponse({ ok: false, message: 'user-rejected' });
      }, 200);

      window = null;
    }
  });

  return true;
});

chrome.tabs.onRemoved.addListener((wIndex) => {
  if (mainWindow && mainWindow.id === wIndex && window && window.id) {
    chrome.windows.remove(window.id);
  }
});

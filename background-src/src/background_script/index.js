import 'babel-polyfill';

import sendResponseFactory from '../helpers/sendResponseFactory';

import RABET_EXTENSION_SIGN from './RABET_EXTENSION_SIGN';
import RABET_EXTENSION_LOGIN from './RABET_EXTENSION_LOGIN';
import RABET_EXTENSION_CONNECT from './RABET_EXTENSION_CONNECT.js';
import RABET_EXTENSION_LOGIN_TO_SIGN from './RABET_EXTENSION_LOGIN_TO_SIGN';
import RABET_EXTENSION_SIGN_XDR_RESPONSE from './RABET_EXTENSION_SIGN_XDR_RESPONSE';
import RABET_EXTENSION_CONTACT_REQUEST_RESPONSE from './RABET_EXTENSION_CONTACT_REQUEST_RESPONSE';

let window;

const sendResponseCollection = {};

chrome.runtime.onMessage.addListener((message, sender, send) => {
  const sendResponse = sendResponseFactory(send);

  if (message.type === 'RABET_EXTENSION_CONNECT') {
    RABET_EXTENSION_CONNECT(message, sender, sendResponse, sendResponseCollection).then((newWindow) => {
      window = newWindow;
    });
  } else if (message.type === 'RABET_EXTENSION_LOGIN') {
    RABET_EXTENSION_LOGIN(message, sender, sendResponse, sendResponseCollection, window);
  } else if (message.type === 'RABET_EXTENSION_LOGIN_TO_SIGN') {
    RABET_EXTENSION_LOGIN_TO_SIGN(message, sender, sendResponse, sendResponseCollection, window);
  } else if (message.type === 'RABET_EXTENSION_CONTACT_REQUEST_RESPONSE') {
    RABET_EXTENSION_CONTACT_REQUEST_RESPONSE(message, sender, sendResponse, sendResponseCollection, window);
  } else if (message.type === 'RABET_EXTENSION_SIGN') {
    RABET_EXTENSION_SIGN(message, sender, sendResponse, sendResponseCollection).then((newWindow) => {
      window = newWindow;
    });
  } else if (message.type === 'RABET_EXTENSION_SIGN_XDR_RESPONSE') {
    RABET_EXTENSION_SIGN_XDR_RESPONSE(message, sender, sendResponse, sendResponseCollection, window);
  }

  return true;
});

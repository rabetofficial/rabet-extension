import sign from './actions/sign';
import login from './actions/login';
import connect from './actions/connect';
import { ISendCollection } from './types';
import disconnect from './actions/disconnect';
import isUnlocked from './actions/isUnlocked';
import closeWindow from './actions/closeWindow';
import loginToSign from './actions/loginToSign';
import { R_USER_REJECTED } from '../common/responses';
import signXdrResponse from './actions/signXdrResponse';
import sendResponseFactory from './utils/sendResponseFactory';
import contactRequestResponse from './actions/contactRequestResponse';
import {
  E_SIGN,
  E_LOGIN,
  E_CONNECT,
  E_DISCONNECT,
  E_IS_UNLOCKED,
  E_CLOSE_WINDOW,
  E_LOGIN_TO_SIGN,
  E_SIGN_RESPONSE,
  E_CONTACT_REQUEST_RESPONSE,
} from '../common/messageEvents';

let mainWindow: chrome.tabs.Tab;
let window: chrome.windows.Window;
const sendCol: ISendCollection = {};

chrome.runtime.onMessage.addListener((message, _, sendRaw) => {
  const send = sendResponseFactory(sendRaw);

  if (message.detail && message.detail.href) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      [mainWindow] = tabs;
    });
  }

  if (message.type === E_CONNECT) {
    connect(message, send, sendCol).then((w) => {
      window = w;
    });
  } else if (message.type === E_LOGIN) {
    login(message, send, sendCol, window);
  } else if (message.type === E_LOGIN_TO_SIGN) {
    loginToSign(message, send, sendCol, window);
  } else if (message.type === E_CONTACT_REQUEST_RESPONSE) {
    contactRequestResponse(message, sendCol, window);
  } else if (message.type === E_SIGN) {
    sign(message, send, sendCol).then((w) => {
      window = w;
    });
  } else if (message.type === E_SIGN_RESPONSE) {
    signXdrResponse(message, sendCol, window);
  } else if (message.type === E_CLOSE_WINDOW) {
    closeWindow(send, window);
  } else if (message.type === E_DISCONNECT) {
    disconnect(message, send);
  } else if (message.type === E_IS_UNLOCKED) {
    isUnlocked(send);
  }

  chrome.windows.onRemoved.addListener((wIndex) => {
    if (wIndex === window.id && window && window.id) {
      setTimeout(() => {
        send(R_USER_REJECTED);
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

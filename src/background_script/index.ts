import { getAndDecrypt } from 'helpers/storage';
import { IAccount } from 'popup/reducers/accounts2';
import { IOption } from 'popup/reducers/options';
import sign from './actions/sign';
import login from './actions/login';
import network from './actions/network';
import connect from './actions/connect';
import { R_NO_ACCOUNT, R_USER_REJECTED } from '../common/responses';
import { getAsync } from '../helpers/chromeHelper';
import hasLoggedBefore from './utils/hasLoggedBefore';
import disconnect from './actions/disconnect';
import isUnlocked from './actions/isUnlocked';
import closeWindow from './actions/closeWindow';
import loginToSign from './actions/loginToSign';
import signXdrResponse from './actions/signXdrResponse';
import sendResponseFactory from './utils/sendResponseFactory';
import { ActionState, ISend, ISendCollection } from './types';
import contactRequestResponse from './actions/contactRequestResponse';
import {
  E_SIGN,
  E_LOGIN,
  E_NETWORK,
  E_CONNECT,
  E_DISCONNECT,
  E_IS_UNLOCKED,
  E_CLOSE_WINDOW,
  E_LOGIN_TO_SIGN,
  E_SIGN_RESPONSE,
  E_CONTACT_REQUEST_RESPONSE,
  E_SIGN_MESSAGE,
  E_SIGN_MESSAGE_RESPONSE,
} from '../common/messageEvents';
import signMessage from './actions/signMessage';
import signMessageResponse from './actions/signMessageResponse';

let mainWindow: chrome.tabs.Tab;
let window: chrome.windows.Window;
const sendCol: ISendCollection = {};

const listener = async (message: any, send: ISend) => {
  const data = await getAsync<string>('data');

  if (!data) {
    send(R_NO_ACCOUNT);
    return;
  }

  const state: ActionState = {
    options: {
      mode: 'BASIC',
      currency: 'USD',
      privacyMode: true,
      autoTimeLocker: 60,
      network: 'MAINNET',
      explorer: 'stellarexpert',
    },
    accounts: [],
    needsLogin: false,
    activeAccount: null,
    connectedWebsites: [],
  };

  const password = await hasLoggedBefore();

  if (!password) {
    state.needsLogin = true;
  }

  const options = await getAsync<IOption>('options');
  const connectedWebsites = await getAsync<string[]>('connectedWebsites');

  if (options) {
    state.options = options;
  }

  if (connectedWebsites && Array.isArray(connectedWebsites)) {
    state.connectedWebsites = connectedWebsites;
  }

  const accounts = await getAndDecrypt<IAccount[]>('data', password);

  if (accounts) {
    state.accounts = accounts;

    const activeAcc = accounts.find((acc) => acc.active);

    if (activeAcc) {
      state.activeAccount = activeAcc;
    } else if (accounts.length) {
      state.activeAccount = accounts[0];
    }
  } else {
    state.needsLogin = true;
  }

  handleActions(message, state, send);
};

chrome.runtime.onMessage.addListener((message, _, sendRaw) => {
  const send = sendResponseFactory(sendRaw);

  if (message.detail && message.detail.href) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      [mainWindow] = tabs;
    });
  }

  listener(message, send);

  chrome.windows.onRemoved.addListener((wIndex) => {
    setTimeout(() => {
      if (sendCol[wIndex]) {
        sendCol[wIndex](R_USER_REJECTED);

        delete sendCol[wIndex];
      }
    }, 200);
  });

  return true;
});

const handleActions = (message: any, state: ActionState, send: ISend) => {
  if (message.type === E_CONNECT) {
    connect(message, state, send, sendCol).then((w) => {
      if (w) {
        window = w;
      }
    });
  } else if (message.type === E_LOGIN) {
    login(message, state, send, sendCol, window);
  } else if (message.type === E_LOGIN_TO_SIGN) {
    loginToSign(message, state, send, sendCol, window);
  } else if (message.type === E_CONTACT_REQUEST_RESPONSE) {
    contactRequestResponse(message, state, sendCol, window);
  } else if (message.type === E_SIGN) {
    sign(message, state, send, sendCol).then((w) => {
      window = w;
    });
  } else if (message.type === E_SIGN_RESPONSE) {
    signXdrResponse(message, state, sendCol, window);
  } else if (message.type === E_CLOSE_WINDOW) {
    closeWindow(send, window);
  } else if (message.type === E_DISCONNECT) {
    disconnect(message, send);
  } else if (message.type === E_IS_UNLOCKED) {
    isUnlocked(send);
  } else if (message.type === E_NETWORK) {
    network(send, state);
  } else if (message.type === E_SIGN_MESSAGE) {
    signMessage(message, state, send, sendCol).then((w) => {
      window = w;
    });
  } else if (message.type === E_SIGN_MESSAGE_RESPONSE) {
    signMessageResponse(message, state, sendCol, window);
  }
};

chrome.tabs.onRemoved.addListener((wIndex) => {
  if (mainWindow && mainWindow.id === wIndex && window && window.id) {
    chrome.windows.remove(window.id);
  }
});

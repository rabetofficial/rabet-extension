import createEventListener from './createEventListener';

const s = document.createElement('script');

s.src = chrome.runtime.getURL('dist/client_script.js');

s.onload = () => {
  if (this) {
    this.remove();
  }
};

(document.head || document.documentElement).appendChild(s);

document.addEventListener(
  'RABET_EXTENSION_CONNECT',
  createEventListener(
    'RABET_EXTENSION_CONNECT',
    'RABET_EXTENSION_CONNECT_RESPONSE',
    true,
  ),
);

document.addEventListener(
  'RABET_EXTENSION_LOGIN',
  createEventListener('RABET_EXTENSION_LOGIN', 'RABET_EXTENSION_LOGIN_RESPONSE', false),
);

document.addEventListener(
  'RABET_EXTENSION_SIGN',
  createEventListener('RABET_EXTENSION_SIGN', 'RABET_EXTENSION_SIGN_RESPONSE', true),
);

document.addEventListener(
  'RABET_EXTENSION_CLOSE_WINDOW',
  createEventListener(
    'RABET_EXTENSION_CLOSE_WINDOW',
    'RABET_EXTENSION_CLOSE_WINDOW_RESPONSE',
    true,
  ),
);

document.addEventListener(
  'RABET_EXTENSION_DISCONNECT',
  createEventListener(
    'RABET_EXTENSION_DISCONNECT',
    'RABET_EXTENSION_DISCONNECT_RESPONSE',
    true,
  ),
);

document.addEventListener(
  'RABET_EXTENSION_IS_UNLOCKED',
  createEventListener(
    'RABET_EXTENSION_IS_UNLOCKED',
    'RABET_EXTENSION_IS_UNLOCKED_RESPONSE',
    true,
  ),
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'RABET_EXTENSION_CHANGE_ACCOUNT_EVENT') {
    document.dispatchEvent(new CustomEvent('RABET_EXTENSION_CHANGE_ACCOUNT_EVENT', {}));
  }

  if (message.type === 'RABET_EXTENSION_CHANGE_NETWORK_EVENT') {
    document.dispatchEvent(
      new CustomEvent('RABET_EXTENSION_CHANGE_NETWORK_EVENT', {
        detail: message.detail,
      }),
    );
  }
});

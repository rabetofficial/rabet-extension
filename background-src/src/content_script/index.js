import createEventListener from './createEventListener';

const s = document.createElement('script');

s.src = chrome.runtime.getURL('background/client_script.js');

s.onload = function () {
  this.remove();
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

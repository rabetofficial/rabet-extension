import { get } from './helpers/storage';
import open from './helpers/open';

const s = document.createElement('script');

s.src = chrome.runtime.getURL('background/app.js');

s.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(s);

document.addEventListener('RABET_EXTENSION_CONNECT', function(e) {
  chrome.runtime.sendMessage({
    type: 'RABET_EXTENSION_CONNECT',
    detail: e.detail,
  }, (response) => {
    document.dispatchEvent(new CustomEvent('RABET_EXTENSION_CONNECT_RESPONSE', {
      detail: response,
    }));
  });
});

document.addEventListener('RABET_EXTENSION_LOGIN', function(e) {
  chrome.runtime.sendMessage({
    type: 'RABET_EXTENSION_LOGIN',
    detail: e,
  }, (response) => {
    document.dispatchEvent(new CustomEvent('RABET_EXTENSION_LOGIN_RESPONSE', {
      detail: response,
    }));
  });
});

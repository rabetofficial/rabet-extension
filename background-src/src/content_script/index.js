import signEvent from './RABET_EXTENSION_SIGN';
import loginEvent from './RABET_EXTENSION_LOGIN';
import connectEvent from './RABET_EXTENSION_CONNECT';

const s = document.createElement('script');

s.src = chrome.runtime.getURL('background/client_script.js');

s.onload = function () {
  this.remove();
};

(document.head || document.documentElement).appendChild(s);

document.addEventListener('RABET_EXTENSION_CONNECT', connectEvent);
document.addEventListener('RABET_EXTENSION_LOGIN', loginEvent);
document.addEventListener('RABET_EXTENSION_SIGN', signEvent);

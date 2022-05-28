import { get, set } from '../helpers/storage';

export default (message, sender, sendResponse) => {
  get('connectedWebsites').then((rawConnectedWebsites) => {
    let connectedWebsites;

    if (typeof rawConnectedWebsites === 'string') {
      connectedWebsites = JSON.parse(rawConnectedWebsites);
    } else if (typeof rawConnectedWebsites === 'object') {
      connectedWebsites = rawConnectedWebsites;
    } else {
      connectedWebsites = [];
    }

    let newConnectedWebsites = connectedWebsites;

    if (connectedWebsites && connectedWebsites.length) {
      newConnectedWebsites = connectedWebsites.filter(
        (x) => !x.includes(message.detail.host),
      );

      set('connectedWebsites', newConnectedWebsites);
    }

    sendResponse({ ok: true, message: 'disconnected-successfully' });
  });
};

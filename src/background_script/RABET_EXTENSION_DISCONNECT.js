import { get, set } from '../helpers/storage';

export default (message, sender, sendResponse) => {
  get('connectedWebsites').then((rawConnectedWebsites) => {
    const connectedWebsites = JSON.parse(rawConnectedWebsites);

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

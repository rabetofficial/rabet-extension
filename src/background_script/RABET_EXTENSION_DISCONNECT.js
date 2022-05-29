import { get, set } from '../helpers/storage';
import readConnectedWebsites from '../helpers/readConnectedWebsites';

export default (message, sender, sendResponse) => {
  get('connectedWebsites').then((rawConnectedWebsites) => {
    const connectedWebsites = readConnectedWebsites(
      rawConnectedWebsites,
    );

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

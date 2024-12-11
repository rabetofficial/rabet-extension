import { ISend } from 'background_script/types';
import { get, set } from '../../helpers/storage';
import { R_DISCONNETED } from '../../common/responses';
import { DisconnectType } from '../../common/messageTypes';
import readConnectedWebsites from '../../helpers/readConnectedWebsites';

const disconnect = (message: DisconnectType, send: ISend) => {
  get('connectedWebsites').then((rawConnectedWebsites: string) => {
    const connectedWebsites = readConnectedWebsites(rawConnectedWebsites);

    let newConnectedWebsites = connectedWebsites;

    if (connectedWebsites && connectedWebsites.length) {
      newConnectedWebsites = connectedWebsites.filter(
        (x) => !x.includes(message.detail.host),
      );

      set('connectedWebsites', newConnectedWebsites);
    }

    send(R_DISCONNETED);
  });
};

export default disconnect;

import { set } from '../../helpers/storage';
import { removeWindow } from '../utils/window';
import { ActionState, ISendCollection } from '../types';
import { R_USER_REJECTED } from '../../common/responses';
import isWebsiteConnected from '../utils/isWebsiteConnected';
import { ContactRequestResponseMessageType } from '../../common/messageTypes';

const contactRequestResponse = (
  message: ContactRequestResponseMessageType,
  state: ActionState,
  sendCol: ISendCollection,
  window: chrome.windows.Window,
) => {
  if (message.result === 'reject') {
    sendCol[message.id](R_USER_REJECTED);
  } else if (message.result === 'confirm') {
      sendCol[message.id]({
        ok: true,
        message: {
          publicKey: message.activeAcconut.publicKey,
        },
      });

      if (state.options.privacyMode) {
        const isHostConnected = isWebsiteConnected(state.connectedWebsites, message.detail.host, message.activeAcconut.publicKey);

        const newWebsites = [...state.connectedWebsites]
        const newWebsite = `${message.detail.host}/${message.activeAcconut.publicKey}`;

        if (!isHostConnected) {
          newWebsites.push(newWebsite);
        }

        set('connectedWebsites', newWebsites);
      }
  } else {
    sendCol[message.id](R_USER_REJECTED);
  }

  removeWindow(window.id);
};

export default contactRequestResponse;

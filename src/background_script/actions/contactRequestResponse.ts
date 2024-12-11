import { ISendCollection } from '../types';
import { get, set } from '../../helpers/storage';
import WindowManager from '../utils/WindowManager';
import { IOption } from '../../popup/reducers/options';
import { R_USER_REJECTED } from '../../common/responses';
import readConnectedWebsites from '../../helpers/readConnectedWebsites';
import { ContactRequestResponseMessageType } from '../../common/messageTypes';

const contactRequestResponse = (
  message: ContactRequestResponseMessageType,
  sendCol: ISendCollection,
  window: chrome.windows.Window,
) => {
  if (message.result === 'reject') {
    sendCol[message.id](R_USER_REJECTED);
  } else if (message.result === 'confirm') {
    get('options').then((options: IOption) => {
      sendCol[message.id]({
        ok: true,
        message: {
          publicKey: message.activeAcconut.publicKey,
        },
      });

      let isPrivacyModeOn = true;

      if (options) {
        isPrivacyModeOn = options.privacyMode;
      }

      if (isPrivacyModeOn) {
        get('connectedWebsites').then((rawConnectedWebsites: string) => {
          const newWebsites = readConnectedWebsites(rawConnectedWebsites);
          const newWebsite = `${message.detail.host}/${message.activeAcconut.publicKey}`;

          if (!newWebsites.some((x) => x === newWebsite)) {
            newWebsites.push(newWebsite);
          }

          set('connectedWebsites', newWebsites);
        });
      }
    });
  } else {
    sendCol[message.id](R_USER_REJECTED);
  }

  WindowManager.remove(window.id);
};

export default contactRequestResponse;

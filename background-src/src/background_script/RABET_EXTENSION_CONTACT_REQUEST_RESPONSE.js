import WindowManager from '../helpers/Window';
import { get, set } from '../helpers/storage';

export default (message, sender, sendResponse, sendResponseCollection, window) => {
  if (message.result === 'reject') {
    sendResponseCollection[message.id]({ ok: false, message: 'user-rejected' });
  } else if (message.result === 'confirm') {
    get('options').then((options) => {
      sendResponseCollection[message.id]({
        ok: true,
        message: {
          publicKey: message.activeAcconut.publicKey,
        },
      });

      let isPrivacyModeOn;

      if (!options) {
        isPrivacyModeOn = true;
      } else {
        isPrivacyModeOn = options.privacyMode;
      }

      if (isPrivacyModeOn) {
        get('connectedWebsites').then((websites) => {
          const newWebsites = websites || [];
          const newWebsite = `${message.detail.host}/${message.activeAcconut.publicKey}`;

          if (!newWebsites.some((x) => x === newWebsite)) {
            newWebsites.push(newWebsite);
          }

          set('connectedWebsites', newWebsites);
        });
      }
    });
  } else {
    sendResponseCollection[message.id]({ ok: false, message: 'user-rejected' });
  }

  WindowManager.remove(window.id);
};

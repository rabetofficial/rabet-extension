import { get } from '../helpers/storage';
import setTimer from './utils/setTimer';
import WindowManager from './utils/Window';

export default (
  message,
  sender,
  sendResponse,
  sendResponseCollection,
  window,
) => {
  get('data', message.values.password)
    .then((accounts) => {
      setTimer(message.values.password);

      if (!accounts) {
        sendResponseCollection[message.id]({
          ok: false,
          message: 'no-account',
        });
        WindowManager.remove(window.id);

        return;
      }

      if (!accounts.length) {
        sendResponseCollection[message.id]({
          ok: false,
          message: 'no-account',
        });
        WindowManager.remove(window.id);

        return;
      }

      const activeAcconut = accounts.find((x) => x.active === true);

      get('options').then((options) => {
        let isPrivacyModeOn;

        if (!options) {
          isPrivacyModeOn = true;
        } else {
          isPrivacyModeOn = options.privacyMode;
        }

        if (!isPrivacyModeOn) {
          sendResponse({
            ok: true,
            message: {
              publicKey: activeAcconut.publicKey,
            },
          });
          return;
        }

        get('connectedWebsites').then((rawConnectedWebsites) => {
          let connectedWebsites;

          if (typeof rawConnectedWebsites === 'string') {
            connectedWebsites = JSON.parse(rawConnectedWebsites);
          } else if (typeof rawConnectedWebsites === 'object') {
            connectedWebsites = rawConnectedWebsites;
          } else {
            connectedWebsites = [];
          }

          let isHostConnected = false;

          if (!connectedWebsites || !connectedWebsites.length) {
            isHostConnected = false;
          } else {
            isHostConnected = connectedWebsites.some(
              (x) =>
                x ===
                `${message.detail.host}/${activeAcconut.publicKey}`,
            );
          }

          // When the host is trusted
          if (isHostConnected) {
            sendResponse({
              ok: true,
              message: {
                publicKey: activeAcconut.publicKey,
              },
            });
          } else {
            sendResponseCollection[message.id]({
              ok: false,
              message: 'not-connected',
            });

            WindowManager.remove(window.id);
          }
        });
      });
    })
    .catch(() => {
      sendResponse({ ok: false, message: 'wrong-password' });
    });
};

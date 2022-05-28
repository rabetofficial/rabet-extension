import setTimer from './utils/setTimer';
import { get } from '../helpers/storage';
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
          sendResponseCollection[message.id]({
            ok: true,
            message: {
              publicKey: activeAcconut.publicKey,
            },
          });

          WindowManager.remove(window.id);

          return;
        }

        get('connectedWebsites').then((rawConnectedWebsites) => {
          const connectedWebsites = JSON.parse(rawConnectedWebsites);

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
            sendResponseCollection[message.id]({
              ok: true,
              message: {
                // name: activeAcconut.name,
                publicKey: activeAcconut.publicKey,
              },
            });

            WindowManager.remove(window.id);
          } else {
            sendResponse({
              ok: true,
              message: {
                name: activeAcconut.name,
                publicKey: activeAcconut.publicKey,
              },
            });
          }
        });
      });
    })
    .catch(() => {
      sendResponse({ ok: false, message: 'wrong-password' });
    });
};

import { get } from '../helpers/storage';
import WindowManager from './utils/Window';
import sendInterval from './utils/sendInterval';
import hasLoggedBefore from './utils/hasLoggedBefore';
import readConnectedWebsites from '../helpers/readConnectedWebsites';

export default (
  message,
  sender,
  sendResponse,
  sendResponseCollection,
) =>
  new Promise((resolve) => {
    const { screenX, screenY, outerWidth } = message.detail;

    get('data').then((storageString) => {
      // When data == null
      if (!storageString) {
        return sendResponse({ ok: false, message: 'no-account' });
      }

      hasLoggedBefore()
        .then((hasLogged) => {
          // When the user has not logged before
          if (!hasLogged) {
            WindowManager.create(screenX, screenY, outerWidth)
              .then((newWindow) => {
                resolve(newWindow);

                const generatedId = Date.now().toString();
                sendResponseCollection[generatedId] = sendResponse;

                sendInterval(newWindow.tabs[0].id, {
                  generatedId,
                  page: '/login',
                  detail: message.detail,
                });
              })
              .catch(() => {
                sendResponse({
                  ok: false,
                  message: 'internal-error',
                });
              });

            return;
          }

          // When the user has logged before
          get('data', hasLogged).then((accounts) => {
            // When user has no accounts
            if (!accounts) {
              sendResponse({ ok: false, message: 'no-account' });

              return;
            }

            // When user has no accounts
            if (!accounts.length) {
              sendResponse({ ok: false, message: 'no-account' });

              return;
            }

            const activeAcconut = accounts.find(
              (x) => x.active === true,
            );

            get('options').then((options) => {
              let isPrivacyModeOn;

              if (!options) {
                isPrivacyModeOn = true;
              } else {
                isPrivacyModeOn = options.privacyMode;
              }

              // When user has accounts and privacyMode is off
              if (!isPrivacyModeOn) {
                sendResponse({
                  ok: true,
                  message: {
                    // name: activeAcconut.name,
                    publicKey: activeAcconut.publicKey,
                  },
                });

                return;
              }

              // When user has accounts and privacyMode is on
              get('connectedWebsites').then(
                (rawConnectedWebsites) => {
                  const connectedWebsites = readConnectedWebsites(
                    rawConnectedWebsites,
                  );

                  let isHostConnected = false;

                  if (
                    !connectedWebsites ||
                    !connectedWebsites.length
                  ) {
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
                        // name: activeAcconut.name,
                        publicKey: activeAcconut.publicKey,
                      },
                    });
                  }

                  // When the host is not trusted
                  else {
                    WindowManager.create(screenY, screenX, outerWidth)
                      .then((newWindow) => {
                        resolve(newWindow);

                        const generatedId = Date.now().toString();
                        sendResponseCollection[generatedId] =
                          sendResponse;

                        sendInterval(newWindow.tabs[0].id, {
                          generatedId,
                          page: '/contact-request',
                          detail: message.detail,
                          activeAcconut: {
                            name: activeAcconut.name,
                            publicKey: activeAcconut.publicKey,
                          },
                        });
                      })
                      .catch(() => {
                        sendResponse({
                          ok: false,
                          message: 'internal-error',
                        });
                      });
                  }
                },
              );
            });
          });
        })
        .catch(() => {
          sendResponse({ ok: false, message: 'wrong-password' });
        });
    });
  });

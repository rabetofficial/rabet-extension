import { get } from '../helpers/storage';
import WindowManager from './utils/Window';
import getNetwork from '../helpers/getNetwork';
import sendInterval from './utils/sendInterval';
import hasLoggedBefore from './utils/hasLoggedBefore';

export default (message, sender, sendResponse, sendResponseCollection) =>
  new Promise((resolve) => {
    const network = getNetwork(message.detail.network);
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

                sendInterval(
                  newWindow.tabs[0].id,
                  {
                    generatedId,
                    page: '/login',
                    detail: message.detail,
                    destination: 'sign',
                    xdr: {
                      xdr: message.detail.xdr,
                      network,
                    },
                  },
                );
              })
              .catch(() => {
                sendResponse({ ok: false, message: 'internal-error' });
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

            const activeAcconut = accounts.find((x) => x.active === true);

            get('options').then((options) => {
              const isPrivacyModeOn = !options ? true : options.privacyMode;

              if (!isPrivacyModeOn) {
                WindowManager.create(screenX, screenY, outerWidth)
                  .then((newWindow) => {
                    resolve(newWindow);

                    const generatedId = Date.now().toString();
                    sendResponseCollection[generatedId] = sendResponse;

                    sendInterval(
                      newWindow.tabs[0].id,
                      {
                        generatedId,
                        type: 'RABET_GENERATED_ID',
                        page: '/confirm',
                        detail: message.detail,
                        xdr: {
                          xdr: message.detail.xdr,
                          network,
                        },
                        activeAcconut: {
                          name: activeAcconut.name,
                          publicKey: activeAcconut.publicKey,
                        },
                      },
                    );
                  })
                  .catch(() => {
                    sendResponse({ ok: false, message: 'internal-error' });
                  });
              } else {
                // When user has accounts and privacyMode is on
                get('connectedWebsites').then((connectedWebsites) => {
                  let isHostConnected = false;

                  if (!connectedWebsites || !connectedWebsites.length) {
                    isHostConnected = false;
                  } else {
                    isHostConnected = connectedWebsites.some(
                      (x) => x === `${message.detail.host}/${activeAcconut.publicKey}`,
                    );
                  }

                  // When the host is trusted
                  if (isHostConnected) {
                    WindowManager.create(screenX, screenY, outerWidth)
                      .then((newWindow) => {
                        resolve(newWindow);

                        const generatedId = Date.now().toString();
                        sendResponseCollection[generatedId] = sendResponse;

                        sendInterval(
                          newWindow.tabs[0].id,
                          {
                            generatedId,
                            page: '/confirm',
                            detail: message.detail,
                            xdr: {
                              xdr: message.detail.xdr,
                              network,
                            },
                            activeAcconut: {
                              name: activeAcconut.name,
                              publicKey: activeAcconut.publicKey,
                            },
                          },
                        );
                      });
                  }
                  // When the host is not trusted
                  else {
                    sendResponse({ ok: false, message: 'not-connected' });
                  }
                });
              }
            });
          });
        })
        .catch(() => {
          sendResponse({ ok: false, message: 'wrong-password' });
        });
    });
  });

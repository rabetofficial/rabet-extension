import shortid from 'shortid';

import { get } from '../helpers/storage';
import hasLoggedBefore from '../helpers/hasLoggedBefore';

export default (message, sender, sendResponse, sendResponseCollection) =>
  new Promise((resolve) => {
    let network;
    if (
      message.detail.network.includes('main') ||
      message.detail.network.includes('MAIN')
    ) {
      network = 'mainnet';
    } else {
      network = 'testnet';
    }

    get('data').then((storageString) => {
      // When data == null
      if (!storageString) {
        return sendResponse({ ok: false, message: 'no-account' });
      }

      hasLoggedBefore()
        .then((hasLogged) => {
          // When the user has not logged before
          if (!hasLogged) {
            chrome.windows.create(
              {
                type: 'popup',
                url: chrome.runtime.getURL('interaction/index.html'),
                top: 0,
                left: 200000,
                width: 380,
                height: 640,
              },
              function (newWindow) {
                resolve(newWindow);
                const generatedId = shortid.generate();
                sendResponseCollection[generatedId] = sendResponse;

                let p = setInterval(() => {
                  chrome.tabs.sendMessage(
                    newWindow.tabs[0].id,
                    {
                      type: 'RABET_GENERATED_ID',
                      generatedId,
                      page: '/login',
                      detail: message.detail,
                      destination: 'sign',
                      xdr: {
                        xdr: message.detail.xdr,
                        network,
                      },
                    },
                    function (response) {
                      if (response && response.type === 'RABET_GENERATED_ID_RECEIVED') {
                        clearInterval(p);
                      }
                    },
                  );
                }, 100);
              },
            );

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
              let isPrivacyModeOn;

              if (!options) {
                isPrivacyModeOn = true;
              } else {
                isPrivacyModeOn = options.privacyMode;
              }

              if (!isPrivacyModeOn) {
                chrome.windows.create(
                  {
                    type: 'popup',
                    url: chrome.runtime.getURL('interaction/index.html'),
                    top: 0,
                    left: 200000,
                    width: 380,
                    height: 640,
                  },
                  function (newWindow) {
                    resolve(newWindow);
                    const generatedId = shortid.generate();
                    sendResponseCollection[generatedId] = sendResponse;

                    let p = setInterval(() => {
                      chrome.tabs.sendMessage(
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
                            publicKey: activeAcconut.publicKey,
                          },
                        },
                        function (response) {
                          if (
                            response &&
                            response.type === 'RABET_GENERATED_ID_RECEIVED'
                          ) {
                            clearInterval(p);
                          }
                        },
                      );
                    }, 100);
                  },
                );
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
                    chrome.windows.create(
                      {
                        type: 'popup',
                        url: chrome.runtime.getURL('interaction/index.html'),
                        top: 0,
                        left: 200000,
                        width: 380,
                        height: 640,
                      },
                      function (newWindow) {
                        resolve(newWindow);
                        const generatedId = shortid.generate();
                        sendResponseCollection[generatedId] = sendResponse;

                        let p = setInterval(() => {
                          chrome.tabs.sendMessage(
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
                                publicKey: activeAcconut.publicKey,
                              },
                            },
                            function (response) {
                              if (
                                response &&
                                response.type === 'RABET_GENERATED_ID_RECEIVED'
                              ) {
                                clearInterval(p);
                              }
                            },
                          );
                        }, 100);
                      },
                    );
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

import 'babel-polyfill';
import shortid from 'shortid';

import sign from '../helpers/sign';
import setTimer from '../helpers/setTimer';
import { get, set } from '../helpers/storage';
import hasLoggedBefore from '../helpers/hasLoggedBefore';

let window;

const sendResponseCollection = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RABET_EXTENSION_CONNECT') {
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
                window = newWindow;
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
                      window = newWindow;
                      const generatedId = shortid.generate();
                      sendResponseCollection[generatedId] = sendResponse;

                      let p = setInterval(() => {
                        chrome.tabs.sendMessage(
                          newWindow.tabs[0].id,
                          {
                            generatedId,
                            type: 'RABET_GENERATED_ID',
                            page: '/contact-request',
                            detail: message.detail,
                            activeAcconut: {
                              name: activeAcconut.name,
                              publicKey: activeAcconut.publicKey,
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
                }
              });
            });
          });
        })
        .catch(() => {
          sendResponse({ ok: false, message: 'wrong-password' });
        });
    });
  } else if (message.type === 'RABET_EXTENSION_LOGIN') {
    // sendResponseCollection[message.id]({ ok: true })
    get('data', message.values.password)
      .then((accounts) => {
        setTimer(message.values.password);

        if (!accounts) {
          sendResponseCollection[message.id]({ ok: false, message: 'no-account' });
          chrome.windows.remove(window.id);

          return;
        }

        if (!accounts.length) {
          sendResponseCollection[message.id]({ ok: false, message: 'no-account' });
          chrome.windows.remove(window.id);

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
                // name: activeAcconut.name,
                publicKey: activeAcconut.publicKey,
              },
            });

            chrome.windows.remove(window.id);

            return;
          }

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
              sendResponseCollection[message.id]({
                ok: true,
                message: {
                  // name: activeAcconut.name,
                  publicKey: activeAcconut.publicKey,
                },
              });

              chrome.windows.remove(window.id);
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
  } else if (message.type === 'RABET_EXTENSION_LOGIN_TO_SIGN') {
    get('data', message.values.password)
      .then((accounts) => {
        setTimer(message.values.password);

        if (!accounts) {
          sendResponseCollection[message.id]({ ok: false, message: 'no-account' });
          chrome.windows.remove(window.id);

          return;
        }

        if (!accounts.length) {
          sendResponseCollection[message.id]({ ok: false, message: 'no-account' });
          chrome.windows.remove(window.id);

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

              chrome.windows.remove(window.id);
            }
          });
        });
      })
      .catch(() => {
        sendResponse({ ok: false, message: 'wrong-password' });
      });
  } else if (message.type === 'RABET_EXTENSION_CONTACT_REQUEST_RESPONSE') {
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

    chrome.windows.remove(window.id);
  } else if (message.type === 'RABET_EXTENSION_SIGN') {
    let network;

    if (message.detail.network.includes('main') || message.detail.network.includes('MAIN')) {
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
                window = newWindow;
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
                    window = newWindow;
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
                          if (response && response.type === 'RABET_GENERATED_ID_RECEIVED') {
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
                        window = newWindow;
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
                              if (response && response.type === 'RABET_GENERATED_ID_RECEIVED') {
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
  } else if (message.type === 'RABET_EXTENSION_SIGN_XDR_RESPONSE') {
    if (message.result === 'confirm') {
      hasLoggedBefore()
        .then((hasLogged) => {
          if (!hasLogged) {
            sendResponseCollection[message.id]({
              ok: false,
              message: 'no-user-logged',
            });

            return;
          }

          get('data', hasLogged).then((accounts) => {
            if (!accounts) {
              sendResponseCollection[message.id]({ ok: false, message: 'no-account' });

              return;
            }

            // When user has no accounts
            if (!accounts.length) {
              sendResponseCollection[message.id]({ ok: false, message: 'no-account' });

              return;
            }

            const activeAcconut = accounts.find((x) => x.active === true);

            const signed = sign(message.xdr.xdr, message.xdr.network, activeAcconut);

            sendResponseCollection[message.id]({
              ok: true,
              message: {
                xdr: signed,
              },
            });
          });
        })
        .catch(() => {
          sendResponseCollection[message.id]({
            ok: false,
            message: 'no-user-logged',
          });
        });
    } else if (message.result === 'close') {
      sendResponseCollection[message.id]({
        ok: false,
        message: 'invalid-xdr',
      });
    } else {
      sendResponseCollection[message.id]({ ok: false, message: 'user-rejected' });
    }

    chrome.windows.remove(window.id);
  }

  return true;
});

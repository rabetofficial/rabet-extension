import 'babel-polyfill';
import shortid from 'shortid';
import { get } from './helpers/storage';
import createWindow from './helpers/createWindow';
import hasLoggedBefore from './helpers/hasLoggedBefore';

let window;
const sendResponseCollection = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'RABET_EXTENSION_CONNECT') {
    get('data')
      .then(storageString => {
        if (!storageString) {
          return sendResponse({ ok: false, message: 'no-account' });
        }

        hasLoggedBefore()
          .then(hasLogged => {
            if (!hasLogged) {
              chrome.windows.create({
                  type: 'popup',
                  url: chrome.runtime.getURL('interaction/index.html'),
                  top: 0,
                  left: 200000,
                  width: 380,
                  height: 640,
              }, function(newWindow) {
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
                    function(response) {
                    if (response.type === 'RABET_GENERATED_ID_RECEIVED') {
                      clearInterval(p);
                    }
                  });
                }, 100);
              });

              return;
            }

            get('data', hasLogged)
            .then((accounts) => {
              if (!accounts) {
                sendResponse({ ok: false, message: 'no-account' });

                return;
              }

              if (!accounts.length) {
                sendResponse({ ok: false, message: 'no-account' });

                return;
              }

              const activeAcconut = accounts.find(x => x.active === true);

              get('options')
              .then((options) => {
                if (!options.privacyMode) {
                  sendResponse({
                    ok: true,
                    message: {
                      name: activeAcconut.name,
                      publicKey: activeAcconut.publicKey,
                    }
                  });

                  return;
                }

                chrome.windows.create({
                    type : 'popup',
                    url : chrome.runtime.getURL('interaction/index.html'),
                    top: 0,
                    left: 200000,
                    width: 380,
                    height: 640,
                }, function(newWindow) {
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
                      function(response) {
                      if (response.type === 'RABET_GENERATED_ID_RECEIVED') {
                        clearInterval(p);
                      }
                    });
                  }, 100);
                });

                // get('trusted')
                // .then(trustedWebsites => {
                //   // if the website is in this page
                // })

                // age trust bood


              })
            })
          })
          .catch(() => {
            sendResponse({ ok: false, message: 'wrong-password' });
          });
      });
  }

  else if (message.type === 'RABET_EXTENSION_LOGIN') {
    // sendResponseCollection[message.id]({ ok: true })
    get('data', message.values.password)
      .then((accounts) => {
        if (!accounts) {
          sendResponse({ ok: false, message: 'no-account' });

          return;
        }

        if (!accounts.length) {
          sendResponse({ ok: false, message: 'no-account' });

          return;
        }

        const activeAcconut = accounts.find(x => x.active === true);

        get('options')
        .then((options) => {
          if (!options.privacyMode) {
            sendResponseCollection[message.id]({
              ok: true,
              message: {
                name: activeAcconut.name,
                publicKey: activeAcconut.publicKey,
              }
            });

            chrome.windows.remove(window.id);

            return;
          }

          sendResponse({
            ok: true,
            message: {
              name: activeAcconut.name,
              publicKey: activeAcconut.publicKey,
            },
          });
        })
      })
      .catch(() => {
        sendResponse({ ok: false, message: 'wrong-password' });
      });
  }

  else if (message.type === 'RABET_EXTENSION_CONTACT_REQUEST_RESPONSE') {
    if (message.result === 'reject') {
      sendResponseCollection[message.id]({ ok: false, message: 'user-rejected' });
    }

    else if (message.result === 'confirm') {
      sendResponseCollection[message.id]({
        ok: true,
        message: {
          name: message.activeAcconut.name,
          publicKey: message.activeAcconut.publicKey,
        }
      });
    }

    else {
      sendResponseCollection[message.id]({ ok: false, message: 'user-rejected' });
    }

    chrome.windows.remove(window.id);
  }

  return true;
});

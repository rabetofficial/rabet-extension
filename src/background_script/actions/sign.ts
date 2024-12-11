import { get } from '../../helpers/storage';
import sendInterval from '../utils/sendInterval';
import getNetwork from '../../helpers/getNetwork';
import { ISend, ISendCollection } from '../types';
import WindowManager from '../utils/WindowManager';
import hasLoggedBefore from '../utils/hasLoggedBefore';
import { IOption } from '../../popup/reducers/options';
import { IAccount } from '../../popup/reducers/accounts2';
import { SignMessageType } from '../../common/messageTypes';
import { E_GENERATED_ID } from '../../common/messageEvents';
import readConnectedWebsites from '../../helpers/readConnectedWebsites';
import {
  R_INCORRECT_PASSWORD,
  R_INTERNAL_ERROR,
  R_NOT_CONNECTED,
  R_NO_ACCOUNT,
} from '../../common/responses';

const sign = (
  message: SignMessageType,
  send: ISend,
  sendCol: ISendCollection,
): Promise<chrome.windows.Window> =>
  new Promise((resolve) => {
    const network = getNetwork(message.detail.network);
    const { screenX, screenY, outerWidth } = message.detail;

    get('data').then((dataRes) => {
      if (!dataRes) {
        return send(R_NO_ACCOUNT);
      }

      hasLoggedBefore()
        .then((hasLogged: string) => {
          // When the user has not logged before
          if (!hasLogged) {
            WindowManager.create({ screenX, screenY, outerWidth })
              .then((window) => {
                resolve(window);

                const generatedId = Date.now().toString();
                sendCol[generatedId] = send;

                sendInterval(window.tabs[0].id, {
                  generatedId,
                  page: '/login',
                  detail: message.detail,
                  destination: 'sign',
                  xdr: {
                    xdr: message.detail.xdr,
                    network,
                  },
                });
              })
              .catch(() => {
                send(R_INTERNAL_ERROR);
              });

            return;
          }

          // When the user has logged before
          get('data', hasLogged).then((accounts: IAccount[]) => {
            // When user has no accounts
            if (!accounts || !accounts.length) {
              send(R_NO_ACCOUNT);

              return;
            }

            const activeAcconut = accounts.find((x) => x.active === true);

            get('options').then((options: IOption) => {
              const isPrivacyModeOn = !options ? true : options.privacyMode;

              if (!isPrivacyModeOn) {
                WindowManager.create({ screenX, screenY, outerWidth })
                  .then((newWindow) => {
                    resolve(newWindow);

                    const generatedId = Date.now().toString();
                    sendCol[generatedId] = send;

                    sendInterval(newWindow.tabs[0].id, {
                      generatedId,
                      type: E_GENERATED_ID,
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
                    });
                  })
                  .catch(() => {
                    send(R_INTERNAL_ERROR);
                  });
              } else {
                // When user has accounts and privacyMode is on
                get('connectedWebsites').then((rawConnectedWebsites: string) => {
                  const connectedWebsites = readConnectedWebsites(rawConnectedWebsites);

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
                    WindowManager.create({ screenX, screenY, outerWidth }).then(
                      (newWindow) => {
                        resolve(newWindow);

                        const generatedId = Date.now().toString();
                        sendCol[generatedId] = send;

                        sendInterval(newWindow.tabs[0].id, {
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
                        });
                      },
                    );
                  }
                  // When the host is not trusted
                  else {
                    send(R_NOT_CONNECTED);
                  }
                });
              }
            });
          });
        })
        .catch(() => {
          send(R_INCORRECT_PASSWORD);
        });
    });
  });

export default sign;

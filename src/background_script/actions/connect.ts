import { get } from '../../helpers/storage';
import sendInterval from '../utils/sendInterval';
import { ISend, ISendCollection } from '../types';
import WindowManager from '../utils/WindowManager';
import hasLoggedBefore from '../utils/hasLoggedBefore';
import { IOption } from '../../popup/reducers/options';
import { IAccount } from '../../popup/reducers/accounts2';
import { ConnectMessageType } from '../../common/messageTypes';
import readConnectedWebsites from '../../helpers/readConnectedWebsites';
import {
  R_NO_ACCOUNT,
  R_INTERNAL_ERROR,
  R_INCORRECT_PASSWORD,
} from '../../common/responses';

const connect = (
  message: ConnectMessageType,
  send: ISend,
  sendCol: ISendCollection,
): Promise<chrome.windows.Window> =>
  new Promise((resolve) => {
    const { screenX, screenY, outerWidth } = message.detail;

    get('data').then((dataString) => {
      // When data == null
      if (!dataString) {
        return send(R_NO_ACCOUNT);
      }

      hasLoggedBefore()
        .then((hasLogged: string) => {
          if (!hasLogged) {
            WindowManager.create({ screenX, screenY, outerWidth })
              .then((newWindow) => {
                resolve(newWindow);

                const generatedId = Date.now().toString();
                sendCol[generatedId] = send;

                sendInterval(newWindow.tabs[0].id, {
                  generatedId,
                  page: '/login',
                  detail: message.detail,
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
              let isPrivacyModeOn = true;

              if (options) {
                isPrivacyModeOn = options.privacyMode;
              }

              // When user has accounts and privacyMode is off
              if (!isPrivacyModeOn) {
                send({
                  ok: true,
                  message: {
                    // name: activeAcconut.name,
                    publicKey: activeAcconut.publicKey,
                  },
                });

                return;
              }

              // When user has accounts and privacyMode is on
              get('connectedWebsites').then((rawConnectedWebsites: string[]) => {
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
                  send({
                    ok: true,
                    message: {
                      // name: activeAcconut.name,
                      publicKey: activeAcconut.publicKey,
                    },
                  });
                }

                // When the host is not trusted
                else {
                  WindowManager.create({ screenY, screenX, outerWidth })
                    .then((newWindow) => {
                      resolve(newWindow);

                      const generatedId = Date.now().toString();
                      sendCol[generatedId] = send;

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
                      send(R_INTERNAL_ERROR);
                    });
                }
              });
            });
          });
        })
        .catch(() => {
          send(R_INCORRECT_PASSWORD);
        });
    });
  });

export default connect;

import setTimer from '../utils/setTimer';
import { get } from '../../helpers/storage';
import { ISend, ISendCollection } from '../types';
import { IOption } from '../../popup/reducers/options';
import { IAccount } from '../../popup/reducers/accounts2';
import { LoginMessageType } from '../../common/messageTypes';
import { removeWindow } from 'background_script/utils/window';
import readConnectedWebsites from '../../helpers/readConnectedWebsites';
import { R_INCORRECT_PASSWORD, R_NO_ACCOUNT } from '../../common/responses';

const login = (
  message: LoginMessageType,
  send: ISend,
  sendCol: ISendCollection,
  window: chrome.windows.Window,
) => {
  get('data', message.values.password)
    .then((accounts: IAccount[]) => {
      setTimer(message.values.password);

      if (!accounts || !accounts.length) {
        sendCol[message.id](R_NO_ACCOUNT);
        removeWindow(window.id);

        return;
      }

      const activeAcconut = accounts.find((x) => x.active === true);

      get('options').then((options: IOption) => {
        let isPrivacyModeOn = true;

        if (options) {
          isPrivacyModeOn = options.privacyMode;
        }

        if (!isPrivacyModeOn) {
          sendCol[message.id]({
            ok: true,
            message: {
              publicKey: activeAcconut.publicKey,
            },
          });

          removeWindow(window.id);

          return;
        }

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
            sendCol[message.id]({
              ok: true,
              message: {
                publicKey: activeAcconut.publicKey,
              },
            });

            removeWindow(window.id);
          } else {
            send({
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
      send(R_INCORRECT_PASSWORD);
    });
};

export default login;

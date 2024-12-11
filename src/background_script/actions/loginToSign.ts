import setTimer from '../utils/setTimer';
import { get } from '../../helpers/storage';
import { ISend, ISendCollection } from '../types';
import WindowManager from '../utils/WindowManager';
import { IOption } from '../../popup/reducers/options';
import { IAccount } from '../../popup/reducers/accounts2';
import { LoginToSignMessageType } from '../../common/messageTypes';
import readConnectedWebsites from '../../helpers/readConnectedWebsites';
import {
  R_INCORRECT_PASSWORD,
  R_NOT_CONNECTED,
  R_NO_ACCOUNT,
} from '../../common/responses';

const loginToSign = (
  message: LoginToSignMessageType,
  send: ISend,
  sendCol: ISendCollection,
  window: chrome.windows.Window,
) => {
  get('data', message.values.password)
    .then((accounts: IAccount[]) => {
      setTimer(message.values.password);

      if (!accounts || !accounts.length) {
        sendCol[message.id](R_NO_ACCOUNT);
        WindowManager.remove(window.id);

        return;
      }

      const activeAcconut = accounts.find((x) => x.active === true);

      get('options').then((options: IOption) => {
        let isPrivacyModeOn = true;

        if (options) {
          isPrivacyModeOn = options.privacyMode;
        }

        if (!isPrivacyModeOn) {
          send({
            ok: true,
            message: {
              publicKey: activeAcconut.publicKey,
            },
          });
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
            send({
              ok: true,
              message: {
                publicKey: activeAcconut.publicKey,
              },
            });
          } else {
            sendCol[message.id](R_NOT_CONNECTED);

            WindowManager.remove(window.id);
          }
        });
      });
    })
    .catch(() => {
      send(R_INCORRECT_PASSWORD);
    });
};

export default loginToSign;

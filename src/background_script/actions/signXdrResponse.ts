import sign from '../utils/sign';
import { ISendCollection } from '../types';
import { get } from '../../helpers/storage';
import WindowManager from '../utils/WindowManager';
import hasLoggedBefore from '../utils/hasLoggedBefore';
import { IAccount } from '../../popup/reducers/accounts2';
import { SignXdrResponseType } from '../../common/messageTypes';
import {
  R_INVALID_XDR,
  R_NO_ACCOUNT,
  R_NO_USER_LOGGED,
  R_USER_REJECTED,
} from '../../common/responses';

const signXdrResponse = (
  message: SignXdrResponseType,
  sendCol: ISendCollection,
  window: chrome.windows.Window,
) => {
  if (message.result === 'confirm') {
    hasLoggedBefore()
      .then((hasLogged: string) => {
        if (!hasLogged) {
          return sendCol[message.id](R_NO_USER_LOGGED);
        }

        get('data', hasLogged).then((accounts: IAccount[]) => {
          if (!accounts || !accounts.length) {
            return sendCol[message.id](R_NO_ACCOUNT);
          }

          const activeAcconut = accounts.find((x) => x.active === true);

          const signed = sign(message.xdr.xdr, message.xdr.network, activeAcconut);

          sendCol[message.id]({
            ok: true,
            message: {
              xdr: signed,
            },
          });
        });
      })
      .catch(() => {
        sendCol[message.id](R_NO_USER_LOGGED);
      });
  } else if (message.result === 'close') {
    sendCol[message.id](R_INVALID_XDR);
  } else {
    sendCol[message.id](R_USER_REJECTED);
  }

  WindowManager.remove(window.id);
};

export default signXdrResponse;

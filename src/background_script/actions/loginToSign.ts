import setTimer from '../utils/setTimer';
import { get } from '../../helpers/storage';
import { removeWindow } from '../utils/window';
import { IAccount } from '../../popup/reducers/accounts2';
import isWebsiteConnected from '../utils/isWebsiteConnected';
import { ActionState, ISend, ISendCollection } from '../types';
import { LoginToSignMessageType } from '../../common/messageTypes';
import {
  R_NOT_CONNECTED,
  R_INCORRECT_PASSWORD,
} from '../../common/responses';

const loginToSign = async (
  message: LoginToSignMessageType,
  state: ActionState,
  send: ISend,
  sendCol: ISendCollection,
  window: chrome.windows.Window,
) => {
  try {
    const accounts = await get('data', message.values.password) as IAccount[];

    setTimer(message.values.password);

    let activeAccount = accounts.find((x) => x.active === true);
    if (!activeAccount) {
      activeAccount = accounts[0];
    }

    if (!state.options.privacyMode) {
      send({
        ok: true,
        message: {
          publicKey: activeAccount.publicKey,
        },
      });

      return;
    }

    const isHostConnected = isWebsiteConnected(state.connectedWebsites, message.detail.host, activeAccount.publicKey);

    if (isHostConnected) {
      send({
        ok: true,
        message: {
          publicKey: activeAccount.publicKey,
        },
      });
    } else {
      sendCol[message.id](R_NOT_CONNECTED);

      removeWindow(window.id);
    }
  } catch (e) {
    send(R_INCORRECT_PASSWORD);
  }
};

export default loginToSign;

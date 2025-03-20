import setTimer from '../utils/setTimer';
import { get } from '../../helpers/storage';
import { removeWindow } from '../utils/window';
import { IAccount } from '../../popup/reducers/accounts2';
import isWebsiteConnected from '../utils/isWebsiteConnected';
import { LoginMessageType } from '../../common/messageTypes';
import { R_INCORRECT_PASSWORD } from '../../common/responses';
import { ActionState, ISend, ISendCollection } from '../types';

const login = async (
  message: LoginMessageType,
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
      sendCol[message.id]({
        ok: true,
        message: {
          publicKey: activeAccount.publicKey,
        },
      });

      removeWindow(window.id);

      return;
    }

    const isHostConnected = isWebsiteConnected(state.connectedWebsites, message.detail.host, activeAccount.publicKey);

    if (isHostConnected) {
      sendCol[message.id]({
        ok: true,
        message: {
          publicKey: activeAccount.publicKey,
        },
      });

      removeWindow(window.id);
    } else {
      send({
        ok: true,
        message: {
          name: activeAccount.name,
          publicKey: activeAccount.publicKey,
        },
      });
    }
  } catch (e) {
    send(R_INCORRECT_PASSWORD);
  }
};

export default login;

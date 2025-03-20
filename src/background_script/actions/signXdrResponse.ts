import sign from '../utils/sign';
import { removeWindow } from '../utils/window';
import { ActionState, ISendCollection } from '../types';
import { SignXdrResponseType } from '../../common/messageTypes';
import {
  R_INVALID_XDR,
  R_USER_REJECTED,
  R_NO_USER_LOGGED,
} from '../../common/responses';

const signXdrResponse = (
  message: SignXdrResponseType,
  state: ActionState,
  sendCol: ISendCollection,
  window: chrome.windows.Window,
) => {
  try {
    if (message.result === 'confirm') {
      if (state.needsLogin) {
        return sendCol[message.id](R_NO_USER_LOGGED);
      }

      const signed = sign(message.xdr.xdr, message.xdr.network, state.activeAccount);

      sendCol[message.id]({
        ok: true,
        message: {
          xdr: signed,
        },
      });
    } else if (message.result === 'close') {
      sendCol[message.id](R_INVALID_XDR);
    } else {
      sendCol[message.id](R_USER_REJECTED);
    }

    removeWindow(window.id);
  } catch (e) {
    sendCol[message.id](R_USER_REJECTED);
  }
};

export default signXdrResponse;

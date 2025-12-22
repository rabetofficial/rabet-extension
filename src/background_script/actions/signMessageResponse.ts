import { removeWindow } from '../utils/window';
import signMessage from '../utils/signMessage';
import { ActionState, ISendCollection } from '../types';
import { SignMessageResponseType } from '../../common/messageTypes';
import { R_INVALID_XDR, R_USER_REJECTED, R_NO_USER_LOGGED } from '../../common/responses';

const signMessageResponse = (
  message: SignMessageResponseType,
  state: ActionState,
  sendCol: ISendCollection,
  window: chrome.windows.Window,
) => {
  try {
    if (message.result === 'confirm') {
      if (state.needsLogin) {
        return sendCol[message.id](R_NO_USER_LOGGED);
      }

      const signed = signMessage(message.message.message, state.activeAccount);

      sendCol[message.id]({
        ok: true,
        message: {
          message: signed,
        },
      });
    } else if (message.result === 'close') {
      sendCol[message.id](R_INVALID_XDR);
    } else {
      sendCol[message.id](R_USER_REJECTED);
    }

    removeWindow(window.id);
  } catch (e) {
    return sendCol[message.id](R_USER_REJECTED);
  }
};

export default signMessageResponse;

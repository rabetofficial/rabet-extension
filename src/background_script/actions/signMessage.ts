import { createWindow } from '../utils/window';
import { E_GENERATED_ID } from '../../common/messageEvents';
import isWebsiteConnected from '../utils/isWebsiteConnected';
import { ActionState, ISend, ISendCollection } from '../types';
import { SignMessageDetailType } from '../../common/messageTypes';
import { R_NOT_CONNECTED, R_INTERNAL_ERROR } from '../../common/responses';

const signMessage = async (
  message: SignMessageDetailType,
  state: ActionState,
  send: ISend,
  sendCol: ISendCollection,
): Promise<chrome.windows.Window | null> => {
  const { screenX, screenY, outerWidth } = message.detail;

  if (state.needsLogin) {
    try {
      const { window, generatedId } = await createWindow(
        { screenX, screenY, outerWidth },
        {
          page: '/login',
          detail: message.detail,
          destination: 'sign',
          message: {
            message: message.detail.message,
          },
        },
      );

      sendCol[generatedId] = send;

      return window;
    } catch (e) {
      send(R_INTERNAL_ERROR);

      return null;
    }
  }

  if (!state.options.privacyMode) {
    try {
      const { window, generatedId } = await createWindow(
        { screenX, screenY, outerWidth },
        {
          type: E_GENERATED_ID,
          page: '/confirm',
          detail: message.detail,
          message: {
            message: message.detail.message,
          },
          activeAcconut: {
            name: state.activeAccount.name,
            publicKey: state.activeAccount.publicKey,
          },
        },
      );

      sendCol[generatedId] = send;

      return window;
    } catch (e) {
      send(R_INTERNAL_ERROR);

      return null;
    }
  } else {
    const isHostConnected = isWebsiteConnected(
      state.connectedWebsites,
      message.detail.host,
      state.activeAccount.publicKey,
    );

    // When the host is trusted
    if (isHostConnected) {
      try {
        const { window, generatedId } = await createWindow(
          {
            screenX,
            screenY,
            outerWidth,
          },
          {
            page: '/confirm',
            detail: message.detail,
            message: {
              message: message.detail.message,
            },
            activeAcconut: {
              name: state.activeAccount.name,
              publicKey: state.activeAccount.publicKey,
            },
          },
        );

        sendCol[generatedId] = send;

        return window;
      } catch (e) {
        send(R_NOT_CONNECTED);

        return null;
      }
    }
    // When the host is not trusted
    else {
      send(R_NOT_CONNECTED);

      return null;
    }
  }
};

export default signMessage;

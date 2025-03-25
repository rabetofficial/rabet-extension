import { createWindow } from '../utils/window';
import { R_INTERNAL_ERROR } from '../../common/responses';
import isWebsiteConnected from '../utils/isWebsiteConnected';
import { ActionState, ISend, ISendCollection } from '../types';
import { ConnectMessageType } from '../../common/messageTypes';

const connect = async (
  message: ConnectMessageType,
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
    send({
      ok: true,
      message: {
        publicKey: state.activeAccount.publicKey,
      },
    });

    return null;
  }

  const isHostConnected = isWebsiteConnected(state.connectedWebsites, message.detail.host, state.activeAccount.publicKey);

  if (isHostConnected) {
    send({
      ok: true,
      message: {
        publicKey: state.activeAccount.publicKey,
      },
    });

    return null;
  }

  try {
    const { window, generatedId } = await createWindow(
      { screenY, screenX, outerWidth },
      {
        page: '/contact-request',
        detail: message.detail,
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
};

export default connect;

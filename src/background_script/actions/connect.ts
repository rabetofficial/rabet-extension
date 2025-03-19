import { getAsync } from 'helpers/chromeHelper';
import { ISend, ISendCollection } from '../types';
import { getAndDecrypt } from '../../helpers/storage';
import hasLoggedBefore from '../utils/hasLoggedBefore';
import { IOption } from '../../popup/reducers/options';
import { IAccount } from '../../popup/reducers/accounts2';
import { createWindow } from 'background_script/utils/window';
import { ConnectMessageType } from '../../common/messageTypes';
import { R_NO_ACCOUNT, R_INTERNAL_ERROR } from '../../common/responses';

const connect = async (
  message: ConnectMessageType,
  send: ISend,
  sendCol: ISendCollection,
): Promise<chrome.windows.Window | null> => {
  const { screenX, screenY, outerWidth } = message.detail;

  const rawData = await getAsync<string>('data');

  if (!rawData) {
    send(R_NO_ACCOUNT);

    return null;
  }

  const password = await hasLoggedBefore();

  if (!password) {
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

  const accounts = await getAndDecrypt<IAccount[]>('data', password);

  if (!accounts || !accounts.length) {
    send(R_NO_ACCOUNT);

    return null;
  }

  const activeAcconut = accounts.find((x) => x.active === true);
  const options = await getAsync<IOption | null>('options');

  let isPrivacyModeOn = true;
  if (options) {
    isPrivacyModeOn = options.privacyMode;
  }

  // When user has accounts and privacyMode is off
  if (!isPrivacyModeOn) {
    send({
      ok: true,
      message: {
        publicKey: activeAcconut.publicKey,
      },
    });

    return null;
  }

  // When user has accounts and privacyMode is on
  const connectedWebsites = await getAsync<string[]>('connectedWebsites');

  let isHostConnected = false;

  if (!connectedWebsites || !connectedWebsites.length) {
    isHostConnected = false;
  } else {
    isHostConnected = connectedWebsites.some(
      (x) => x === `${message.detail.host}/${activeAcconut.publicKey}`,
    );
  }

  if (isHostConnected) {
    send({
      ok: true,
      message: {
        publicKey: activeAcconut.publicKey,
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
          name: activeAcconut.name,
          publicKey: activeAcconut.publicKey,
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

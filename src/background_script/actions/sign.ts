import getNetwork from '../../helpers/getNetwork';
import { ISend, ISendCollection } from '../types';
import { getAndDecrypt } from '../../helpers/storage';
import hasLoggedBefore from '../utils/hasLoggedBefore';
import { IOption } from '../../popup/reducers/options';
import { IAccount } from '../../popup/reducers/accounts2';
import { SignMessageType } from '../../common/messageTypes';
import { E_GENERATED_ID } from '../../common/messageEvents';
import readConnectedWebsites from '../../helpers/readConnectedWebsites';
import {
  R_INCORRECT_PASSWORD,
  R_INTERNAL_ERROR,
  R_NOT_CONNECTED,
  R_NO_ACCOUNT,
} from '../../common/responses';
import { getAsync } from 'helpers/chromeHelper';
import { createWindow } from 'background_script/utils/window';

const sign = async (
  message: SignMessageType,
  send: ISend,
  sendCol: ISendCollection,
): Promise<chrome.windows.Window | null> => {
  const network = getNetwork(message.detail.network);
  const { screenX, screenY, outerWidth } = message.detail;

  const rawData = await getAsync<string>('data');

  if (!rawData) {
    return send(R_NO_ACCOUNT);
  }

  let password: string;

  try {
    password = await hasLoggedBefore();
  } catch (e) {
    send(R_INCORRECT_PASSWORD);

    return null;
  }

  if (!password) {
    try {
      const { window, generatedId } = await createWindow(
        { screenX, screenY, outerWidth },
        {
          page: '/login',
          detail: message.detail,
          destination: 'sign',
          xdr: {
            xdr: message.detail.xdr,
            network,
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

  // When the user has logged before
  const accounts = await getAndDecrypt<IAccount[]>('data', password);

  // When user has no accounts
  if (!accounts || !accounts.length) {
    send(R_NO_ACCOUNT);

    return;
  }

  const activeAcconut = accounts.find((x) => x.active === true);

  const options = await getAsync<IOption>('options');

  const isPrivacyModeOn = !options ? true : options.privacyMode;

  if (!isPrivacyModeOn) {
    try {
      const { window, generatedId } = await createWindow(
        { screenX, screenY, outerWidth },
        {
          type: E_GENERATED_ID,
          page: '/confirm',
          detail: message.detail,
          xdr: {
            xdr: message.detail.xdr,
            network,
          },
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
  } else {
    // When user has accounts and privacyMode is on
    const rawConnectedWebsites = await getAsync<string | string[]>('connectedWebsites');
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
            xdr: {
              xdr: message.detail.xdr,
              network,
            },
            activeAcconut: {
              name: activeAcconut.name,
              publicKey: activeAcconut.publicKey,
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

export default sign;

import { R_NO_MSG_RECEIVED } from '../common/responses';
import { ConnectMessageType } from '../common/messageTypes';
import { E_CONNECT, E_CONNECT_RES } from '../common/messageEvents';

interface IRabet {
  close: () => any;
  connect: () => any;
  disconnect: () => any;
  isUnlocked: () => any;
  sign: (xdr: string, network: string) => any;
  on: (eventName: string, cb: (network?: string) => void) => any;
}

const rabet: Partial<IRabet> = {};

rabet.connect = () =>
  new Promise((resolve, reject) => {
    const connectMessage: ConnectMessageType = {
      detail: {
        host: window.location.host || 'test.org',
        href: window.location.href,
        title: document.title,
        screenX: window.screenX,
        screenY: window.screenY,
        outerWidth: window.outerWidth,
      },
    };

    document.dispatchEvent(new CustomEvent(E_CONNECT, connectMessage));

    document.addEventListener(E_CONNECT_RES, (e) => {
      // @ts-ignore
      const detail = JSON.parse(e.detail);

      if (!detail) {
        reject(R_NO_MSG_RECEIVED);

        return;
      }

      if (!detail.ok) {
        reject({
          error: detail.message,
        });

        return;
      }

      resolve({
        ...detail.message,
      });
    });
  });

rabet.sign = (xdr, network) =>
  new Promise((resolve, reject) => {
    document.dispatchEvent(
      new CustomEvent('RABET_EXTENSION_SIGN', {
        detail: {
          xdr,
          network,
          host: window.location.host || 'test.org',
          title: document.title,
          screenX: window.screenX,
          screenY: window.screenY,
          outerWidth: window.outerWidth,
        },
      }),
    );

    if (!xdr) {
      reject({
        error: 'No XDR',
      });

      return;
    }

    if (!network) {
      reject({
        error: 'No network',
      });

      return;
    }

    document.addEventListener('RABET_EXTENSION_SIGN_RESPONSE', (e) => {
      // @ts-ignore
      const detail = JSON.parse(e.detail);

      if (!detail) {
        reject({
          error: 'no-message-received',
        });

        return;
      }

      // const detail = JSON.parse(e.detail);

      if (!detail.ok) {
        reject({
          error: detail.message,
        });

        return;
      }

      resolve({
        ...detail.message,
      });
    });
  });

rabet.on = (eventName, cb) => {
  let event: string;

  if (eventName === 'accountChanged') {
    event = 'RABET_EXTENSION_CHANGE_ACCOUNT_EVENT';
  } else if (eventName === 'networkChanged') {
    event = 'RABET_EXTENSION_CHANGE_NETWORK_EVENT';
  }

  document.addEventListener(event, (e) => {
    if (e.type === 'RABET_EXTENSION_CHANGE_NETWORK_EVENT') {
      // @ts-ignore
      cb(e.detail.network);
    } else {
      cb();
    }
  });
};

rabet.close = () =>
  new Promise((resolve) => {
    document.dispatchEvent(new CustomEvent('RABET_EXTENSION_CLOSE_WINDOW', {}));

    document.addEventListener('RABET_EXTENSION_CLOSE_WINDOW_RESPONSE', () => {
      resolve();
    });
  });

rabet.disconnect = () =>
  new Promise((resolve, reject) => {
    document.dispatchEvent(
      new CustomEvent('RABET_EXTENSION_DISCONNECT', {
        detail: {
          host: window.location.host || 'test.org',
          href: window.location.href,
        },
      }),
    );

    document.addEventListener('RABET_EXTENSION_DISCONNECT_RESPONSE', (e) => {
      // @ts-ignore
      const detail = JSON.parse(e.detail);

      if (detail.ok) {
        resolve();
      } else {
        reject({
          error: 'unknown-error',
        });
      }
    });
  });

rabet.isUnlocked = () =>
  new Promise((resolve) => {
    document.dispatchEvent(
      new CustomEvent('RABET_EXTENSION_IS_UNLOCKED', {
        detail: {
          host: window.location.host || 'test.org',
          href: window.location.href,
        },
      }),
    );

    document.addEventListener('RABET_EXTENSION_IS_UNLOCKED_RESPONSE', (e) => {
      // @ts-ignore
      const detail = JSON.parse(e.detail);

      if (detail.ok) {
        resolve(detail.isUnlocked);
      }
    });
  });

window.rabet = rabet;

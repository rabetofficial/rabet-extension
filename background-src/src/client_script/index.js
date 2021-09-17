const rabet = {};

rabet.connect = () =>
  new Promise((resolve, reject) => {
    document.dispatchEvent(
      new CustomEvent('RABET_EXTENSION_CONNECT', {
        detail: {
          host: window.location.host || 'test.org',
          href: window.location.href,
          title: document.title,
          screenX: window.screenX,
          screenY: window.screenY,
          outerWidth: window.outerWidth,
        },
      }),
    );

    document.addEventListener('RABET_EXTENSION_CONNECT_RESPONSE', function (e) {
      const { detail: det } = e;
      const detail = JSON.parse(det);

      if (!detail) {
        reject({
          error: 'no-message-received',
        });

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

    document.addEventListener('RABET_EXTENSION_SIGN_RESPONSE', function (e) {
      const { detail: det } = e;
      const detail = JSON.parse(det);

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
  let event;

  if (eventName === 'accountsChanged') {
    event = 'RABET_EXTENSION_CHANGE_ACCOUNT_EVENT';
  } else if (eventName === 'networkChanged') {
    event = 'RABET_EXTENSION_CHANGE_NETWORK_EVENT';
  }

  document.addEventListener(event, (e) => {
    if (e.type === 'RABET_EXTENSION_CHANGE_NETWORK_EVENT') {
      cb(e.detail.network);
    } else {
      cb();
    }
  });
}

window.rabet = rabet;

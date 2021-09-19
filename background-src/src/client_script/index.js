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

  if (eventName === 'accountChanged') {
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

rabet.close = () => new Promise((resolve) => {
  document.dispatchEvent(new CustomEvent('RABET_EXTENSION_CLOSE_WINDOW', {}));

  document.addEventListener('RABET_EXTENSION_CLOSE_WINDOW_RESPONSE', function () {
    resolve();
  });
});

rabet.disconnect = () => new Promise((resolve, reject) => {
  document.dispatchEvent(new CustomEvent('RABET_EXTENSION_DISCONNECT', {
    detail: {
      host: window.location.host || 'test.org',
      href: window.location.href,
    },
  }));

  document.addEventListener('RABET_EXTENSION_DISCONNECT_RESPONSE', function (e) {
    const { detail: det } = e;
    const detail = JSON.parse(det);

    if (detail.ok) {
      resolve();
    } else {
      reject({
        error: 'unknown-error',
      });
    }
  });
});

rabet.isUnlocked = () => new Promise((resolve) => {
  document.dispatchEvent(new CustomEvent('RABET_EXTENSION_IS_UNLOCKED', {
    detail: {
      host: window.location.host || 'test.org',
      href: window.location.href,
    },
  }));

  document.addEventListener('RABET_EXTENSION_IS_UNLOCKED_RESPONSE', function (e) {
    const { detail: det } = e;
    const detail = JSON.parse(det);

    if (detail.ok) {
      resolve(detail.isUnlocked);
    }
  });
});

window.rabet = rabet;

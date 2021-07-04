const rabet = {};

rabet.connect = () =>
  new Promise((resolve, reject) => {
    document.addEventListener('RABET_EXTENSION_CONNECT_RESPONSE', function (e) {
      if (!e.detail) {
        reject({
          error: 'no-message-received',
        });

        return;
      }

      const detail = JSON.parse(e.detail);

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

    setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent('RABET_EXTENSION_CONNECT', {
          detail: {
            host: window.location.host || 'test.org',
            title: document.title,
          },
        }),
      );
    }, 200);
  });

rabet.sign = (xdr, network) =>
  new Promise((resolve, reject) => {
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
      if (!e.detail) {
        reject({
          error: 'no-message-received',
        });

        return;
      }

      const detail = JSON.parse(e.detail);

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

    setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent('RABET_EXTENSION_SIGN', {
          detail: {
            xdr,
            network,
            host: window.location.host || 'test.org',
            title: document.title,
          },
        }),
      );
    }, 200);
  });

window.rabet = rabet;

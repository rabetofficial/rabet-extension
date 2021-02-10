const rabet = {};

rabet.connect = () => new Promise((resolve, reject) => {
  document.addEventListener('RABET_EXTENSION_CONNECT_RESPONSE', function(e) {
    resolve(e.detail);
  });

  setTimeout(() => {
    document.dispatchEvent(new CustomEvent('RABET_EXTENSION_CONNECT', {
      detail: {
        host: window.location.host,
        title: document.title,
      }
    }));
  }, 200);
});

rabet.sign = (xdr, network) => new Promise((resolve, reject) => {
  document.addEventListener('RABET_EXTENSION_SIGN_RESPONSE', function(e) {
    resolve(e.detail);
  });

  setTimeout(() => {
    document.dispatchEvent(new CustomEvent('RABET_EXTENSION_SIGN', {
      detail: {
        xdr,
        network,
      }
    }));
  }, 200);
});


window.rabet = rabet;

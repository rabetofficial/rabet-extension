export default (e) => {
  chrome.runtime.sendMessage(
    {
      type: 'RABET_EXTENSION_CONNECT',
      detail: e.detail,
    },
    (response) => {
      document.dispatchEvent(
        new CustomEvent('RABET_EXTENSION_CONNECT_RESPONSE', {
          detail: response,
        }),
      );
    },
  );
};

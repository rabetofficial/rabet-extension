const sendInterval = (id, o) => {
  const options = {
    type: 'RABET_GENERATED_ID',
    ...o,
  };

  const p = setInterval(() => {
    chrome.tabs.sendMessage(id, options, (response) => {
      if (response && response.type === 'RABET_GENERATED_ID_RECEIVED') {
        clearInterval(p);
      }
    });
  }, 100);
};

export default sendInterval;

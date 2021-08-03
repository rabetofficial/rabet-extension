export default (type, responseType, isDetail) => {
  return (e) => {
    chrome.runtime.sendMessage(
      {
        type,
        detail: isDetail ? e.detail : e,
      },
      (res) => {      
        const response = JSON.parse(res);

        document.dispatchEvent(
          new CustomEvent(responseType, {
            detail: response,
          }),
        );
      },
    );
  };
};

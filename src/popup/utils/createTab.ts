const createTab = (url: string) => {
  chrome.tabs.create({ url });
};

export default createTab;

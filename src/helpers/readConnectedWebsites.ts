const readConnectedWebsites = (connectedWebsites: any): string[] => {
  let websites;

  if (typeof connectedWebsites === 'string') {
    websites = JSON.parse(connectedWebsites);
  } else if (typeof connectedWebsites === 'object') {
    websites = connectedWebsites;
  }

  websites = websites || [];

  return websites;
};

export default readConnectedWebsites;

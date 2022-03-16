import store from 'popup/store';

const isOtherConnected = (publicKey: string, host: string) => {
  const { connectedWebsites } = store.getState().user;
  const pair = `${host}/${publicKey}`;

  const connectedToHost = connectedWebsites.filter((x) =>
    x.includes(host),
  );

  if (!connectedToHost.length) {
    return false;
  }

  const otherConnectedResult = connectedToHost.some(
    (x) => x !== pair,
  );

  return otherConnectedResult;
};

export default isOtherConnected;

import readConnectedWebsites from "helpers/readConnectedWebsites";

const isWebsiteConnected = (rawConnectedWebsites: string[], host: string, publicKey: string): boolean => {
  const connectedWebsites = readConnectedWebsites(rawConnectedWebsites);

  let isHostConnected = false;

  if (!connectedWebsites || !connectedWebsites.length) {
    isHostConnected = false;
  } else {
    isHostConnected = connectedWebsites.some(
      (x) => x.toLowerCase() === `${host.toLowerCase()}/${publicKey.toLowerCase()}`,
    );
  }

  return isHostConnected;
};

export default isWebsiteConnected;


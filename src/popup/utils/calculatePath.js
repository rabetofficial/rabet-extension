import StellarSdk from 'stellar-sdk';

const calculatePath = (p) => {
  const path = [...p.slice(1, p.length - 1)];
  const newPath = [];

  for (let i = 0; i < path.length; i += 1) {
    const asset = path[i];

    if (asset.asset_type === 'native') {
      newPath.push(StellarSdk.Asset.native());
    } else {
      newPath.push(
        new StellarSdk.Asset(asset.asset_code, asset.asset_issuer),
      );
    }
  }

  return newPath;
};

export default calculatePath;

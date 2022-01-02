import StellarSdk from 'stellar-sdk';

const calculatePath = (path) => {
  const newPath = [];

  for (let i = 1; i < path.length - 1; i += 1) {
    const asset = path[i];

    console.log(asset);

    if (asset) {
      if (asset.asset_type === 'native') {
        newPath.push(StellarSdk.Asset.native());
      } else {
        newPath.push(new StellarSdk.Asset(
          asset.asset_code,
          asset.asset_issuer,
        ));
      }
    }
  }

  return newPath;
};

export default calculatePath;

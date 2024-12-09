import { Asset } from '@stellar/stellar-sdk';

const calculatePath = (paths: any[]) => {
  const path = [...paths.slice(1, paths.length - 1)];
  const newPath = [];

  for (let i = 0; i < path.length; i += 1) {
    const asset = path[i];

    if (asset.asset_type === 'native') {
      newPath.push(Asset.native());
    } else {
      newPath.push(new Asset(asset.asset_code, asset.asset_issuer));
    }
  }

  return newPath;
};

export default calculatePath;

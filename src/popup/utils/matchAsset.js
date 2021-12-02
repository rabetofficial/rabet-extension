const matchAsset = (x, asset) => x.asset_code === asset.asset_code
  && x.asset_issuer === asset.asset_issuer;

export default matchAsset;

type AssetLike = {
  asset_code: string;
  asset_issuer: string;
};

const matchAsset = (asset1: AssetLike, asset2: AssetLike): boolean =>
  asset1.asset_code === asset2.asset_code &&
  asset1.asset_issuer === asset2.asset_issuer;

export default matchAsset;

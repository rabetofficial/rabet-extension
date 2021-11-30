const nativeAsset = (asset) => asset.asset_type === 'native'
  && asset.asset_code === 'XLM';

export default nativeAsset;

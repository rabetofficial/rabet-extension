const showAsset = (asset) => {
  if (asset.asset_type === 'native') {
    return 'XLM';
  }

  return asset.asset_code;
};

export default showAsset;

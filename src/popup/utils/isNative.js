const isNative = (asset) => {
  if (asset.asset_type === 'native' && asset.asset_code === 'XLM') {
    return true;
  }

  return false;
};

export default isNative;

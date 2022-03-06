import { Horizon } from 'stellar-sdk';
import { useState, useEffect } from 'react';

import getAccount from 'popup/api/getAccount';

type AssetInfo = {
  balance: string;
  asset_code: string;
  asset_issuer: string;
  home_domain?: string;
  flags?: Horizon.Flags;
};

type useAssetInfoResult = {
  assetData: AssetInfo | null;
  loading: boolean;
  error: null | string;
};

const useAssetInfo = (
  asset: Horizon.BalanceLine,
): useAssetInfoResult => {
  const [assetData, setAssetData] = useState<AssetInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (asset.asset_type === 'native') {
      setAssetData({
        asset_code: 'XLM',
        asset_issuer: '',
        balance: asset.balance,
      });
    } else if (asset.asset_type === 'liquidity_pool_shares') {
      setAssetData({
        asset_code: '',
        asset_issuer: '',
        balance: '0',
      });
    } else {
      setAssetData({
        asset_code: asset.asset_code,
        asset_issuer: asset.asset_issuer,
        balance: asset.balance,
      });

      getAccount(asset.asset_issuer).then((res) => {
        if (!res) {
          setError('ERROR');
        } else {
          setAssetData({
            balance: asset.balance,
            asset_code: asset.asset_code,
            asset_issuer: asset.asset_issuer,
            home_domain: res.home_domain,
            flags: res.flags,
          });
        }

        setLoading(false);
      });
    }
  }, [asset]);

  return {
    assetData,
    loading,
    error,
  };
};

export default useAssetInfo;

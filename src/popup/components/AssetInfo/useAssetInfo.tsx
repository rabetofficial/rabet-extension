import { Horizon } from '@stellar/stellar-sdk';
import { useState, useEffect } from 'react';

import getAccount from 'popup/api/getAccount';

type AssetInfo = {
  balance: string;
  asset_code: string;
  asset_issuer: string;
  home_domain?: string;
  flags?: Horizon.HorizonApi.Flags;
  selling_liabilities: string;
  buying_liabilities: string;
};

type useAssetInfoResult = {
  assetData: AssetInfo | null;
  loading: boolean;
  error: null | string;
};

const useAssetInfo = (
  asset: Horizon.HorizonApi.BalanceLine,
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
        selling_liabilities: asset.selling_liabilities,
        buying_liabilities: asset.buying_liabilities,
      });
    } else if (asset.asset_type === 'liquidity_pool_shares') {
      setAssetData({
        asset_code: '',
        asset_issuer: '',
        balance: '0',
        selling_liabilities: '1',
        buying_liabilities: '1',
      });
    } else {
      setAssetData({
        asset_code: asset.asset_code,
        asset_issuer: asset.asset_issuer,
        balance: asset.balance,
        selling_liabilities: asset.selling_liabilities,
        buying_liabilities: asset.buying_liabilities,
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
            selling_liabilities: asset.selling_liabilities,
            buying_liabilities: asset.buying_liabilities,
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

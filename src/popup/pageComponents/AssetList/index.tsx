import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useTypedSelector from 'popup/hooks/useTypedSelector';
import useActiveAccount from 'popup/hooks/useActiveAccount';

import Asset from 'popup/components/Asset';
import * as route from 'popup/staticRes/routes';
import getAssetsImages from 'popup/utils/server/getAssetsImages';
import loadAssetImagesAction from 'popup/actions/assetImages/load';

import * as S from './styles';

type AssetsListTypes = { items: any[]; maxHeight: number };
const AssetList = (props: AssetsListTypes) => {
  const { items, maxHeight } = props;
  const [options, currencies] = useTypedSelector((store) => [
    store.options,
    store.currencies,
  ]);

  const activeAccount = useActiveAccount();
  const { balances } = activeAccount;

  useEffect(() => {
    getAssetsImages(balances || []).then((result: any) => {
      loadAssetImagesAction(result, activeAccount.publicKey);
    });
  }, []);

  const activeCurrency = currencies[options.currency] || {
    value: 0,
    currency: 'USD',
  };

  return (
    <S.List style={{ maxHeight: `${maxHeight}px` }}>
      <S.AddAsset>
        <Link to={route.addAssetPage}>+ Add asset</Link>
      </S.AddAsset>

      {items.map((item, index) => (
        <Asset
          item={item}
          index={index}
          assets={balances}
          itemsLength={items.length}
          activeCurrency={activeCurrency}
          key={`${item.asset_issuer}:${item.asset_code}`}
        />
      ))}
    </S.List>
  );
};

export default AssetList;

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import AssetInfoContent from 'popup/pageComponents/AssetInfo';
import ScrollBar from 'popup/components/common/ScrollBar';

const AssetInfo = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const { asset_code, asset_issuer, asset_type } = useParams();

  const assets = account.assets || [];

  let isNative = false;
  let asset = assets.find(
    (ast) =>
      ast.asset_type === asset_type &&
      ast.asset_code === asset_code &&
      ast.asset_issuer === asset_issuer,
  );

  if (asset_type === 'native') {
    isNative = true;

    asset = assets.find((ast) => ast.asset_type === 'native');
  }

  const handleBeforeDelete = () => {
    navigate(RouteName.LoadingNetwork);
  };

  const onDelete = (result: [boolean, string]) => {
    if (result[0]) {
      navigate(RouteName.Sucess, {
        state: {
          message: result[1],
        },
      });
    } else {
      navigate(RouteName.Error, {
        state: {
          message: result[1],
        },
      });
    }
  };

  const onCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  return (
    <>
      <Header />

      <ExtTitle
        className="content mt-[20px]"
        title={`Assets | ${asset_code || 'XLM'}`}
      />

      <ScrollBar isHidden maxHeight={600}>
        <AssetInfoContent
          asset={asset}
          isNative={isNative}
          onCancel={onCancel}
          onDelete={onDelete}
          onBeforeDelete={handleBeforeDelete}
        />
      </ScrollBar>
    </>
  );
};

export default AssetInfo;

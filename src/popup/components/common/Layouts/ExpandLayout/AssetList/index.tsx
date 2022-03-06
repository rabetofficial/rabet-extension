import React from 'react';
import { Horizon } from 'stellar-sdk';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import NoDate from 'popup/components/common/Nodata';
import AssetInfo from 'popup/pageComponents/AssetInfo';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
import ScrollBar from 'popup/components/common/ScrollBar';
import handleAssetsKeys from 'popup/utils/handleAssetKeys';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import {
  openErrorModal,
  openSucessModal,
  openLoadingModal,
} from 'popup/components/Modals';

import Asset from './Asset';
import { Border } from './styles';

type AssetsListProps = {
  isExtension?: boolean;
  scrollMaxHeight?: number;
};

const AssetList = ({
  isExtension,
  scrollMaxHeight,
}: AssetsListProps) => {
  const navigate = useNavigate();
  const { assets: asts } = useActiveAccount();
  const assets = asts || [];

  const showDeleteResult = (result: [boolean, string]) => {
    if (result[0]) {
      openSucessModal({
        message: result[1],
        onClick: closeModalAction,
      });
    } else {
      openErrorModal({
        message: result[1],
        onClick: closeModalAction,
      });
    }
  };

  const openAssetInfoModal = (asset: Horizon.BalanceLine) => {
    if (asset.asset_type === 'native') {
      openModalAction({
        isStyled: false,
        title: 'Asset info',
        size: 'medium',
        padding: 'medium',
        minHeight: 597,
        children: (
          <AssetInfo
            isNative
            asset={asset}
            onCancel={closeModalAction}
            onDelete={showDeleteResult}
            onBeforeDelete={() => {
              openLoadingModal({});
            }}
          >
            <PageTitle
              title="Asset | XLM"
              padding="0"
              onClose={closeModalAction}
            />
          </AssetInfo>
        ),
      });
    } else {
      openModalAction({
        isStyled: false,
        title: 'Asset info',
        size: 'medium',
        padding: 'medium',
        minHeight: 597,
        children: (
          <AssetInfo
            asset={asset}
            onCancel={closeModalAction}
            onDelete={showDeleteResult}
            onBeforeDelete={() => {
              openLoadingModal({});
            }}
          >
            <PageTitle
              title="Asset info"
              padding="0"
              onClose={closeModalAction}
            />
          </AssetInfo>
        ),
      });
    }
  };

  const openAssetInfoPage = (asset: Horizon.BalanceLine) => {
    if (
      asset.asset_type === 'native' ||
      asset.asset_type === 'liquidity_pool_shares'
    ) {
      navigate(`${RouteName.AssetInfo}/XLM/none/native`);
    } else {
      navigate(
        `${RouteName.AssetInfo}/${asset.asset_code}/${asset.asset_issuer}/${asset.asset_type}`,
      );
    }
  };

  if (!assets.length) {
    return (
      <NoDate
        msg="No Assets"
        className="flex justify-center items-center min-h-[200px]"
      />
    );
  }

  return (
    <ScrollBar isHidden maxHeight={scrollMaxHeight}>
      {assets.map((asset) => (
        <Border
          key={`assetList${handleAssetsKeys(asset)}`}
          onClick={() => {
            if (isExtension) {
              openAssetInfoPage(asset);
            } else {
              openAssetInfoModal(asset);
            }
          }}
        >
          <Asset asset={asset} />
        </Border>
      ))}
    </ScrollBar>
  );
};

AssetList.defaultProps = {
  scrollMaxHeight: 320,
  isExtension: false,
};

export default AssetList;

import React from 'react';
import { Horizon } from 'stellar-sdk';
import { Link, useNavigate } from 'react-router-dom';

import Plus from 'popup/svgs/Plus';
import RouteName from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import AssetInfo from 'popup/components/AssetInfo';
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
import { Usage } from 'popup/models';

import Asset from './Asset';
import { Hr, AddAssetBox } from './styles';

type AssetsListProps = {
  usage: Usage;
  scrollMaxHeight?: number;
};

const AssetList = ({ usage, scrollMaxHeight }: AssetsListProps) => {
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
            usage="desktop"
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

  return (
    <div
      style={{
        height: usage === 'extension' && '282px',
      }}
    >
      <div>
        <ScrollBar isHidden maxHeight={scrollMaxHeight}>
          {assets.map((asset, index) => (
            <div
              key={`assetList${handleAssetsKeys(asset)}`}
              onClick={() => {
                if (usage === 'extension') {
                  openAssetInfoPage(asset);
                } else {
                  openAssetInfoModal(asset);
                }
              }}
            >
              <Asset asset={asset} usage={usage} />
              {assets.length !== index + 1 && <Hr />}
            </div>
          ))}
          <div>
            {usage === 'extension' && (
              <Link to={RouteName.AddAsset}>
                <AddAssetBox
                  className="inline-flex items-center"
                  style={{
                    position:
                      assets.length < 4 ? 'absolute' : 'static',
                    bottom: assets.length < 4 ? '6px' : '0',
                  }}
                >
                  <span className="mr-1">
                    <Plus width="12" height="12" />
                  </span>
                  <p className="font-medium">Add assets</p>
                </AddAssetBox>
              </Link>
            )}
          </div>
        </ScrollBar>
      </div>
    </div>
  );
};

AssetList.defaultProps = {
  scrollMaxHeight: 320,
};

export default AssetList;

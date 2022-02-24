import React from 'react';
import { Horizon } from 'stellar-sdk';

import BN from 'helpers/BN';
import Trash from 'popup/svgs/Trash';
import Button from 'popup/components/common/Button';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';
import useAssetInfo from './useAssetInfo';

type AssetType = {
  onClick: () => void;
  onCancel: () => void;
  asset: Horizon.BalanceLine;
};

const Assets = ({ asset, onClick, onCancel }: AssetType) => {
  const { loading, error, assetData } = useAssetInfo(asset);

  const HandleDomain = () => {
    if (loading) {
      return <S.Info>Loading</S.Info>;
    }

    if (error) {
      return <S.Info>Error</S.Info>;
    }

    if (!assetData?.home_domain) {
      return <S.Info>No home domain</S.Info>;
    }

    return (
      <a
        href={`https://${assetData?.home_domain}`}
        target="_blank"
        rel="noreferrer"
      >
        {assetData?.home_domain}
      </a>
    );
  };

  const HandleFlags = () => {
    let required = '';
    let revocable = '';
    let immutable = '';
    let clawback = '';

    if (loading) {
      required = 'Loading';
      revocable = 'Loading';
      immutable = 'Loading';
      clawback = 'Loading';
    }

    if (error) {
      required = 'Error';
      revocable = 'Error';
      immutable = 'Error';
      clawback = 'Error';
    }

    if (!assetData?.flags) {
      required = '-';
      revocable = '-';
      immutable = '-';
      clawback = '-';
    } else {
      required = assetData?.flags.auth_revocable ? 'True' : 'False';
      revocable = assetData?.flags.auth_revocable ? 'True' : 'False';
      immutable = assetData?.flags.auth_revocable ? 'True' : 'False';
      clawback = assetData?.flags.auth_revocable ? 'True' : 'False';
    }

    return (
      <S.Table>
        <table>
          <thead>
            <tr>
              <th>Required</th>
              <th>Revocable</th>
              <th>Immutable</th>
              <th>Clawback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <S.Info>{required}</S.Info>
              </td>
              <td>
                <S.Info>{revocable}</S.Info>
              </td>
              <td>
                <S.Info>{immutable}</S.Info>
              </td>
              <td>
                <S.Info>{clawback}</S.Info>
              </td>
            </tr>
          </tbody>
        </table>
      </S.Table>
    );
  };

  const assetInfo = [
    {
      title: 'Assets code',
      value: assetData?.asset_code || 'LOADING',
    },
    {
      title: 'Issuer',
      value: assetData?.asset_issuer || 'LOADING',
    },
    {
      title: 'Website',
      value: <HandleDomain />,
    },
    {
      title: 'Assets type',
      value: asset.asset_type,
    },
  ];

  const isDeletable = new BN(assetData?.balance || '0').isEqualTo(
    '0',
  );

  return (
    <S.Page className="hidden-scroll content-scroll">
      {assetInfo.map((item, index) => (
        <div key={item.title}>
          <S.Title>{item.title}</S.Title>
          <S.Value>{item.value}</S.Value>
          {assetInfo.length - 1 !== index && <S.Hr />}
        </div>
      ))}
      <HandleFlags />
      {!isDeletable ? (
        <div className="error-box" style={{ marginTop: '16px' }}>
          You cannot remove this asset unless the asset&apos;s balance
          is zero.
        </div>
      ) : (
        ''
      )}
      <ButtonContainer
        btnSize={102}
        justify="end"
        positionStyles={{ bottom: '0px' }}
      >
        <Button
          variant="default"
          size="medium"
          content="Cancel"
          onClick={onCancel}
          style={{ marginRight: '7px' }}
        />

        <Button
          type="button"
          variant="danger"
          size="medium"
          content="Delete"
          disabled={!isDeletable}
          onClick={onClick}
          startIcon={<Trash />}
        />
      </ButtonContainer>
    </S.Page>
  );
};

export default Assets;

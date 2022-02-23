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
      return <p>Loading</p>;
    }

    if (error) {
      return <p>Error</p>;
    }

    if (!assetData?.home_domain) {
      return <p>No home domain</p>;
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
  ];

  const isDeletable = new BN(assetData?.balance || '0').isEqualTo(
    '0',
  );

  const deleteBtn = (
    <>
      <Trash />
      Delete
    </>
  );

  return (
    <>
      <S.Page className="hidden-scroll content-scroll">
        <div className="content">
          {assetInfo.map((item, index) => (
            <div key={item.title}>
              <S.Title>{item.title}</S.Title>
              <S.Value>{item.value}</S.Value>
              {assetInfo.length - 1 !== index && <S.Hr />}
            </div>
          ))}
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
                  <td>True</td>
                  <td>False</td>
                  <td>False</td>
                  <td>False</td>
                </tr>
              </tbody>
            </table>
          </S.Table>

          {!isDeletable ? (
            <div className="error-box" style={{ marginTop: '16px' }}>
              You cannot remove this asset unless the asset&apos;s
              balance is zero.
            </div>
          ) : (
            ''
          )}
        </div>
      </S.Page>

      <ButtonContainer btnSize={102} mt={32} justify="end">
        <Button
          type="button"
          variant="danger"
          size="medium"
          content={deleteBtn}
          disabled={!isDeletable}
          onClick={onClick}
          style={{ marginRight: '10px' }}
        />

        <Button
          variant="default"
          size="medium"
          content="Cancel"
          onClick={onCancel}
        />
      </ButtonContainer>
    </>
  );
};

export default Assets;

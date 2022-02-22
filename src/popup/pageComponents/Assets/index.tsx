import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { useNavigate, useParams } from 'react-router-dom';

import Header from 'popup/components/common/Header';
import Button from 'popup/components/common/Button';
import matchAsset from 'popup/utils/matchAsset';
import PageTitle from 'popup/components/PageTitle';
import addAssetAction from 'popup/actions/operations/addAsset';
import currentActiveAccount from 'popup/utils/activeAccount';
import getAssetWebsite from 'popup/utils/horizon/getAssetData';
import Trash from 'popup/svgs/Trash';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

type AssetType = {
  onClick: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
};
const Assets = ({ onClick, onCancel, children }: AssetType) => {
  const { asset_code, asset_issuer } = useParams();
  const navigate = useNavigate();
  const [homeDomain, setHomeDomain] = useState('');
  const [flags, setFlags] = useState({
    auth_required: false,
    auth_revocable: false,
    auth_immutable: false,
  });

  const {
    activeAccount: { balances },
  } = currentActiveAccount();
  const asset = balances.find((x) =>
    matchAsset(x, { asset_code, asset_issuer }),
  );

  useEffect(() => {
    getAssetWebsite(asset).then((assetData) => {
      setFlags(assetData.flags);
      setHomeDomain(assetData.homeDomain);
    });
  }, []);

  const handleDelete = ({ code, issuer }) => {
    addAssetAction({ code, issuer, limit: '0' }, navigate);
  };

  const assetInfo = [
    { title: 'Assets code', value: asset_code },
    { title: 'Issuer', value: asset_issuer },
    {
      title: 'Website',
      value: homeDomain && (
        <a
          href={`https://${homeDomain}`}
          target="_blank"
          rel="noreferrer"
        >
          {homeDomain}
        </a>
      ),
    },
  ];

  const deleteBtn = (
    <>
      <Trash />
      Delete
    </>
  );

  return (
    <>
      <S.Page className="hidden-scroll content-scroll">
        {children}
        <div className="content">
          {assetInfo.map((item, index) => (
            <div key={shortid.generate()}>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{flags.auth_required ? 'True' : 'False'}</td>
                  <td>{flags.auth_revocable ? 'True' : 'False'}</td>
                  <td>{flags.auth_immutable ? 'True' : 'False'}</td>
                </tr>
              </tbody>
            </table>
          </S.Table>

          {parseFloat(asset.balance) > 0 ? (
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
          disabled={parseFloat(asset.balance) > 0}
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

Assets.defaultProps = {
  children: '',
};

export default Assets;

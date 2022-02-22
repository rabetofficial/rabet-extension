import React from 'react';

import Trash from 'popup/svgs/Trash';
import Button from 'popup/components/common/Button';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

type AssetType = {
  onClick: () => void;
  onCancel: () => void;
};

const Assets = ({ onClick, onCancel }: AssetType) => {
  const assetInfo = [
    { title: 'Assets code', value: 'RBT' },
    {
      title: 'Issuer',
      value:
        'GD2BZUXNTR36T5NIJCMWAGJGBAYNZL6G3TMEJB4IJLX7KH2CBJPORDEQ',
    },
    {
      title: 'Website',
      value: 'RBTRBTRBT.com' && (
        <a href="https://rabet.io" target="_blank" rel="noreferrer">
          RABEBRB
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
        <div className="content">
          {assetInfo.map((item, index) => (
            <div key={index}>
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
                  <td>True</td>
                  <td>False</td>
                  <td>False</td>
                </tr>
              </tbody>
            </table>
          </S.Table>

          {parseFloat('2') > 0 ? (
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
          disabled={parseFloat('2') > 0}
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

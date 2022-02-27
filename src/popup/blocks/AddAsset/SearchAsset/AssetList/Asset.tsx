import React from 'react';

import matchAsset from 'popup/utils/matchAsset';
import CheckMarkFill from 'popup/svgs/CheckMarkFill';
import ImageOnErrorHandler from 'helpers/ImageOnErrorHandler';

import { AssetImageWithActive } from '../index';
import questionSrc from '../../../../../assets/images/question-circle.png';

import * as S from './styles';

type AppProps = {
  index: number;
  asset: AssetImageWithActive;
  setActive: (index: number) => void;
  selectedList: AssetImageWithActive[];
};

const Asset = ({
  asset,
  index,
  setActive,
  selectedList,
}: AppProps) => (
  <S.ListItem
    aria-disabled={!asset.active}
    onClick={() => asset.active && setActive(index)}
    style={{
      border:
        asset.active &&
        selectedList.find((a) => matchAsset(a, asset)) &&
        '1px solid black',
    }}
  >
    <S.Logo>
      {asset.logo ? (
        <img
          src={`${asset.logo}`}
          alt="logo"
          onError={(e) => ImageOnErrorHandler(e, questionSrc)}
        />
      ) : (
        <img src={questionSrc} alt="icon" />
      )}
    </S.Logo>
    <S.ListItemName>{asset.asset_code}</S.ListItemName>
    &nbsp;
    <S.ListItemWeb>{asset.domain ? asset.domain : '-'}</S.ListItemWeb>
    {asset.is_verified === '1' ? (
      <div className="ml-auto">
        <CheckMarkFill />
      </div>
    ) : null}
  </S.ListItem>
);

export default Asset;

import React from 'react';
import CheckMarkFill from 'popup/svgs/CheckMarkFill';
import questionSrc from '../../../../../assets/images/question-circle.png';
import ImageOnErrorHandler from '../../../../../helpers/ImageOnErrorHandler';

import * as S from './styles';

type AppProps = {
  item: any;
  index: number;
  setActive: (index: number) => void;
  selectedList: any[];
};

const Asset = ({
  item,
  index,
  setActive,
  selectedList,
}: AppProps) => (
  <S.ListItem
    aria-disabled={!item.active}
    onClick={() => item.active && setActive(index)}
    style={{
      border:
        item.active &&
        selectedList.includes(item) &&
        '1px solid black',
    }}
  >
    <S.Logo style={{ backgroundColor: `${item.color}` }}>
      {item.logo ? (
        <img
          src={`${item.logo}`}
          alt="logo"
          onError={(e) => ImageOnErrorHandler(e, questionSrc)}
        />
      ) : (
        <img src={questionSrc} alt="icon" />
      )}
    </S.Logo>
    <S.ListItemName>{item.asset_code}</S.ListItemName>
    &nbsp;
    <S.ListItemWeb>{item.domain ? item.domain : '-'}</S.ListItemWeb>
    {item.is_verified == '1' ? (
      <div className="ml-auto">
        <CheckMarkFill />
      </div>
    ) : null}
  </S.ListItem>
);

export default Asset;

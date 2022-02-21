import React from 'react';
import CheckMarkFill from 'popup/svgs/CheckMarkFill';
import questionSrc from '../../../../../assets/images/question-circle.png';

import * as S from './styles';

const Asset = ({ item, index, setActive, selectedList }) => (
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
        <img src={`${item.logo}`} alt="logo" />
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

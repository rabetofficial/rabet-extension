import React from 'react';
import AngleRight from 'popup/svgs/AngleRight';

import * as S from './styles';

const Setting = () => (
  <S.Container>
    <S.TopContainer>
      <S.Title>General</S.Title>
      <span>
        <AngleRight />
      </span>
    </S.TopContainer>
    <S.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor
    </S.Description>
  </S.Container>
);
export default Setting;

/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { SlidesLayout } from 'popup/components/Layout';
import intro2 from 'src/assets/images/intro2.png';

import * as S from './styles';

const FirstSlide = () => (
  <>
    <SlidesLayout>
      <S.ImgSlideOne>
        <img src={intro2} alt="img" />
      </S.ImgSlideOne>
      <S.TextContainer>
        <S.HeadText className="mt-[50px]">
          Useful by design
        </S.HeadText>
        <S.MainText>
          Rabet is designed with accessibility in mind, allowing users
          to execute Stellar's major operations in a user-friendly
          environment.
        </S.MainText>
      </S.TextContainer>
    </SlidesLayout>
  </>
);

export default FirstSlide;

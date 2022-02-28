/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { SlidesLayout } from 'popup/components/Layout';
import { SlideOne } from 'popup/svgs/SlidesLogo';

import * as S from './styles';

const FirstSlide = () => (
  <>
    <SlidesLayout>
      <S.ImgSlideOne>
        <SlideOne />
      </S.ImgSlideOne>
      <S.TextContainer>
        <S.HeadText className="mt-[47px]">
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

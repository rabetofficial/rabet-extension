/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { SlideThree } from 'popup/svgs/SlidesLogo';

import * as S from './styles';

const ThirdSlide = () => (
  <>
    <S.ImgSlideThird>
      <SlideThree />
    </S.ImgSlideThird>
    <S.TextContainer>
      <S.HeadText className="mt-[62px]">
        Made for interaction
      </S.HeadText>
      <S.MainText className="h-[80px]">
        Anything you have yet gained was derived from the interaction.
        The structure of Rabet is designed such that one can interact
        with the next generation financial network, i.e., Stellar.
      </S.MainText>
    </S.TextContainer>
  </>
);

export default ThirdSlide;

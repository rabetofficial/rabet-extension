/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import intro4 from '../../../assets/images/intro4.png';
import * as S from './styles';

const ThirdSlide = () => (
  <>
    <S.ImgSlideThird>
      <img src={intro4} alt="img" />
    </S.ImgSlideThird>
    <S.TextContainer>
      <S.HeadText className="mt-[47px]">
        Made for interaction
      </S.HeadText>
      <S.MainText className="px-[20px]">
        Anything you have yet gained was derived from the interaction.
        The structure of Rabet is designed such that one can interact
        with the next generation financial network, i.e., Stellar.
      </S.MainText>
    </S.TextContainer>
  </>
);

export default ThirdSlide;

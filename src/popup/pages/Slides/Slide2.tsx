/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import intro3 from '../../../assets/images/intro3.png';
import * as S from './styles';

const SecondSlide = () => (
  <>
    <S.ImgSlideTwo>
      <img src={intro3} alt="img" />
    </S.ImgSlideTwo>
    <S.TextContainer>
      <S.HeadText className="mt-[51px]">Secure by default</S.HeadText>
      <S.MainText className="px-[15px]">
        All the data in the Rabet is encrypted and stored on your
        local device. Therefore, you are in complete control of your
        data.
      </S.MainText>
    </S.TextContainer>
  </>
);

export default SecondSlide;

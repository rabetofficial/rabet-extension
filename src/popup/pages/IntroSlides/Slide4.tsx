/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from 'popup/components/common/Button';
import intro5 from 'src/assets/images/intro5.png';

import RouteName from 'popup/staticRes/routes';

import * as S from './styles';

const ForthSlide = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(RouteName.IntroSlides);
  };

  return (
    <>
      <S.ImgSlideForth>
        <img src={intro5} alt="img" />
      </S.ImgSlideForth>
      <S.TextContainer>
        <S.HeadText className="mt-[56px]">
          Rabet is Your Identity
        </S.HeadText>
        <S.MainText className="px-[10px]">
          In the Stellar world, Rabet is your passport, letting you
          interact with any SApp you wish.
        </S.MainText>
      </S.TextContainer>
      <div className="flex justify-center mt-[40px] mr-auto ml-auto 2xl:basis-[328px] sm:basis-[90%] w-[320px]">
        <Button
          type="button"
          variant="primary"
          size="large"
          content="Lounch the App"
          onClick={handleGetStarted}
        />
      </div>
    </>
  );
};

export default ForthSlide;

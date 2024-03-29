/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from 'popup/components/common/Button';
import identitySrc from 'assets/images/slides/identity.png';

import RouteName from 'popup/staticRes/routes';

import * as S from './styles';

const ForthSlide = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(RouteName.Register);
  };

  return (
    <>
      <S.ImgSlideForth src={identitySrc} />
      <S.TextContainer>
        <S.HeadText className="mt-[56px]">
          Rabet is Your Identity
        </S.HeadText>
        <S.MainText>
          In the Stellar world, Rabet is your passport, letting you
          interact with any SApp you wish.
        </S.MainText>
      </S.TextContainer>
      <div className="flex justify-center mt-[35px] mr-auto ml-auto 2xl:basis-[328px] sm:basis-[90%] w-[328px]">
        <Button
          type="button"
          variant="primary"
          size="large"
          content="Launch the App"
          onClick={handleGetStarted}
          style={{ borderRadius: '4px' }}
        />
      </div>
    </>
  );
};

export default ForthSlide;

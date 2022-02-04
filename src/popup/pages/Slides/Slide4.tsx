/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Error from 'popup/pages/common/Error';
import ModalDialog from 'popup/components/common/ModalDialog';
import Button from 'popup/components/common/Button';
import intro5 from '../../../assets/images/intro5.png';
import * as S from './styles';

import RouteName from '../../staticRes/routes';

const ForthSlide = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleGetStarted = () => {
    setModalOpen(true);
    // navigate(RouteName.IntroSlides);
  };

  return (
    <>
      <S.ImgSlideForth>
        <img src={intro5} alt="img" />
      </S.ImgSlideForth>
      <div className="text-center">
        <p className="text-3xl font-bold mt-[56px] mb-[20px]">
          Rabet is Your Identity{' '}
        </p>
        <p className="text-xl w-[660px]">
          In the Stellar world, Rabet is your passport, letting you
          interact with any SApp you wish.
        </p>
      </div>
      <div className="flex justify-center mt-[40px] mr-auto ml-auto 2xl:basis-[328px] sm:basis-[90%] w-[320px]">
        <Button
          type="button"
          variant="primary"
          size="medium"
          content="Get Started"
          onClick={handleGetStarted}
        />
      </div>

      <ModalDialog
        size="medium"
        title="Error!"
        isOpen={modalOpen}
        isStyled
        onClose={() => {
          console.log('hi');
        }}
      >
        <Error handleClick={() => {}} error="Error" />
      </ModalDialog>
    </>
  );
};

export default ForthSlide;

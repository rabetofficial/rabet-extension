/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { useNavigate } from 'react-router-dom';

import Layout from 'popup/components/Layout';
import Button from 'popup/components/common/Button';
import intro5 from '../../../assets/images/intro5.png';
import * as S from './styles';

import RouteName from '../../staticRes/routes';

const ForthSlide = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(RouteName.IntroSlides);
  };

  return (
    <Layout isDashboard={false}>
      <S.Img>
        <img src={intro5} alt="img" />
      </S.Img>
      <div className="text-center">
        <p className="text-3xl font-bold mt-[50px] mb-[20px]">
          Rabet is Your Identity{' '}
        </p>
        <p className="text-xl w-[660px]">
          In the Stellar world, Rabet is your passport, letting you
          interact with any SApp you wish.
        </p>
      </div>
      <div className="flex justify-center  mt-[40px] xl:basis-[328px] sm:basis-[90%] w-[320px]">
        <Button
          type="button"
          variant="primary"
          size="medium"
          content="Get Started"
          style={{ marginBottom: '28px' }}
          onClick={handleGetStarted}
          className=""
        />
      </div>
    </Layout>
  );
};

export default ForthSlide;

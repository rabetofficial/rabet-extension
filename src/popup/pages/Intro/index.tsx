import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from 'popup/svgs/Intro';
import Button from '../../components/common/Button';
import RouteName from '../../staticRes/routes';
import Layout from '../../components/Layout';
import * as S from './styles';

const Intro = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(RouteName.IntroSlides);
  };

  return (
    <Layout isDashboard={false}>
      <S.Img>
        <Logo />
      </S.Img>

      <S.Container>
        <div className="text-center">
          <p className="2xl:text-xl lg:text-xl md:text-xl sm:text-[22px] text-[18px] text-primary-dark ">
            Welcome to the new financial world
          </p>
          <p className="2xl:text-[40px] lg:text-4xl md:text-4xl sm:text-[30px] text-[26px] lg:whitespace-nowrap text-primary-darkest font-bold mt-4 mb-12 ">
            Start interacting with Stellar
          </p>
        </div>
      </S.Container>

      <S.MbButton>
        <Button
          type="button"
          variant="primary"
          size="medium"
          content="Get Started"
          style={{ marginBottom: '28px' }}
          onClick={handleGetStarted}
        />
      </S.MbButton>
    </Layout>
  );
};

export default Intro;

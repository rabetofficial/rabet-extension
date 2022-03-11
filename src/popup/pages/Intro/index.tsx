import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from 'popup/svgs/IntroLogo';
import Layout from 'popup/components/common/Layouts/BaseLayout';
import RouteName from 'popup/staticRes/routes';
import Button from 'popup/components/common/Button';

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
          <S.WelcomeText className="2xl:text-xl lg:text-xl md:text-xl sm:text-[22px] text-[18px] text-primary-dark ">
            Welcome to the new financial world
          </S.WelcomeText>
          <S.MainText className="2xl:text-[40px] lg:text-4xl md:text-4xl sm:text-[30px] text-[26px] lg:whitespace-nowrap font-bold">
            Start interacting with Stellar
          </S.MainText>
        </div>
      </S.Container>

      <S.MbButton>
        <Button
          type="button"
          variant="primary"
          size="medium"
          content="Get Started"
          onClick={handleGetStarted}
        />
      </S.MbButton>
    </Layout>
  );
};

export default Intro;

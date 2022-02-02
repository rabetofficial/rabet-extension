/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Layout from 'popup/components/Layout';
import intro3 from '../../../assets/images/intro3.png';
import * as S from './styles';

const SecondSlide = () => (
  <Layout isDashboard={false}>
    <S.Img>
      <img src={intro3} alt="img" />
    </S.Img>
    <div className="text-center">
      <p className="text-3xl font-bold mt-[50px] mb-[20px]">
        Secure by default{' '}
      </p>
      <p className="text-xl w-[660px]">
        All the data in the Rabet is encrypted and stored on your
        local device. Therefore, you are in complete control of your
        data.
      </p>
    </div>
  </Layout>
);

export default SecondSlide;

/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Layout from 'popup/components/Layout';
import intro2 from '../../../assets/images/intro2.png';
import * as S from './styles';

const FirstSlide = () => (
  <Layout isDashboard={false}>
    <S.Img>
      <img src={intro2} alt="img" />
    </S.Img>
    <div className="text-center">
      <p className="text-3xl font-bold mt-[50px] mb-[20px]">
        Useful by design
      </p>
      <p className="text-xl w-[660px]">
        Rabet is designed with accessibility in mind, allowing users
        to execute Stellar's major operations in a user-friendly
        environment.
      </p>
    </div>
  </Layout>
);

export default FirstSlide;

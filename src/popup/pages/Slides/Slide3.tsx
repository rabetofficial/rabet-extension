/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import intro4 from '../../../assets/images/intro4.png';
import * as S from './styles';

const ThirdSlide = () => (
  <>
    <S.ImgSlideThird>
      <img src={intro4} alt="img" />
    </S.ImgSlideThird>
    <div className="text-center">
      <p className="text-3xl font-bold mt-[47px] mb-[20px]">
        Made for interaction{' '}
      </p>
      <p className="text-xl w-[660px]">
        Anything you have yet gained was derived from the interaction.
        The structure of Rabet is designed such that one can interact
        with the next generation financial network, i.e., Stellar.
      </p>
    </div>
  </>
);

export default ThirdSlide;

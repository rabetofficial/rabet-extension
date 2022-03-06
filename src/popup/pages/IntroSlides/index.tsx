import React, { useState } from 'react';
import { Slide } from 'react-slideshow-image';

import { SlidesLayout } from 'popup/components/Layout';
import { SlideLeft, SlideRight } from 'popup/svgs/longArrowCircle';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import config from '../../../config';

import * as S from './styles';

const Slides = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const properties = {
    autoplay: false,
    canSwipe: false,
    transitionDuration: config.SLIDESHOW_TRANSITION,
    infinite: false,
    arrows: true,
    prevArrow: (
      <S.LeftCircle thirdSlide={slideIndex === 3}>
        <SlideLeft disabled={slideIndex === 0} />
      </S.LeftCircle>
    ),
    nextArrow: (
      <S.RightCircle thirdSlide={slideIndex === 3}>
        <SlideRight disabled={slideIndex === 3} />
      </S.RightCircle>
    ),
    onChange: (_: number, newIndex: number) => {
      // setSlideIndex(newIndex);
    },
    indicators: (i: number) =>
      slideIndex === 3 ? (
        <div />
      ) : (
        <S.Indicators index={i} disabled={i > slideIndex} />
      ),
  };

  console.log('hihihihihi');

  return (
    <SlidesLayout>
      <S.SlidesContainer>
        <Slide {...properties}>
          {console.log('hihihihih')}
          <Slide1 />
          <Slide2 />
          <Slide3 />
          <Slide4 />
        </Slide>
      </S.SlidesContainer>
    </SlidesLayout>
  );
};

export default Slides;

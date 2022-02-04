import React, { useState } from 'react';
import { SlidesLayout } from 'popup/components/Layout';
import { SlideLeft, SlideRight } from 'popup/svgs/SlideArrows';

import { Slide } from 'react-slideshow-image';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

import * as S from './styles';

const Slides = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const properties = {
    autoplay: false,
    canSwipe: false,
    duration: 3000,
    transitionDuration: 400,
    infinite: false,
    arrows: true,
    prevArrow: (
      <S.Circle>
        <SlideLeft disabled={slideIndex === 0} />
      </S.Circle>
    ),
    nextArrow: (
      <S.Circle>
        <SlideRight disabled={slideIndex === 3} />
      </S.Circle>
    ),
    onChange: (oldIndex: number, newIndex: number) => {
      setSlideIndex(newIndex);
    },
    indicators: (i: number) =>
      slideIndex === 3 ? (
        <div />
      ) : (
        <S.Indicators disabled={i > slideIndex} />
      ),
  };
  return (
    <SlidesLayout>
      <div className="w-[790px]">
        <Slide {...properties}>
          <Slide1 />
          <Slide2 />
          <Slide3 />
          <Slide4 />
        </Slide>
      </div>
    </SlidesLayout>
  );
};

export default Slides;

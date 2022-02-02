import React, { useState } from 'react';
import { SlidesLayout } from 'popup/components/Layout';
import { SlideLeft, SlideRight } from 'popup/svgs/SlideArrows';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

import * as S from './styles';

// const [nextIndex, setNextIndex] = useState();
// const [lastIndex, setLastIndex] = useState();

const properties = {
  autoplay: false,
  canSwipe: false,
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  arrows: true,
  prevArrow: (
    <S.Circle>
      <SlideLeft />
    </S.Circle>
  ),
  nextArrow: (
    <S.Circle>
      <SlideRight />
    </S.Circle>
  ),
  indicators: (i: number) => <S.Indicators />,
  onChange: (
    oldIndex: number | string,
    newIndex: number | string,
  ) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  },
};

const Slides = () => (
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

export default Slides;

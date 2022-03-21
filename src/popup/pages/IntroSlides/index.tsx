import { Slide } from 'react-slideshow-image';
import React, { useState, useEffect, useRef } from 'react';

import { SlideLeft, SlideRight } from 'popup/svgs/longArrowCircle';
import SlidesLayout from 'popup/components/common/Layouts/SlidesLayout';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import config from '../../../config';

import * as S from './styles';

const Slides = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideRef = useRef<Slide>(null);

  const handleKey = ({ key }: { key: string }) => {
    if (key === 'ArrowLeft') {
      slideRef?.current?.goBack();
    }

    if (key === 'ArrowRight') {
      slideRef?.current?.goNext();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const properties = {
    autoplay: false,
    canSwipe: false,
    transitionDuration: config.SLIDESHOW_TRANSITION,
    infinite: false,
    arrows: true,
    prevArrow: (
      <S.LeftCircle
        thirdSlide={slideIndex === 3}
        disabled={slideIndex === 0}
      >
        <SlideLeft disabled={slideIndex === 0} />
      </S.LeftCircle>
    ),
    nextArrow: (
      <S.RightCircle
        thirdSlide={slideIndex === 3}
        disabled={slideIndex === 0}
      >
        <SlideRight disabled={slideIndex === 3} />
      </S.RightCircle>
    ),
    onChange: (_: number, newIndex: number) => {
      setSlideIndex(newIndex);
    },
    indicators: (i: number) =>
      slideIndex === 3 ? (
        <div />
      ) : (
        <S.Indicators index={i} disabled={i > slideIndex} />
      ),
  };

  return (
    <div onKeyDown={handleKey}>
      <SlidesLayout>
        <S.SlidesContainer>
          <Slide {...properties} ref={slideRef}>
            <Slide1 />
            <Slide2 />
            <Slide3 />
            <Slide4 />
          </Slide>
        </S.SlidesContainer>
      </SlidesLayout>
    </div>
  );
};

export default Slides;

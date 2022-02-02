import Layout from 'popup/components/Layout';
import React from 'react';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

const properties = {
  // duration: 5000,
  // transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (
    oldIndex: number | string,
    newIndex: number | string,
  ) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  },
};

const Slides = () => (
  <Layout alignCenter isDashboard={false}>
    <div className="w-[790px]">
      <Slide {...properties}>
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <Slide4 />
      </Slide>
    </div>
  </Layout>
);

export default Slides;

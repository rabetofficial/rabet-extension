import React from 'react';
import * as Icons from 'popup/svgs/ContactusLinks';
import * as S from './styles';

const About = () => (
  <div>
    <div>
      <p>Version</p>
      <p>0.009</p>
    </div>
    <S.Hr />
    <p>Links</p>
    <p>Privacy policy</p>
    <p>Support</p>
    <p>Contact</p>
    <S.Hr />
    <p>Join us</p>
    <div>
      <span>
        <Icons.Twitter />
      </span>
      <span>
        <Icons.Telegram />
      </span>
      <span>
        <Icons.Discord />
      </span>
    </div>
  </div>
);

export default About;

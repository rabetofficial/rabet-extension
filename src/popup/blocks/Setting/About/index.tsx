import React from 'react';
import * as Icons from 'popup/svgs/ContactusLinks';
import PageTitle from 'popup/components/PageTitle';

import * as S from './styles';

const About = () => (
  <div>
    <PageTitle isSetting title="About" padding="0" />

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

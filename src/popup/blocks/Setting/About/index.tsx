import React from 'react';
import * as Icons from 'popup/svgs/ContactusLinks';
import PageTitle from 'popup/components/PageTitle';
import config from '../../../../config';

import * as S from './styles';

type AboutProps = {
  onClose: () => void;
};

const About = ({ onClose }: AboutProps) => (
  <div>
    <PageTitle
      isSetting
      title="About"
      padding="0"
      onClose={onClose}
    />

    <div>
      <S.Item className="mt-[26px]">Version</S.Item>
      <S.Item className="mt-[7px]">{config.VERSION}</S.Item>
    </div>
    <S.Hr />
    <S.Item>Links</S.Item>
    <S.Item className="mt-[20px]">Privacy policy</S.Item>
    <S.Item className="mt-[24px]">Support</S.Item>
    <S.Item className="mt-[24px]">Contact</S.Item>
    <S.Hr />
    <S.Item>Join us</S.Item>
    <S.ContactLinksContainer>
      <span>
        <Icons.Twitter />
      </span>
      <span>
        <Icons.Discord />
      </span>
      <span>
        <Icons.Telegram />
      </span>
    </S.ContactLinksContainer>
  </div>
);

export default About;

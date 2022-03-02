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
    <S.Item className="mt-[20px]">
      <a
        href="https://rabet.io/privacy-policy"
        target="_blank"
        rel="norefferer noreferrer"
      >
        Privacy policy
      </a>
    </S.Item>
    <S.Item className="mt-[24px]">
      <a
        href="mailto:support@rabet.io"
        target="_blank"
        rel="norefferer noreferrer"
      >
        Support
      </a>
    </S.Item>
    <S.Item className="mt-[24px]">Contact</S.Item>
    <S.Hr />
    <S.Item>Join us</S.Item>
    <S.ContactLinksContainer>
      <span>
        <a
          href=" https://twitter.com/rabetofficial"
          target="_blank"
          rel="norefferer"
        >
          <Icons.Twitter />
        </a>
      </span>
      <span>
        <a
          href="https://discord.com/invite/VkYdnRKUtZ"
          target="_blank"
          rel="noreferrer"
        >
          <Icons.Discord />
        </a>
      </span>
      <span>
        <a
          href="https://t.me/rabet_community"
          target="_blank"
          rel="norefferer noreferrer"
        >
          <Icons.Telegram />
        </a>
      </span>
    </S.ContactLinksContainer>
  </div>
);

export default About;

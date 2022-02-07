import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import abbr from 'popup/utils/abbr';

import * as S from './styles';

const Account = ({ info }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const { isConnected } = info;
  const host = useSelector((store) => store.host);

  let img = '';

  if (host) {
    img = `https://logo.clearbit.com/${host}?size=30`;
  }

  return (
    <S.Item>
      <S.Avatar>{abbr(info.name)}</S.Avatar>
      <S.Container>
        <S.Name>
          {info.name && info.name.length > 13
            ? info.name.substr(0, 13).concat('...')
            : info.name}
        </S.Name>
        <S.Amount>{info.balances}</S.Amount>
      </S.Container>

      {isConnected ? (
        <S.ImageContainer>
          <img
            src={img}
            alt="Host"
            className={!isImageLoaded ? 'hidden' : ''}
            onError={() => {
              setIsImageLoaded(false);
            }}
          />

          {!isImageLoaded ? <S.Host>{host}</S.Host> : ''}
        </S.ImageContainer>
      ) : (
        ''
      )}
    </S.Item>
  );
};

export default Account;

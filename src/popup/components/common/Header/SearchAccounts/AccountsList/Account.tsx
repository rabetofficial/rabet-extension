import React, { useState } from 'react';

import abbr from 'popup/utils/abbr';
import { IAccount } from 'popup/reducers/accounts2';
import useTypedSelector from 'popup/hooks/useTypedSelector';

import * as S from './styles';

type AppProps = {
  account: IAccount;
};

const Account = ({ account }: AppProps) => {
  const host = useTypedSelector((store) => store.host);
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const { name, isConnected } = account;

  let img = '';

  if (host) {
    img = `https://logo.clearbit.com/${host}?size=30`;
  }

  return (
    <S.Item>
      <S.Avatar>{abbr(name)}</S.Avatar>
      <S.Container>
        <S.Name>
          {name.length > 13 ? `${name.slice(0, 13)}...` : name}
        </S.Name>
        <S.Amount>{0}</S.Amount>
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

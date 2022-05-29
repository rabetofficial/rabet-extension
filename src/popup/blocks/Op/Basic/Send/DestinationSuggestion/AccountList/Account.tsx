import React, { useState } from 'react';

import abbr from 'popup/utils/abbr';
import shorter from 'popup/utils/shorter';
import useTypedSelector from 'popup/hooks/useTypedSelector';

import * as S from './styles';
import { AccountLike } from './index';

type AppProps = {
  purpose: string;
  account: AccountLike;
};

const Account = ({ account, purpose }: AppProps) => {
  const [host] = useTypedSelector((store) => [store.host]);
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const { name, publicKey, isConnected } = account;

  let img = '';

  if (host) {
    img = `https://logo.clearbit.com/${host}?size=30`;
  }

  return (
    <div className="flex">
      <S.Avatar>{abbr(name)}</S.Avatar>
      <div className="flex flex-col">
        <S.Name>
          {name.length > 13 ? `${name.slice(0, 13)}...` : name}
        </S.Name>
        <S.Detail>{publicKey && shorter(publicKey, 8)}</S.Detail>
      </div>

      {isConnected && purpose !== 'suggestion' ? (
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
    </div>
  );
};

Account.defaultProps = {
  purpose: '',
};

export default Account;

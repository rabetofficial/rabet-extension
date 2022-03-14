import React, { useState } from 'react';
import { IAccount } from 'popup/reducers/accounts2';
import abbr from 'popup/utils/abbr';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import shorter from 'popup/utils/shorter';

import * as S from './styles';

type AppProps = {
  account: IAccount;
};

const Account = ({ account }: AppProps) => {
  const [host] = useTypedSelector((store) => [store.host]);
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const { name, address, isConnected } = account;

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
        <S.Detail>{address && shorter(address, 8)}</S.Detail>
      </div>

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
    </div>
  );
};

export default Account;

import React, { useEffect } from 'react';

import offline from 'assets/images/offline.svg';

import config from '../../../config';

import * as S from './styles';

const OfflineMode = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, config.OFFLINE_MODE_TIMEOUT_SECONDS * 1000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <S.Container>
        <S.Sleeping>
          <S.Z>z</S.Z>
          <S.Z1>z</S.Z1>
          <S.Z2>z</S.Z2>

          <img
            src={offline}
            width={58}
            height={119}
            alt="rabet offline"
          />
        </S.Sleeping>

        <S.Title>You are offline</S.Title>

        <S.Msg>Go back online to use Rabet</S.Msg>
      </S.Container>
    </div>
  );
};

export default OfflineMode;

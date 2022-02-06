import React, { useEffect } from 'react';

import Layout from 'popup/components/Layout';
import offline from 'src/assets/images/offline.svg';
import config from '../../../config';

import * as S from './styles';

const OfflineMode = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, config.OFFLINE_MODE_TIMEOUT_SECONDS * 1000);
  }, []);

  return (
    <Layout alignCenter isDashboard={false}>
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
    </Layout>
  );
};

export default OfflineMode;

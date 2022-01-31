import React, { useEffect } from 'react';

import config from '../../../config';
import offline from '../../../assets/images/offline.svg';
import Layout1 from '../../components/Layout1';

import * as S from './styles';

const OfflineMode = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, config.OFFLINE_MODE_TIMEOUT_SECONDS * 1000);
  }, []);

  return (
    <Layout1 alignCenter isDashboard={false}>
      <S.Sleeping>
        <S.Z>z</S.Z>
        <S.Z1>z</S.Z1>
        <S.Z2>z</S.Z2>
        <img src={offline} width={58} height={119} alt="rabet offline" />
      </S.Sleeping>
      <S.Title>You are offline</S.Title>
      <S.Msg>Go back online to use Rabet</S.Msg>
    </Layout1>
  );
};

export default OfflineMode;

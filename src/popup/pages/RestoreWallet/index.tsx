import React from 'react';

import Logo from 'popup/components/Logo';
import Layout from 'popup/components/Layout';

import TabList from './TabList';

import * as S from './styles';

const RestoreWallet = () => (
  <Layout isDashboard={false}>
    <Logo />
    <S.TabContainer>
      <TabList />
    </S.TabContainer>
  </Layout>
);

export default RestoreWallet;

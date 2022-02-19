import React from 'react';

import TabList from './TabList';

import * as S from './styles';

type RestoreWalletType = { children?: React.ReactNode };
const RestoreWallet = ({ children }: RestoreWalletType) => (
  <>
    {children}
    <S.TabContainer>
      <TabList />
    </S.TabContainer>
  </>
);

RestoreWallet.defaultProps = {
  children: '',
};

export default RestoreWallet;

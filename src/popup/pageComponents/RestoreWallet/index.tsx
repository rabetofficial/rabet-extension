import React from 'react';

import { FormValues } from 'popup/pageComponents/PrivateKey';

import TabList from './TabList';

import * as S from './styles';

type RestoreWalletType = {
  children?: React.ReactNode;
  onCancel: () => void;
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
};
const RestoreWallet = ({
  children,
  onCancel,
  onSubmit,
}: RestoreWalletType) => (
  <>
    {children}
    <S.TabContainer>
      <TabList
        onCancelPrivateKey={onCancel}
        onSubmitPrivateKey={onSubmit}
      />
    </S.TabContainer>
  </>
);

RestoreWallet.defaultProps = {
  children: '',
};

export default RestoreWallet;

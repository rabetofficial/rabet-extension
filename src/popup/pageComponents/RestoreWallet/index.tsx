import React from 'react';

import { FormValues } from 'popup/pageComponents/PrivateKey';

import TabList from './TabList';

import * as S from './styles';

type RestoreWalletType = {
  children?: React.ReactNode;
  onCancel: () => void;
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
  isModal?: boolean;
};
const RestoreWallet = ({
  children,
  onCancel,
  onSubmit,
  isModal,
}: RestoreWalletType) => (
  <>
    {children}
    <S.TabContainer>
      <TabList
        onCancelPrivateKey={onCancel}
        onSubmitPrivateKey={onSubmit}
        isModal={isModal}
      />
    </S.TabContainer>
  </>
);

RestoreWallet.defaultProps = {
  children: '',
  isModal: false,
};

export default RestoreWallet;

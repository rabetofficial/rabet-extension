import React from 'react';

import { FormValues } from 'popup/components/PrivateKey';

import TabList from './TabList';

import * as S from './styles';

type RestoreWalletType = {
  children?: React.ReactNode;
  onCancel: () => void;
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
  isModal?: boolean;
  isExtension?: boolean;
};
const RestoreWallet = ({
  children,
  onCancel,
  onSubmit,
  isModal,
  isExtension,
}: RestoreWalletType) => (
  <>
    {children}
    <S.TabContainer>
      <TabList
        onCancelPrivateKey={onCancel}
        onSubmitPrivateKey={onSubmit}
        isModal={isModal}
        isExtension={isExtension}
      />
    </S.TabContainer>
  </>
);

RestoreWallet.defaultProps = {
  children: '',
  isModal: false,
  isExtension: false,
};

export default RestoreWallet;

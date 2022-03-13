import React from 'react';

import { FormValues } from 'popup/components/PrivateKey';

import TabList from './TabList';

import * as S from './styles';

type RestoreWalletProps = {
  children?: React.ReactNode;
  onCancel: () => void;
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
  isModal?: boolean;
  isExtension?: boolean;
  onSubmitBackup: () => void;
};

const RestoreWallet = ({
  children,
  onCancel,
  onSubmit,
  isModal,
  isExtension,
  onSubmitBackup,
}: RestoreWalletProps) => (
  <>
    {children}
    <S.TabContainer>
      <TabList
        onCancelBackup={onCancel}
        onSubmitBackup={onSubmitBackup}
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

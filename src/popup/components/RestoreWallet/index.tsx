import React from 'react';

import { Usage } from 'popup/models';
import { FormValues } from 'popup/components/PrivateKey';

import TabList from './TabList';

import * as S from './styles';

type RestoreWalletProps = {
  children?: React.ReactNode;
  onCancel: () => void;
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
  isModal?: boolean;
  usage: Usage;
  onSubmitBackup: () => void;
};

const RestoreWallet = ({
  children,
  onCancel,
  onSubmit,
  isModal,
  usage,
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
        usage={usage}
      />
    </S.TabContainer>
  </>
);

RestoreWallet.defaultProps = {
  children: '',
  isModal: false,
};

export default RestoreWallet;

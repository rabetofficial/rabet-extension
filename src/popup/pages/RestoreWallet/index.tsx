import React from 'react';
import { StrKey } from '@stellar/stellar-sdk';
import { useNavigate } from 'react-router-dom';

import Logo from 'popup/components/Logo';
import Layout from 'popup/components/common/Layouts/BaseLayout';
import RouteName from 'popup/staticRes/routes';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import { FormValues } from 'popup/components/PrivateKey';
import restoreAccountAction from 'popup/actions/accounts/restore';
import RestoreWalletComponent from 'popup/components/RestoreWallet';

const RestoreWallet = () => {
  const navigate = useNavigate();
  const accounts = useTypedSelector((store) => store.accounts);

  const onCancel = () => {
    if (accounts.length) {
      navigate(RouteName.Home, {
        state: {
          alreadyLoaded: true,
        },
      });
    } else {
      navigate(RouteName.First);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!StrKey.isValidEd25519SecretSeed(values.key)) {
      return { key: 'Invalid private key.' };
    }

    const isDuplicated = accounts.some(
      (x) => x.privateKey === values.key,
    );

    if (isDuplicated) {
      return { key: 'Account is duplicated.' };
    }

    const account = await restoreAccountAction(values.key);

    if (account === 'duplicate') {
      return {
        key: "The account you're trying to import is a duplicate.",
      };
    }

    if (!account) {
      return { key: 'Invalid seed.' };
    }

    navigate(RouteName.Home);

    return {};
  };

  const onSubmitBackup = () => {
    navigate(RouteName.Home);
  };

  return (
    <Layout isDashboard={false}>
      <RestoreWalletComponent
        usage="desktop"
        onCancel={onCancel}
        onSubmit={onSubmit}
        onSubmitBackup={onSubmitBackup}
      >
        <Logo />
      </RestoreWalletComponent>
    </Layout>
  );
};

export default RestoreWallet;

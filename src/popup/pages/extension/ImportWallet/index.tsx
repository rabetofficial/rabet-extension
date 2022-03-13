import React from 'react';
import { StrKey } from 'stellar-sdk';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import { FormValues } from 'popup/components/PrivateKey';
import ExtTitle from 'popup/components/common/Title/Ext';
import useTypedSelector from 'popup/hooks/useTypedSelector';
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
    <>
      <Header />

      <div className="content">
        <RestoreWalletComponent
          isExtension
          onCancel={onCancel}
          onSubmit={onSubmit}
          onSubmitBackup={onSubmitBackup}
        >
          <ExtTitle title="Import wallet" className="mt-4" />
        </RestoreWalletComponent>
      </div>
    </>
  );
};

export default RestoreWallet;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import createAccountAction from 'popup/actions/accounts/create';
import CreateWalletComponent, {
  FormValues,
} from 'popup/components/CreateWallet';

const CreateWallet = () => {
  const navigate = useNavigate();
  const accounts = useTypedSelector((store) => store.accounts);

  const handleCancel = () => {
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
    const isDone = await createAccountAction(values.name);

    if (!isDone) {
      return {
        name: 'Error.',
      };
    }

    navigate(RouteName.BackupFile);

    return {};
  };

  return (
    <>
      <Header />

      <div className="content">
        <CreateWalletComponent
          isExtension
          onSubmit={onSubmit}
          onCancel={handleCancel}
        >
          <ExtTitle title="Create wallet" className="mt-4" />
        </CreateWalletComponent>
      </div>
    </>
  );
};

export default CreateWallet;

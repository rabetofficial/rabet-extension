import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from 'popup/components/Logo';
import Layout from 'popup/components/common/Layouts/BaseLayout';
import RouteName from 'popup/staticRes/routes';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import createAccountAction from 'popup/actions/accounts/create';
import CreateWalletComponent, {
  FormValues,
} from 'popup/pageComponents/CreateWallet';

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
    <Layout isDashboard={false}>
      <CreateWalletComponent
        onSubmit={onSubmit}
        onCancel={handleCancel}
      >
        <Logo />
      </CreateWalletComponent>
    </Layout>
  );
};

export default CreateWallet;

import React, { useState } from 'react';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';
import RouteName from 'popup/staticRes/routes';
import lockAction from 'popup/actions/accounts/lock';
import Plus from 'popup/svgs/Plus';
import File from 'popup/svgs/File';
import Setting from 'popup/svgs/Setting';
import Lock from 'popup/svgs/Lock';
import ModalDialog from 'popup/components/common/ModalDialog';
import CreateWallet, {
  FormValues as CreateWalletFormValues,
} from 'popup/pageComponents/CreateWallet';
import restoreAccountAction from 'popup/actions/accounts/restore';
import { FormValues as RestoreWalletFormValues } from 'popup/pageComponents/PrivateKey';
import RestoreWallet from 'popup/pageComponents/RestoreWallet';
import createAccountAction from 'popup/actions/accounts/create';
import validatePrivateKey from 'popup/utils/validate/privateKey';
import useTypedSelector from 'popup/hooks/useTypedSelector';

import * as S from './styles';

const Menus = () => {
  const navigate = useNavigate();
  const accounts = useTypedSelector((store) => store.accounts);

  const [modal1, setModal1] = useState(false);
  const onOpenModal1 = () => setModal1(true);
  const onCloseModal1 = () => setModal1(false);

  const [modal2, setModal2] = useState(false);
  const onOpenModal2 = () => setModal2(true);
  const onCloseModal2 = () => setModal2(false);

  const handleLock = () => {
    lockAction(navigate);
  };

  const handleCloseModals = () => {
    onCloseModal1();
    onCloseModal2();
  };

  const handleCreateWallet = async (
    values: CreateWalletFormValues,
  ) => {
    const isDone = await createAccountAction(values.name);

    if (!isDone) {
      return {
        name: 'Error.',
      };
    }

    // TEMPORARY
    handleCloseModals();
    // OPEN BACKUP FILE MODAL

    return {};
  };

  const handleRestoreWallet = async (
    values: RestoreWalletFormValues,
  ) => {
    if (!validatePrivateKey(values.key)) {
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

    handleCloseModals();

    return {};
  };

  const buttons = [
    {
      link: '#',
      icon: <Plus />,
      label: 'Create Wallet',
      onClick: onOpenModal1,
    },
    {
      link: '#',
      icon: <File />,
      label: 'Import Wallet',
      onClick: onOpenModal2,
    },
    {
      link: RouteName.Setting,
      icon: <Setting />,
      label: 'Setting',
    },
    {
      link: '#',
      icon: <Lock />,
      label: 'Lock',
      onClick: handleLock,
    },
  ];

  return (
    <>
      <ModalDialog
        title="Create Wallet"
        size="medium"
        padding="large"
        onClose={onCloseModal1}
        isOpen={modal1}
      >
        <CreateWallet
          onSubmit={handleCreateWallet}
          onCancel={handleCloseModals}
        />
      </ModalDialog>
      <ModalDialog
        title="Import Wallet"
        size="medium"
        padding="large"
        onClose={onCloseModal2}
        isOpen={modal2}
      >
        <RestoreWallet
          onSubmit={handleRestoreWallet}
          onCancel={handleCloseModals}
        />
      </ModalDialog>
      <div>
        <S.Group>
          {buttons.map((item) => (
            <S.GroupLink
              key={shortid.generate()}
              to={item.link}
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </S.GroupLink>
          ))}
        </S.Group>
      </div>
    </>
  );
};

export default Menus;

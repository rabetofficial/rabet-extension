import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Plus from 'popup/svgs/Plus';
import File from 'popup/svgs/File';
import Lock from 'popup/svgs/Lock';
import Setting from 'popup/svgs/Setting';
import CreateWallet, {
  FormValues as CreateWalletFormValues,
} from 'popup/pageComponents/CreateWallet';
import RouteName from 'popup/staticRes/routes';
import lockAction from 'popup/actions/accounts/lock';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
import BackupFile from 'popup/pageComponents/BackupFile';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import RestoreWallet from 'popup/pageComponents/RestoreWallet';
import createAccountAction from 'popup/actions/accounts/create';
import validatePrivateKey from 'popup/utils/validate/privateKey';
import restoreAccountAction from 'popup/actions/accounts/restore';
import { FormValues as RestoreWalletFormValues } from 'popup/pageComponents/PrivateKey';
import PageTitle from 'popup/components/PageTitle';

import * as S from './styles';

type AppProps = {
  usage: 'extension' | 'expand' | undefined;
  onHidePopover: () => void;
};

type Menu = {
  id: number;
  link: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

const Menus = ({ usage, onHidePopover }: AppProps) => {
  const navigate = useNavigate();
  const accounts = useTypedSelector((store) => store.accounts);

  const [menuItems, setMenuItems] = useState<Menu[]>([]);

  const handleLock = () => {
    lockAction(navigate);
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

    closeModalAction();

    openModalAction({
      isStyled: false,
      title: 'Backup',
      size: 'medium',
      padding: 'large',
      minHeight: 462,
      children: (
        <BackupFile onClick={closeModalAction}>
          <PageTitle title="Backup file" padding="0" />
        </BackupFile>
      ),
    });

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

    closeModalAction();

    return {};
  };

  const openCreateWalletModal = () => {
    openModalAction({
      isStyled: true,
      title: 'Create Wallet',
      size: 'medium',
      padding: 'large',
      minHeight: 462,
      children: (
        <CreateWallet
          isModal
          onCancel={closeModalAction}
          onSubmit={handleCreateWallet}
        />
      ),
    });
  };

  const openImportWalletModal = () => {
    openModalAction({
      isStyled: true,
      title: 'Import Wallet',
      size: 'medium',
      padding: 'large',
      minHeight: 462,
      children: (
        <RestoreWallet
          isModal
          onCancel={closeModalAction}
          onSubmit={handleRestoreWallet}
        />
      ),
    });
  };

  const menus: Menu[] = [
    {
      id: 1,
      link: '#',
      icon: <Plus />,
      label: 'Create Wallet',
      onClick: openCreateWalletModal,
    },
    {
      id: 2,
      link: '#',
      icon: <File />,
      label: 'Import Wallet',
      onClick: openImportWalletModal,
    },
  ];

  const settingMenu: Menu = {
    id: 3,
    link: RouteName.Setting,
    icon: <Setting />,
    label: 'Setting',
  };

  const lockMenu: Menu = {
    id: 4,
    link: '#',
    icon: <Lock />,
    label: 'Lock',
    onClick: handleLock,
  };

  useEffect(() => {
    if (usage === 'expand') {
      setMenuItems([...menus, lockMenu]);
    } else {
      setMenuItems([...menus, settingMenu, lockMenu]);
    }
  }, [usage]);

  const handleMenu = (func: any) => {
    func();
    onHidePopover();
  };

  return (
    <div>
      <S.Group>
        {menuItems.map((item: Menu) => (
          <S.GroupLink
            key={item.id}
            to={item.link}
            onClick={() => handleMenu(item.onClick)}
          >
            {item.icon}
            {item.label}
          </S.GroupLink>
        ))}
      </S.Group>
    </div>
  );
};

export default Menus;

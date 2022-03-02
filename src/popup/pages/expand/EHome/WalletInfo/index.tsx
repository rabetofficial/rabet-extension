import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Trash from 'popup/svgs/Trash';
import RouteName from 'popup/staticRes/routes';
import Button from 'popup/components/common/Button';
import CopyKey from 'popup/components/common/CopyKey';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import EditWalletName from 'popup/components/EditWalletName';
import DeleteAccount from 'popup/pageComponents/DeleteAccount';
import removeAccountAction from 'popup/actions/accounts/remove';
import InsideTabLayout from 'popup/components/common/Layouts/InsideTabLayout';

const Hr = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  margin: 40px 0;
`;

const WalletInfo = () => {
  const navigate = useNavigate();
  const { publicKey, privateKey } = useActiveAccount();

  const handleCancel = () => {
    closeModalAction();
  };

  const handleDelete = () => {
    removeAccountAction(publicKey).then(() => {
      closeModalAction();

      navigate(RouteName.AccountManager);
    });
  };

  const onOpenModal = () => {
    openModalAction({
      minHeight: 0,
      isStyled: true,
      padding: 'large',
      size: 'medium',
      title: 'Delete Account',
      children: (
        <DeleteAccount
          onClick={handleDelete}
          onCancel={handleCancel}
        />
      ),
    });
  };

  return (
    <InsideTabLayout>
      <div className="pb-[67px] pt-[18px] max-w-[460px]">
        <div className="label-primary font-medium	">Wallet name</div>
        <EditWalletName
          height={48}
          checkIconWidth={22}
          fontSize={16}
        />

        <div className="label-primary mt-[18px] font-medium">
          Private Key
        </div>
        <CopyKey keyValue={privateKey} />

        <div className="label-primary mt-[28px] font-medium">
          Address
        </div>
        <CopyKey keyValue={publicKey} />

        <Hr />

        <Button
          variant="danger"
          content="Delete account"
          size="medium"
          startIcon={<Trash />}
          onClick={onOpenModal}
        />
      </div>
    </InsideTabLayout>
  );
};

export default WalletInfo;

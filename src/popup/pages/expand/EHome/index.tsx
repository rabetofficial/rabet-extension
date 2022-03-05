import React from 'react';

import { Tab } from 'popup/models';
import Setting from 'popup/blocks/Setting';
import LoadingOne from 'popup/pages/LoadingOne';
import useLoadHome from 'popup/hooks/useLoadHome';
import Transactions from 'popup/components/Transactions';
import BasicOperation from 'popup/pages/expand/EHome/BasicOperation';
import ExpandLayout from 'popup/components/common/Layouts/ExpandLayout';
import ConfirmWallet from 'popup/pages/expand/EHome/WalletInfo/ConfirmWallet';

const EHome = () => {
  const isLoading = useLoadHome();

  if (isLoading) {
    return <LoadingOne />;
  }

  const tabs: Tab[] = [
    {
      id: 1,
      title: 'Operation',
      content: <BasicOperation />,
    },
    { id: 2, title: 'Transactions', content: <Transactions /> },
    { id: 3, title: 'Wallet info', content: <ConfirmWallet /> },
    { id: 4, title: 'Settings', content: <Setting /> },
  ];

  return <ExpandLayout tabItems={tabs} />;
};

export default EHome;

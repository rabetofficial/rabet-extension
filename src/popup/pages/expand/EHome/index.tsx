import React from 'react';

import { Tab } from 'popup/models';
import Setting from 'popup/blocks/Setting';
import useLoadHome from 'popup/hooks/useLoadHome';
import Transactions from 'popup/components/Transactions';
import WalletInfo from 'popup/pages/expand/EHome/WalletInfo';
import ExpandLayout from 'popup/components/common/Layouts/ExpandLayout';
import { openLoadingModal } from 'popup/components/Modals';
import closeModalAction from 'popup/actions/modal/close';

const EHome = () => {
  const isLoading = useLoadHome();

  if (isLoading) {
    openLoadingModal({});
  } else {
    closeModalAction();
  }

  const tabs: Tab[] = [
    {
      id: 1,
      title: 'Operation',
      content: '2',
    },
    { id: 2, title: 'Transactions', content: <Transactions /> },
    { id: 3, title: 'Wallet info', content: <WalletInfo /> },
    { id: 4, title: 'Settings', content: <Setting /> },
  ];

  return <ExpandLayout tabItems={tabs} />;
};

export default EHome;

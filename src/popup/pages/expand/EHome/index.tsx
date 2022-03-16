import React from 'react';

import { Tab } from 'popup/models';
import Setting from 'popup/blocks/Setting';
import LoadingOne from 'popup/pages/LoadingOne';
import useLoadHome from 'popup/hooks/useLoadHome';
import Transactions from 'popup/components/Transactions';
import BasicOperation from 'popup/pages/expand/EHome/Operation/Basic';
import AdvanceOperation from 'popup/pages/expand/EHome/Operation/Advance';
import ExpandLayout from 'popup/components/common/Layouts/ExpandLayout';
import ConfirmWallet from 'popup/pages/expand/EHome/WalletInfo/ConfirmWallet';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import InsideTabLayout from 'popup/components/common/Layouts/InsideTabLayout';

const EHome = () => {
  const isLoading = useLoadHome();
  const options = useTypedSelector((store) => store.options);

  if (isLoading) {
    return <LoadingOne />;
  }

  const tabs: Tab[] = [
    {
      id: 1,
      title: 'Operation',
      content:
        options.mode === 'BASIC' ? (
          <BasicOperation />
        ) : (
          <AdvanceOperation />
        ),
    },
    {
      id: 2,
      title: 'Transactions',
      content: <Transactions usage="desktop" />,
    },
    { id: 3, title: 'Wallet info', content: <ConfirmWallet /> },
    {
      id: 4,
      title: 'Settings',
      content: <Setting usage="desktop" />,
    },
  ];

  return <ExpandLayout tabItems={tabs} />;
};

export default EHome;

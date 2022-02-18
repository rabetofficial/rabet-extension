import React, { useEffect } from 'react';

import loadAccount from 'popup/features/loadAccount';
import loadCurrencies from 'popup/features/loadCurrencies';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ExpandLayout from 'popup/components/common/Layouts/ExpandLayout';
import Transactions from 'popup/components/Transactions';
import { Tab } from 'popup/models';
import WalletInfo from 'popup/pages/expand/EHome/WalletInfo';

const EHome = () => {
  const activeAccount = useActiveAccount();

  useEffect(() => {
    loadAccount(activeAccount);
    loadCurrencies();
  }, []);

  const tabs: Tab[] = [
    { id: 1, title: 'Operation', content: '1' },
    { id: 2, title: 'Transactions', content: <Transactions /> },
    { id: 3, title: 'Wallet info', content: <WalletInfo /> },
    { id: 4, title: 'Settings', content: '1' },
  ];

  return <ExpandLayout tabItems={tabs} />;
};

export default EHome;

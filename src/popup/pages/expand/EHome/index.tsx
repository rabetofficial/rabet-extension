import React, { useEffect } from 'react';

import { Tab } from 'popup/models';
import loadBids from 'popup/features/loadBids';

import Setting from 'popup/blocks/Setting';
import loadAccount from 'popup/features/loadAccount';
import Transactions from 'popup/components/Transactions';
import loadCurrencies from 'popup/features/loadCurrencies';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import WalletInfo from 'popup/pages/expand/EHome/WalletInfo';
import loadAssetImages from 'popup/features/loadAssetImages';
import ExpandLayout from 'popup/components/common/Layouts/ExpandLayout';

import Test from './TestContent';

const EHome = () => {
  const activeAccount = useActiveAccount();
  const { network } = useTypedSelector((store) => store.options);

  useEffect(() => {
    loadCurrencies();

    loadAccount(activeAccount).then(() => {
      loadBids();
      loadAssetImages();
    });
  }, [activeAccount.publicKey, network]);

  const tabs: Tab[] = [
    {
      id: 1,
      title: 'Operation',
      content: <Test />,
    },
    { id: 2, title: 'Transactions', content: <Transactions /> },
    { id: 3, title: 'Wallet info', content: <WalletInfo /> },
    { id: 4, title: 'Settings', content: <Setting /> },
  ];

  return <ExpandLayout tabItems={tabs} />;
};

export default EHome;

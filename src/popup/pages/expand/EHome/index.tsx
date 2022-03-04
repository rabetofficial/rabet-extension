import React, { useEffect } from 'react';

import { Tab } from 'popup/models';
import Setting from 'popup/blocks/Setting';
import useLoadHome from 'popup/hooks/useLoadHome';
import Transactions from 'popup/components/Transactions';
import closeModalAction from 'popup/actions/modal/close';
import { openLoadingModal } from 'popup/components/Modals';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import WalletInfo from 'popup/pages/expand/EHome/WalletInfo';
import BasicOperation from 'popup/pages/expand/EHome/BasicOperation';
import ExpandLayout from 'popup/components/common/Layouts/ExpandLayout';

const EHome = () => {
  const isLoading = useLoadHome();
  const modal = useTypedSelector((store) => store.modal);

  useEffect(() => {
    if (isLoading) {
      openLoadingModal({});
    } else {
      // If loading modal is showing
      if (modal.size === 'medium' && modal.title === '') {
        closeModalAction();
      }
    }
  }, [isLoading]);

  const tabs: Tab[] = [
    {
      id: 1,
      title: 'Operation',
      content: <BasicOperation />,
    },
    { id: 2, title: 'Transactions', content: <Transactions /> },
    { id: 3, title: 'Wallet info', content: <WalletInfo /> },
    { id: 4, title: 'Settings', content: <Setting /> },
  ];

  return <ExpandLayout tabItems={tabs} />;
};

export default EHome;

import React, { useEffect } from 'react';

import loadAccount from 'popup/features/loadAccount';
import loadCurrencies from 'popup/features/loadCurrencies';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ExpandLayout from 'popup/components/common/Layouts/ExpandLayout';
import Transactions from 'popup/pageComponents/Transactions';

const EHome = () => {
  const activeAccount = useActiveAccount();

  useEffect(() => {
    loadAccount(activeAccount);
    loadCurrencies();
  }, []);

  return (
    <ExpandLayout>
      <Transactions />
    </ExpandLayout>
  );
};

export default EHome;

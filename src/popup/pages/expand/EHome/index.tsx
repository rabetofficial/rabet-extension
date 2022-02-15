import React, { useEffect } from 'react';

import loadAccount from 'popup/features/loadAccount';
import loadCurrencies from 'popup/features/loadCurrencies';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ExpandLayout from 'popup/components/common/Layouts/ExpandLayout';

const EHome = () => {
  const activeAccount = useActiveAccount();

  useEffect(() => {
    loadAccount(activeAccount);
    loadCurrencies();
  }, []);

  return (
    <ExpandLayout>
      <p>Hi</p>
    </ExpandLayout>
  );
};

export default EHome;

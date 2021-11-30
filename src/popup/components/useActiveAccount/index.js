import { useState, useEffect } from 'react';

import store from '../../store';

const useActiveAccount = () => {
  const [activeAccount, setActiveAccount] = useState({
    balances: [],
  });

  useEffect(() => {
    const { accounts } = store.getState();

    for (let i = 0; i < accounts.length; i += 1) {
      if (accounts[i].active) {
        setActiveAccount(accounts[i]);
        break;
      }
    }

    if (!activeAccount) {
      setActiveAccount(accounts[0]);
    }
  }, []);

  return activeAccount;
};

export default useActiveAccount;

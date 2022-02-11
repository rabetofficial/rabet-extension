import useTypedSelector from './useTypedSelector';

const useActiveAccount = () => {
  const accounts = useTypedSelector((store) => store.accounts);

  for (let i = 0; i < accounts.length; i += 1) {
    if (accounts[i].active) {
      return accounts[i];
    }
  }

  return accounts[0];
};

export default useActiveAccount;

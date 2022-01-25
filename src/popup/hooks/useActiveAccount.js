import { useSelector } from 'react-redux';

const useActiveAcconut = () => {
  const accounts = useSelector((store) => store.accounts);
  const activeAccount = accounts.find((x) => x.active);

  return activeAccount;
};

export default useActiveAcconut;

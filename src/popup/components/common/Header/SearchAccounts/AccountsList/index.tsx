import React from 'react';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import { IAccount } from 'popup/reducers/accounts2';
import changeActiveAction from 'popup/actions/accounts/changeActive';

import * as S from './styles';
import Account from './Account';

type AppProps = {
  accounts: IAccount[];
};

const AccountList = ({ accounts }: AppProps) => {
  const navigate = useNavigate();

  const changeAccount = (account: IAccount) => {
    changeActiveAction(account.publicKey);

    navigate(RouteName.AccountManager);
  };

  return (
    <>
      {accounts.length ? (
        <S.List className="hidden-scroll">
          {accounts.map((account, index) => (
            <li
              key={`accountsList${account.publicKey}`}
              onClick={() => {
                changeAccount(account);
              }}
            >
              <Account account={account} />

              <S.Border
                className={
                  accounts.length - 1 !== index ? 'block' : 'hidden'
                }
              />
            </li>
          ))}
        </S.List>
      ) : (
        <S.NotFound>No accounts found</S.NotFound>
      )}
    </>
  );
};

export default AccountList;

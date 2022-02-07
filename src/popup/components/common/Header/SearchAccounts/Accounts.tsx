import React from 'react';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';

import changeActiveAction from 'popup/actions/accounts/changeActive';
import * as route from 'popup/staticRes/routes';
import PopupList from 'popup/pageComponents/PopupList';

import * as S from './styles';

const Accounts = ({ accounts }) => {
  const navigate = useNavigate();
  const changeAccount = (account) => {
    changeActiveAction(account.realPublicKey);

    navigate(route.accountManagerPage);

    // toggleMenu();
  };
  return (
    <>
      {accounts && accounts.length > 0 ? (
        <S.List className="hidden-scroll">
          {accounts.map((account, index) => (
            <li
              key={shortid.generate()}
              onClick={() => {
                changeAccount(account);
              }}
            >
              <PopupList info={account} />
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

export default Accounts;

import React from 'react';
import shortid from 'shortid';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import changeActiveAction from 'popup/actions/accounts/changeActive';
import * as route from 'popup/staticRes/routes';
import PopupList from 'popup/pageComponents/PopupList';

import styles from './styles.less';

const Accounts = ({ accounts }) => {
  const navigate = useNavigate();
  const changeAccount = (account) => {
    changeActiveAction(account.realPublicKey);

    navigate(route.accountManagerPage);

    // toggleMenu();
  };
  return (
    <div>
      {accounts && accounts.length > 0 ? (
        <ul className={classNames(styles.list, 'hidden-scroll')}>
          {accounts.map((account, index) => (
            <li
              key={shortid.generate()}
              onClick={() => {
                changeAccount(account);
              }}
            >
              <PopupList info={account} />
              <div
                className={
                  accounts.length - 1 !== index ? styles.border : ''
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <span className={styles.notFound}>No accounts found</span>
      )}
    </div>
  );
};

export default Accounts;

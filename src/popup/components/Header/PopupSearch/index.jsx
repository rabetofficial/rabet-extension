import shortid from 'shortid';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

import shorter from '../../../utils/shorter';
import * as route from '../../../staticRes/routes';
import showBalance from '../../../utils/showBalance';
import lockAction from '../../../actions/accounts/lock';
import PopupList from '../../../pageComponents/PopupList';
import formatCurrency from '../../../utils/formatCurrency';
import numberWithCommas from '../../../utils/numberWithCommas';
import getTotalBalance from '../../../utils/getTotalBalance';
import changeActiveAction from '../../../actions/accounts/changeActive';

import styles from './styles.less';

const PopupSearch = ({
  isOpen,
  accounts: accs,
  options: o,
  currencies,
  ...props
}) => {
  const navigate = useNavigate();
  const activeCurrency = currencies[o.currency] || { value: 0, currency: 'USD' };
  const [searchString, setSearchString] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const node = useRef();

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  let activeAccountIndex = accounts.findIndex((x) => x.active);

  if (activeAccountIndex === -1) {
    activeAccountIndex = 0;
  }

  useEffect(() => {
    const items = accs.map((item, index) => ({
      active: item.active,
      realPublicKey: item.publicKey,
      publicKey: shorter(item.publicKey, 8),
      name: item.name || `Account ${index + 1}`,
      balances: showBalance(
        numberWithCommas(formatCurrency(getTotalBalance(item.balances, activeCurrency))),
        activeCurrency.name,
      ),
    }));

    setAccounts(items);
    let list = items;

    if (searchString && searchString.length > 0) {
      const data = searchString.trim().toLowerCase();
      list = list.filter((l) => l.name.toLowerCase().match(data));
      setAccounts(list);
    }
  }, [searchString, accs]);

  const toggleMenu = () => {
    setToggle(!toggle);
    props.toggleOverlay(!toggle);
  };

  const handleLock = () => {
    lockAction(navigate);
  };

  const changeAccount = (account) => {
    changeActiveAction(account.realPublicKey);

    navigate(route.accountManagerPage);

    toggleMenu();
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    setToggle(false);
    props.toggleOverlay(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    setSearchString('');
  }, [isOpen]);

  const buttons = [
    {
      link: route.createWalletPage,
      icon: 'icon-plus-math',
      iconSize: '14',
      label: 'Create Wallet',
    },
    {
      link: route.restoreWalletPage,
      icon: 'icon-file',
      iconSize: '14',
      label: 'Import Wallet',
    },
    {
      link: route.settingPage,
      icon: 'icon-settings-2',
      iconSize: '15',
      label: 'Setting',
    },
    {
      link: '#',
      icon: 'icon-lock-2',
      iconSize: '15',
      label: 'Lock',
      onClick: handleLock,
    },
  ];

  return (
    <div ref={node}>
      <button type="button" className={styles.toggle} onClick={() => { toggleMenu(); }}>
        {(accs[activeAccountIndex] && accs[activeAccountIndex].name) ? accs[activeAccountIndex].name.substr(0, 1).toUpperCase() : 'A'}
      </button>
      {toggle && (
      <div className={styles.card}>
        <input
          type="text"
          value={searchString}
          onChange={(e) => handleChange(e)}
          placeholder="&#xe915;  Search Accounts"
          className={styles.search}
        />
        {(accounts && accounts.length > 0) ? (
          <ul className={classNames(styles.list, 'hidden-scroll')}>
            {accounts.map((account, index) => (
              <li
                key={shortid.generate()}
                onClick={() => { changeAccount(account); }}
              >
                <PopupList info={account} />
                <div className={((accounts.length - 1) !== index) ? styles.border : ''} />
              </li>
            ))}
          </ul>
        ) : (
          <span className={styles.notFound}>No accounts found</span>
        )}
        <div className={styles.group}>
          {buttons.map((item) => (
            <Link
              key={shortid.generate()}
              to={item.link}
              className={styles.link}
              onClick={item.onClick}
            >
              <span className={item.icon} style={{ fontSize: `${item.iconSize}px` }} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

PopupSearch.propTypes = {

};

export default connect((state) => ({
  options: state.options,
  accounts: state.accounts,
  currencies: state.currencies,
}))(PopupSearch);

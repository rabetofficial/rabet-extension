import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {Link, withRouter } from 'react-router-dom';
import React, {useState, useEffect, useRef} from 'react';

import shorter from 'Root/helpers/shorter';
import * as route from 'Root/staticRes/routes';
import lockAction from 'Root/actions/accounts/lock';
import PopupList from 'Root/pageComponents/PopupList';
import formatCurrency from 'Root/helpers/formatCurrency';
import changeActiveAction from 'Root/actions/accounts/changeActive';

import styles from './styles.less';

const PopupSearch = props => {
  const [searchString, setSearchString] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const node = useRef();

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  let activeAccountIndex = accounts.findIndex(x => x.active);

  if (activeAccountIndex === -1) {
    activeAccountIndex = 0;
  }

  useEffect(() => {
    const items = props.accounts.map((item, index) => ({
      active: item.active,
      realPublicKey: item.publicKey,
      publicKey: shorter(item.publicKey, 8),
      name: item.name || `Account ${index + 1}`,
      balance: formatCurrency(item.balance || 0),
    }));
    setAccounts(items);
    let list = items;

    if (searchString && searchString.length > 0) {
      const data = searchString.trim().toLowerCase();
      list = list.filter((l) => {
        return l.name.toLowerCase().match( data );
      });
      setAccounts(list);
    }

  }, [searchString, props.accounts]);

  const toggleMenu = () => {
    setToggle(!toggle);
    props.toggleOverlay(!toggle);
  };

  const handleLock = () => {
    lockAction(props.history.push);
  };

  const changeAccount = (account) => {
    changeActiveAction(account.realPublicKey);

    props.history.push(route.homePage);
    toggleMenu();
  };

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    setToggle(false);
    props.toggleOverlay(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const buttons = [
    {link: route.createWalletPage, icon: 'icon-plus-math', iconSize: '14',  label: 'Create Wallet'},
    {link: route.restoreWalletPage, icon: 'icon-file',iconSize: '14', label: 'Import Wallet'},
    {link: route.settingPage , icon: 'icon-settings-2',iconSize: '15', label: 'Setting'},
    {link: '#', icon: 'icon-lock-2', iconSize: '15', label: 'Lock', onClick: handleLock },
  ];

  return (
      <div ref={node}>
        <button className={styles.toggle} onClick={() => {toggleMenu()}}>
          {props.accounts[activeAccountIndex].name ?
              props.accounts[activeAccountIndex].name.substr(0, 1).toUpperCase() : 'A'
          }
        </button>
        {toggle &&
        <div className={styles.card}>
          <input
              type="text"
              value={searchString}
              onChange={(e) => handleChange(e)}
              placeholder="&#xe915;  Search Accounts"
              className={styles.search}
          />
          {(accounts && accounts.length > 0) ?
              <ul className={classNames(styles.list, 'hidden-scroll')}>
                {accounts.map((account, index) =>
                    <li
                        key={index}
                        onClick={() => { changeAccount(account) }}
                    >
                      <PopupList info={ account }/>
                      <div className={((accounts.length -1) !== index) ? styles.border : ''} />
                    </li>
                )}
              </ul>:
              <span className={styles.notFound}>No accounts found</span>
          }
          <div className={ styles.group }>
            {buttons.map((item, index) => (
                <Link key={index} to={item.link} className={ styles.link } onClick={item.onClick}>
                  <span className={item.icon} style={{fontSize: `${item.iconSize}px`}} />{item.label}
                </Link>
            ))}
          </div>
        </div>
        }
      </div>
  );
};

PopupSearch.propTypes = {

};

export default withRouter(connect(state => ({
  accounts: state.accounts,
}))(PopupSearch));

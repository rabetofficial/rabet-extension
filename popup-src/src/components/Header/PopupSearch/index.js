import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import shorter from 'Root/helpers/shorter';
import formatCurrency from 'Root/helpers/formatCurrency';
import PopupList from 'Root/pageComponents/PopupList';
import * as route from 'Root/staticRes/routes';
import styles from './styles.less';

const PopupSearch = props => {
  const [searchString, setSearchString] = useState('');
  const [result, setResult] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

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

    console.warn(accounts);

  }, [searchString]);

  let activeAccountIndex = accounts.findIndex(x => x.active);

  if (activeAccountIndex === -1) {
    activeAccountIndex = 0;
  }

  // console.warn(activeAccountIndex);

  const toggleMenu = () => {
    setToggle(!toggle);
    props.toggleOverlay(!toggle);
  };

  const buttons = [
    {link: route.createWalletPage, icon: 'icon-plus-math', iconSize: '14',  label: 'Create Wallet'},
    {link: route.restoreWalletPage, icon: 'icon-file',iconSize: '14', label: 'Import Wallet'},
    {link: '/', icon: 'icon-settings-2',iconSize: '15', label: 'Setting'},
    {link: '/', icon: 'icon-lock-2',iconSize: '15', label: 'Lock'},
  ];

  return (
      <>
        <button className={styles.toggle} onClick={() => {toggleMenu()}}>
          {props.accounts[activeAccountIndex].name.substr(0, 1).toUpperCase()}
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
              <div>
              <ul className={styles.list}>
                {accounts.map((account, index) =>
                    <li key={index} className={((accounts.length -1) !== index) ? styles.border : ''}>
                      <PopupList info={ account }/>
                    </li>
                )}
              </ul>
                <div className={ styles.group }>
                  {buttons.map((item, index) => (
                      <Link key={index} to={item.link} className={ styles.link }>
                        <span className={item.icon} style={{fontSize: `${item.iconSize}px`}} />{item.label}
                      </Link>
                  ))}
                </div>
              </div>:
              <span>No accounts found</span>
          }
        </div>
        }
      </>
  );
};

PopupSearch.propTypes = {

};

export default connect(state => ({
  accounts: state.accounts,
}))(PopupSearch);

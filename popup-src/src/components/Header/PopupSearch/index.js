import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shorter from 'Root/helpers/shorter';
import formatCurrency from 'Root/helpers/formatCurrency';
import styles from './styles.less';

const PopupSearch = props => {
  const [searchString, setSearchString] = useState('');
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
      console.warn(accounts);
    }

  }, [searchString]);

  let activeAccountIndex = accounts.findIndex(x => x.active);

  if (activeAccountIndex === -1) {
    activeAccountIndex = 0;
  }

  const toggleMenu = () => {
    setToggle(!toggle);
    props.toggleOverlay(!toggle);
  };

  return (
      <>
        <button onClick={() => {toggleMenu()}}>toggle</button>
        {toggle &&
        <div className={styles.card}>
          <input
              type = "text"
              value = {searchString}
              onChange = {(e) => handleChange(e)}
              placeholder = "Type here" />
          <ul>
            {accounts.map((l, index) => <li key={index}>{l.name} <a href = {l.url}>{l.url}</a></li>) }
          </ul>
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

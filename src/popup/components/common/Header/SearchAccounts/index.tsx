import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import shorter from 'popup/utils/shorter';
import showBalance from 'popup/utils/showBalance';
import formatCurrency from 'popup/utils/formatCurrency';
import numberWithCommas from 'popup/utils/numberWithCommas';
import getTotalBalance from 'popup/utils/getTotalBalance';
import Popover from 'popup/components/common/Popover';
import AccountList from './AccountsList';
import Menus from './Menus';

import * as S from './styles';

type AppProps = {
  isOpen: boolean;
  accounts: any;
  options: any;
  currencies: any;
  [x: string]: any;
};

const SearchAccounts = ({
  isOpen,
  accounts: accs,
  options: o,
  currencies,
  ...props
}: AppProps) => {
  const activeCurrency = currencies[o.currency] || {
    value: 0,
    currency: 'USD',
  };
  const [searchString, setSearchString] = useState('');
  const [accounts, setAccounts] = useState([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
        numberWithCommas(
          formatCurrency(
            getTotalBalance(item.balances, activeCurrency),
          ),
        ),
        activeCurrency.name,
      ),
      isConnected: item.isConnected,
    }));

    setAccounts(items);
    let list = items;

    if (searchString && searchString.length > 0) {
      const data = searchString.trim().toLowerCase();
      list = list.filter((l) => l.name.toLowerCase().match(data));
      setAccounts(list);
    }
  }, [searchString, accs]);

  useEffect(() => {
    setSearchString('');
  }, [isOpen]);

  const handleOverlayOn = () => props.toggleOverlay(true);
  const handleOverlayOff = () => props.toggleOverlay(false);

  return (
    <>
      <S.ToggleButton
        type="button"
        ref={buttonRef}
        onClick={handleOverlayOn}
      >
        {accs[activeAccountIndex] && accs[activeAccountIndex].name
          ? accs[activeAccountIndex].name.substr(0, 1).toUpperCase()
          : 'A'}
      </S.ToggleButton>

      <Popover
        placement="bottom"
        ref={buttonRef}
        onHide={handleOverlayOff}
      >
        <S.Card>
          <S.InputSearch
            type="text"
            value={searchString}
            onChange={(e) => handleChange(e)}
            placeholder="&#xe915;  Search Accounts"
          />

          <AccountList accounts={accounts} />

          <Menus />
        </S.Card>
      </Popover>
    </>
  );
};

export default connect((state) => ({
  options: state.options,
  accounts: state.accounts,
  currencies: state.currencies,
}))(SearchAccounts);

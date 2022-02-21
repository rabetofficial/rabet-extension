import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import shorter from 'popup/utils/shorter';
import showBalance from 'popup/utils/showBalance';
import formatCurrency from 'popup/utils/formatCurrency';
import numberWithCommas from 'popup/utils/numberWithCommas';
import getTotalBalance from 'popup/utils/getTotalBalance';
import Popover from 'popup/components/common/Popover';
import Search from 'popup/svgs/Search';
import AccountList from './AccountsList';
import Menus from './Menus';

import * as S from './styles';

type AppProps = {
  isOpen: boolean;
  accounts: any;
  options: any;
  currencies: any;
  usage: 'extension' | 'expand' | undefined;
  [x: string]: any;
};

const SearchAccounts = ({
  isOpen,
  accounts: accs,
  options: o,
  currencies,
  usage,
  ...props
}: AppProps) => {
  const activeCurrency = currencies[o.currency] || {
    value: 0,
    currency: 'USD',
  };
  const [searchString, setSearchString] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const onShowPopover = () => setShowPopover(true);
  const onHidePopover = () => setShowPopover(false);

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

  const handleOverlayOn = () => {
    props.toggleOverlay(true);
    onShowPopover();
  };
  const handleOverlayOff = () => props.toggleOverlay(false);

  const triggerElement = (
    <S.ToggleButton type="button" onClick={handleOverlayOn}>
      {accs[activeAccountIndex] && accs[activeAccountIndex].name
        ? accs[activeAccountIndex].name.substr(0, 1).toUpperCase()
        : 'A'}
    </S.ToggleButton>
  );

  return (
    <>
      <Popover
        placement="bottom"
        visible={showPopover}
        hideFunc={onHidePopover}
        onHide={handleOverlayOff}
        triggerElement={triggerElement}
      >
        <S.Card>
          <div className="relative">
            <S.InputSearch
              type="text"
              value={searchString}
              onChange={(e) => handleChange(e)}
              placeholder="Search Accounts"
            />
            {!searchString && (
              <S.SearchIcon>
                <Search />
              </S.SearchIcon>
            )}
          </div>

          <AccountList accounts={accounts} />

          <Menus usage={usage} onHidePopover={onHidePopover} />
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

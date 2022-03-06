import React, { useState, useEffect } from 'react';

import Search from 'popup/svgs/Search';
import { IAccount } from 'popup/reducers/accounts2';
import Popover from 'popup/components/common/Popover';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import useActiveAccount from 'popup/hooks/useActiveAccount';

import Menus from './Menus';
import * as S from './styles';
import AccountList from './AccountsList';

type AppProps = {
  isOpen: boolean;
  usage: 'extension' | 'expand';
  [x: string]: any;
};

const SearchAccounts = ({ usage, isOpen, ...props }: AppProps) => {
  const { name } = useActiveAccount();
  const [searchString, setSearchString] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [activeAccounts, setActiveAccounts] = useState<IAccount[]>(
    [],
  );
  const accounts = useTypedSelector((store) => store.accounts);

  const onShowPopover = () => setShowPopover(true);
  const onHidePopover = () => setShowPopover(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    if (searchString.length > 0) {
      const data = searchString.trim().toLowerCase();

      setActiveAccounts(
        accounts.filter((account) =>
          account.name.toLowerCase().match(data),
        ),
      );
    } else {
      setActiveAccounts(accounts);
    }
  }, [searchString, accounts]);

  useEffect(() => {
    setSearchString('');
  }, [isOpen]);

  const handleOverlayOn = () => {
    props.toggleOverlay(true);
    onShowPopover();
  };
  const handleOverlayOff = () => {
    props.toggleOverlay(false);
  };

  const triggerElement = (
    <S.ToggleButton type="button" onClick={handleOverlayOn}>
      {name.slice(0, 1).toUpperCase()}
    </S.ToggleButton>
  );

  return (
    <>
      <Popover
        placement="bottom-start"
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
              onChange={handleChange}
              placeholder="Search Accounts"
            />

            {!searchString && (
              <S.SearchIcon>
                <Search />
              </S.SearchIcon>
            )}
          </div>

          <AccountList accounts={activeAccounts} />

          <Menus usage={usage} onHidePopover={onHidePopover} />
        </S.Card>
      </Popover>
    </>
  );
};

export default SearchAccounts;

import styled from 'styled-components';
import React, { useState } from 'react';

import { Tab } from 'popup/models';
import Tabs from 'popup/components/common/Tabs';
import Popover from 'popup/components/common/Popover';
import useTypedSelector from 'popup/hooks/useTypedSelector';

import AccountList from './AccountList';

const Container = styled.div`
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 2px 10px 0 rgba(134, 146, 164, 0.08);
  border: solid 1px ${({ theme }) => theme.colors.primary.lighter};
`;

type DestinationProps = {
  handleChange: (publicKey: string) => void;
};

const DestinationSuggest = ({ handleChange }: DestinationProps) => {
  const [accounts, contacts] = useTypedSelector((store) => [
    store.accounts,
    store.contacts,
  ]);
  const [showPopover, setShowPopover] = useState(true);

  const onHidePopover = () => setShowPopover(false);
  const parent = document.querySelector('#full');

  const onChange = (publicKey: string) => {
    setShowPopover(false);

    handleChange(publicKey);
  };

  const tabs: Tab[] = [
    {
      id: '1',
      title: 'My Accounts',
      content: (
        <AccountList
          accounts={accounts}
          onChange={onChange}
          name="accounts"
        />
      ),
    },
    {
      id: '2',
      title: 'My Contacts',
      content: (
        <AccountList
          accounts={contacts}
          onChange={onChange}
          name="contacts"
        />
      ),
    },
  ];

  return (
    <Popover
      placement="bottom-end"
      visible={showPopover}
      hideFunc={onHidePopover}
      parent={parent}
      arrow={false}
    >
      <Container>
        <Tabs
          data={tabs}
          isEqualWidth
          titleClass="!text-sm"
          contentClass="!pt-[11px]"
        />
      </Container>
    </Popover>
  );
};

export default DestinationSuggest;

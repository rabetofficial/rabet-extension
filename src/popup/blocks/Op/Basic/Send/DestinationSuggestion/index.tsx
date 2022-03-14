import React, { useState } from 'react';
import styled from 'styled-components';
import Popover from 'popup/components/common/Popover';
import { Tab } from 'popup/models';
import Tabs from 'popup/components/common/Tabs';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import AccountList from './AccountList';

const Container = styled.div`
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 2px 10px 0 rgba(134, 146, 164, 0.08);
  border: solid 1px ${({ theme }) => theme.colors.primary.lighter};
`;

const DestinationSuggest = () => {
  const [accounts, contacts] = useTypedSelector((store) => [
    store.accounts,
    store.contacts,
  ]);
  const [showPopover, setShowPopover] = useState(true);
  const onHidePopover = () => setShowPopover(false);
  const parent = document.querySelector('#full');

  const tabs: Tab[] = [
    {
      id: '1',
      title: 'My Accounts',
      content: <AccountList accounts={accounts} />,
    },
    {
      id: '2',
      title: 'My Contacts',
      content: '2',
    },
  ];

  return (
    <Popover
      placement="bottom-start"
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

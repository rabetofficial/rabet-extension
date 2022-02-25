import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import changeNetworkAction from 'popup/actions/options/changeNetwork';
import DropDown from 'popup/components/common/DropDown';
import { ElementOption } from 'popup/models';
import useTypedSelector from 'popup/hooks/useTypedSelector';

import Container from './styles';

type AppProps = {
  theme: 'dark' | 'light';
};

const items = [
  { value: 'MAINNET', label: 'Main Network' },
  { value: 'TESTNET', label: 'Test Network' },
];

const Network = ({ theme }: AppProps) => {
  const navigate = useNavigate();
  const options = useTypedSelector((store) => store.options);

  let index = 0;

  if (options.network === 'MAINNET') {
    index = 0;
  } else if (options.network === 'TESTNET') {
    index = 1;
  }

  const [selected, setSelected] = useState<ElementOption>(
    items[index],
  );

  const onChangeNetwork = (e: ElementOption) => {
    changeNetworkAction(e, navigate);

    setSelected(e);
  };

  return (
    <Container isMain={selected.value === items[0].value} drop={theme}>
      <DropDown
        width={160}
        items={items}
        selected={selected}
        onChange={onChangeNetwork}
      />
    </Container>
  );
};

export default Network;

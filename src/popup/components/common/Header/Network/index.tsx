import React, { useState, useEffect } from 'react';

import { ElementOption } from 'popup/models';
import DropDown from 'popup/components/common/DropDown';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import changeNetworkAction from 'popup/actions/options/changeNetwork';

import Container from './styles';

type AppProps = {
  theme: 'dark' | 'light';
};

const Network = ({ theme }: AppProps) => {
  const options = useTypedSelector((store) => store.options);

  const items = [
    { value: 'MAINNET', label: 'Main Network' },
    { value: 'TESTNET', label: 'Test Network' },
  ];

  const [selected, setSelected] = useState<ElementOption>(() => {
    if (options.network === 'MAINNET') {
      return items[0];
    }

    return items[1];
  });

  useEffect(() => {
    if (options.network === 'MAINNET') {
      setSelected(items[0]);
    } else {
      setSelected(items[1]);
    }
  }, [options.network]);

  const onChangeNetwork = (e: ElementOption) => {
    if (e.value === 'MAINNET' || e.value === 'TESTNET') {
      changeNetworkAction(e.value);
    }

    setSelected(e);
  };

  return (
    <Container isMain={selected === items[0]} drop={theme}>
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

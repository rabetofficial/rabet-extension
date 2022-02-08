import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import changeNetworkAction from 'popup/actions/options/changeNetwork';
import DropDown from 'popup/components/common/DropDown';
import { ElementOption } from 'popup/models';

import Container from './styles';

type AppProps = {
  options: any;
};

const Network = ({ options }: AppProps) => {
  const navigate = useNavigate();
  const items = [
    { value: 'MAINNET', label: 'Main Network' },
    { value: 'TESTNET', label: 'Test Network' },
  ];

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
    <Container isMain={selected === items[0]}>
      <DropDown
        width={160}
        items={items}
        selected={selected}
        onChange={onChangeNetwork}
      />
    </Container>
  );
};

export default connect((state) => ({
  options: state.options,
}))(Network);

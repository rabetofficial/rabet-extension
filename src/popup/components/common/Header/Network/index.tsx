import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Select from 'react-select';

import changeNetworkAction from 'popup/actions/options/changeNetwork';
import { useNavigate } from 'react-router-dom';

import styles from '../styles.less';

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

  const [selected, setSelected] = useState(items[index]);

  const onChangeNetwork = (e) => {
    changeNetworkAction(e, navigate);

    setSelected(e);
  };
  return (
    <div>
      <div
        className={classNames(
          styles.select,
          selected === items[0] ? styles.main : styles.test,
        )}
      >
        <Select
          classNamePrefix="net"
          separator={false}
          closeMenuOnSelect
          defaultValue={items[index]}
          options={items}
          hideSelectedOptions={false}
          isSearchable={false}
          backspaceRemovesValue={false}
          onChange={(e) => onChangeNetwork(e)}
          styles={{
            ...styles,
            control: (base, state) => ({
              ...base,
              borderColor: state.isFocused ? 'black' : 'black',
              boxShadow: state.isFocused ? 0 : 0,
              '&:hover': { borderColor: 'black' },
            }),
          }}
        />
      </div>
    </div>
  );
};

export default connect((state) => ({
  options: state.options,
}))(Network);

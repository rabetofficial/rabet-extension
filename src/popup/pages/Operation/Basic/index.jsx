import classNames from 'classnames';
import React, { useState } from 'react';

import Swap from './Swap';
import Send from './Send';

import Card from '../../../components/Card';
import Header from '../../../components/Header';
import SelectOption from '../../../components/SelectOption';

import styles from './styles.less';

const BasicOperation = () => {
  const modes = [
    { value: 'swap', label: 'Swap' },
    { value: 'send', label: 'Send' },
  ];

  const [selected, setSelected] = useState(modes[0]);

  const onChange = (e) => {
    setSelected(e);
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={classNames('content', styles.content)}>
        <Card type="card-secondary">
          <div className={styles.card}>
            <SelectOption
              items={modes}
              defaultValue={modes[0]}
              variant="select-default"
              onChange={onChange}
              selected={selected}
              isSearchable={false}
            />

            {selected.value === 'swap'
              ? <Swap />
              : <Send />}

          </div>
        </Card>
      </div>
    </div>
  );
};

export default BasicOperation;

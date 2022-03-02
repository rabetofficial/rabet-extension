import React, { useState } from 'react';
import classNames from 'classnames';

import Card from 'popup/components/common/Card';
import SelectOption from 'popup/components/SelectOption';

import Swap from './Swap';
import Send from './Send';

import styles from './styles.less';

const BasicOperation = () => {
  const modes = [
    { value: 'send', label: 'Send' },
    { value: 'swap', label: 'Swap' },
  ];

  const [selected, setSelected] = useState(modes[0]);

  const onChange = (e) => {
    setSelected(e);
  };

  return (
    <>
      <div
        className={classNames(
          'content hidden-scroll',
          styles.content,
        )}
      >
        <Card type="secondary">
          <div className={styles.card}>
            <SelectOption
              items={modes}
              defaultValue={modes[0]}
              variant="select-default"
              onChange={onChange}
              selected={selected}
              isSearchable={false}
            />

            {selected.value === 'swap' ? <Swap /> : <Send />}
          </div>
        </Card>
      </div>
    </>
  );
};

export default BasicOperation;

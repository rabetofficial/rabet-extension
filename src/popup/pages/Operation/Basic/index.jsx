import React, { useState } from 'react';
import classNames from 'classnames';

import Card from '../../../components/Card';
import SelectOption from '../../../components/SelectOption';
import Header from '../../../components/Header';
import { buttonSizes, buttonTypes } from '../../../staticRes/enum';
import Button from '../../../components/Button';
import Swap from './Swap';
import Send from './Send';

import styles from './styles.less';

const BasicOperation = () => {
  const selectItems = [
    { value: 'swap', label: 'Swap' },
    { value: 'send', label: 'Send' },
  ];
  const [selected, setSelected] = useState(selectItems[0]);

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
              items={selectItems}
              defaultValue={selectItems[0]}
              variant="select-default"
              onChange={onChange}
              selected={selected}
              isSearchable={false}
            />

            {selected.value === 'swap' ? <Swap /> : <Send />}

          </div>
        </Card>

        <div className={styles.buttons}>
          <Button
            type="button"
            variant={buttonTypes.default}
            size={buttonSizes.medium}
            content="Cancel"
          />

          <Button
            type="button"
            variant={buttonTypes.primary}
            size={buttonSizes.medium}
            content="Send"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicOperation;

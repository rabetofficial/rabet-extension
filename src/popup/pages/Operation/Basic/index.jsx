import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Swap from './Swap';
import Send from './Send';

import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import SelectOption from '../../../components/SelectOption';
import { buttonSizes, buttonTypes } from '../../../staticRes/enum';

import styles from './styles.less';

const BasicOperation = () => {
  const navigate = useNavigate();

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

        <div className={styles.buttons}>
          <Button
            type="button"
            variant={buttonTypes.default}
            size={buttonSizes.medium}
            content="Cancel"
            onClick={() => { navigate(-1); }}
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

import React, { useState } from 'react';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import Card from '../../../components/Card';
import SelectOption from '../../../components/SelectOption';
import Header from '../../../components/Header';
import InputSelectOption from '../../../components/InputSelectOption';
import questionImg from '../../../../assets/images/question-circle.png';
import angleRightIcon from '../../../../assets/images/angle-right.svg';

import styles from './styles.less';

const BasicOperation = () => {
  const [selected, setSelected] = useState({});

  const onChange = (e) => {
    setSelected(e);
  };

  const selectItems = [
    { value: 'swap', label: 'Swap' },
    { value: 'send', label: 'Send' },
  ];

  const onSubmit = async (values) => {
  };

  const validateForm = async (values) => {

  };

  const generateLabel = (currency) => (
    <div className={styles.selectOption}>
      <img src={questionImg} alt={currency} />
      {' '}
      {currency}
    </div>
  );

  const currencies = [
    { value: 'btc', label: generateLabel('BTC') },
    { value: 'xlm', label: generateLabel('XLM') },
  ];

  const path = ['XLM', 'USDC', 'ETH'];

  return (
    <div>
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
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="from">
                    {({ input, meta }) => (
                      <div className={styles.group}>
                        <label className="label-primary">From</label>
                        <InputSelectOption
                          input={input}
                          meta={meta}
                          max
                          form={form}
                          selectItems={currencies}
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="to">
                    {({ input, meta }) => (
                      <div className={styles.group}>
                        <label className="label-primary">To</label>
                        <InputSelectOption
                          input={input}
                          meta={meta}
                          max={false}
                          selectItems={currencies}
                        />
                      </div>
                    )}
                  </Field>
                </form>
              )}
            />

            <hr className={styles.hr} />

            <div className={styles.box}>
              <div className={styles.boxTitle}>Path</div>
              <div className={styles.boxValue}>
                <div className={styles.path}>
                  {path.map((p, index) => (
                    <div key={index}>
                      {p}
                      {index !== (path.length - 1) && <img src={angleRightIcon} alt="icon" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.boxTitle}>Price impact</div>
              <div className={classNames(styles.boxValue, styles.upStatus)}>1%</div>
            </div>
            <div className={styles.box}>
              <div className={styles.boxTitle}>Minimum received</div>
              <div className={styles.boxValue}>123.5 XLM</div>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
};

export default BasicOperation;

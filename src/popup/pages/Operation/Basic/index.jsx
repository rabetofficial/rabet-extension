import React, { useState } from 'react';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import Card from '../../../components/Card';
import SelectOption from '../../../components/SelectOption';
import Header from '../../../components/Header';
import InputSelectOption from '../../../components/InputSelectOption';
import questionImg from '../../../../assets/images/question-circle.png';

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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BasicOperation;

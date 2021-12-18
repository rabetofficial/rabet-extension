import React from 'react';
import { Field, Form } from 'react-final-form';

import InputSelectOption from '../../../../components/InputSelectModal';
import questionImg from '../../../../../assets/images/question-circle.png';
import SwapDetails from '../../../../pageComponents/SwapDetails';

import styles from './styles.less';

const Swap = () => {
  const onSubmit = async (values) => {
  };

  const validateForm = async (values) => {

  };

  const currencies = Array(5).fill({
    name: 'btc', img: questionImg, info: 'Stellar.org', amount: '120',
  });

  const path = ['XLM', 'USDC', 'ETH'];

  return (
    <div>
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
                    currencies={currencies}
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
                    currencies={currencies}
                  />
                </div>
              )}
            </Field>
          </form>
        )}
      />

      <hr className={styles.hr} />

      <SwapDetails price={1} received={123.5} path={path} />
    </div>
  );
};

export default Swap;

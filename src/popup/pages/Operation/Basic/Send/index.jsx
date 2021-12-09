import React from 'react';
import { Field, Form } from 'react-final-form';

import InputSelectOption from '../../../../components/InputSelectOption';
import Input from '../../../../components/Input';
import questionImg from '../../../../../assets/images/question-circle.png';

import styles from '../Swap/styles.less';

const Send = () => {
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
    <>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <Field name="amount">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className="label-primary">Amount</label>
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

            <Field name="destination">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className="label-primary">Destination</label>
                  <Input
                    type="text"
                    placeholder="G..."
                    size="input-medium"
                    input={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>

            <Field name="memo">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className="label-primary">
                    Memo
                    {' '}
                    <span className="label-optional">(optional)</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="G..."
                    size="input-medium"
                    input={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>
          </form>
        )}
      />
    </>
  );
};

export default Send;

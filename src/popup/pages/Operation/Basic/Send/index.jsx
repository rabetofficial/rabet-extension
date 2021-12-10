import React from 'react';
import { Field, Form } from 'react-final-form';

import InputSelectOption from '../../../../components/InputSelectModal';
import Input from '../../../../components/Input';
import questionImg from '../../../../../assets/images/question-circle.png';

import styles from './styles.less';

const Send = () => {
  const onSubmit = async (values) => {
  };

  const validateForm = async (values) => {

  };

  const currencies = [
    {
      name: 'btc', img: questionImg, web: 'Stellar.org', amount: '120',
    },
    {
      name: 'xlm', img: questionImg, web: 'Stellar.org', amount: '120',
    },
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
                    currencies={currencies}
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

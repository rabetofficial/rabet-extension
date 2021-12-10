import React from 'react';
import classNames from 'classnames';
import { Field, Form } from 'react-final-form';

import InputSelectOption from '../../../../components/InputSelectModal';
import angleRightIcon from '../../../../../assets/images/angle-right.svg';
import questionImg from '../../../../../assets/images/question-circle.png';

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
  );
};

export default Swap;

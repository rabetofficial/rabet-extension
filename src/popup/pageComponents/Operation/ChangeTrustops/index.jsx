import classNames from 'classnames';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import SelectOption from '../../../components/SelectOption';
import validateNumber from '../../../utils/validate/number';
import currentActiveAccount from '../../../utils/activeAccount';
import changeOperationAction from '../../../actions/operations/change';

import styles from './styles.less';
import isNative from '../../../utils/isNative';

const ChangeTrustOps = ({ id }) => {
  const { activeAccount: { balances: b } } = currentActiveAccount();
  const balances = b.filter((x) => !isNative(x));

  const [selected, setSelected] = useState(balances[0]);

  const onChange = (e) => setSelected(e);

  const validateForm = async (values) => {
    const errors = {};
    const hasError = {
      code: false,
    };

    if (values.limit && !validateNumber(values.limit)) {
      errors.limit = null;
      hasError.limit = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      const l = parseInt(values.limit, 10);

      if (l > 922337203685 || l < 1) {
        errors.limit = 'Limit number must be between 1 and 922,337,203,685';
        hasError.limit = true;
      }
    }

    if (!hasError.limit && selected.value) {
      changeOperationAction(id, {
        checked: true,
        limit: values.limit,
        asset: selected,
      });
    }

    return errors;
  };

  return (
    <Form
      onSubmit={() => {}}
      validate={(values) => validateForm(values)}
      render={({ submitError, handleSubmit }) => (
        <form
          className={classNames(styles.form, 'form')}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="limit">
            {({ input, meta }) => (
              <div className="pure-g group">
                <div className={styles.selectInput}>
                  <label className="label-primary">Limit amount</label>
                  <Input
                    type="number"
                    placeholder="1000"
                    size="input-medium"
                    input={input}
                    meta={meta}
                  />
                </div>
                <div className={styles.select}>
                  <SelectOption
                    items={balances}
                    onChange={onChange}
                    variant="select-outlined"
                    defaultValue={selected}
                    selected={selected}
                  />
                </div>
              </div>
            )}
          </Field>
          {submitError && <div className="error">{submitError}</div>}
        </form>
      )}
    />
  );
};

export default ChangeTrustOps;

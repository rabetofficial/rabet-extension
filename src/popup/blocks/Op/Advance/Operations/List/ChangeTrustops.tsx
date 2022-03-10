import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import SelectOption from 'popup/components/common/SelectOption';
import validateNumber from 'popup/utils/validate/number';
import changeOperationAction from 'popup/actions/operations/change';
import isNative from 'popup/utils/isNative';
import { ElementOption } from 'popup/models';

type FormValidate = {
  limit: any;
};

type AppProps = {
  id: string;
};

const ChangeTrustOps = ({ id }: AppProps) => {
  const b = Array(5).fill({
    asset_code: 'XLM',
    asset_issuer: '123',
    last_modified_ledger: '234',
    limit: '567',
    is_authorized: false,
    is_authorized_to_maintain_liabilities: true,
    logo: '',
    domain: 'Stellar.org',
    toNative: 1,
  });

  const balances = b.filter((x) => !isNative(x));

  const [selected, setSelected] = useState(balances[0]);

  const onChange = (e: ElementOption) => setSelected(e);

  const validateForm = async (values: FormValidate) => {
    type HasError = {
      limit?: boolean;
      code: boolean;
    };

    const errors = {} as FormValidate;
    const hasError: HasError = {
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
        errors.limit =
          'Limit number must be between 1 and 922,337,203,685';
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
      validate={(values: FormValidate) => validateForm(values)}
      render={({ submitError, handleSubmit }) => (
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="limit">
            {({ input, meta }) => (
              <>
                <label className="label-primary">Limit amount</label>

                <div className="flex items-center">
                  <Input
                    type="number"
                    placeholder="1000"
                    size="medium"
                    styleType="light"
                    className="grow"
                    input={input}
                    meta={meta}
                  />
                  <SelectOption
                    items={balances}
                    onChange={onChange}
                    variant="outlined"
                    width={99}
                    className="ml-2"
                    defaultValue={selected}
                    selected={selected}
                  />
                </div>
              </>
            )}
          </Field>
          {submitError && <div className="error">{submitError}</div>}
        </form>
      )}
    />
  );
};

export default ChangeTrustOps;

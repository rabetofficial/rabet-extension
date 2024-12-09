import React, { useState } from 'react';
import { Horizon } from '@stellar/stellar-sdk';
import { Form, Field } from 'react-final-form';

import BN from 'helpers/BN';
import { ElementOption } from 'popup/models';
import Input from 'popup/components/common/Input';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import SelectOption from 'popup/components/common/SelectOption';
import controlNumberInput from 'popup/utils/controlNumberInput';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  limit: string;
};

type AppProps = {
  id: string;
};

type HasError = {
  limit: boolean;
};

const ChangeTrustOps = ({ id }: AppProps) => {
  const account = useActiveAccount();

  const assets = account.assets || [];
  const filteredAssets = assets.filter(
    (x) =>
      x.asset_type !== 'native' &&
      x.asset_type !== 'liquidity_pool_shares',
  );
  const mappedAssets = filteredAssets.map((ast) => ({
    label: ast.asset_code || 'XLM',
    value: ast,
  }));

  const [selected, setSelected] = useState(mappedAssets[0]);

  const onChange = (
    e: ElementOption<Horizon.HorizonApi.BalanceLine>,
  ) => setSelected(e);

  const validateForm = async (v: FormValidate) => {
    const values = {
      ...v,
      asset: selected.value,
    };

    const errors: Partial<FormValidate> = {};
    const hasError: Partial<HasError> = {};

    const l = new BN(values.limit);
    if (values.limit && l.isNaN()) {
      errors.limit = '';
      hasError.limit = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (l.isGreaterThan(922_337_203_685) || l.isLessThan(0)) {
        errors.limit =
          'Limit number must be between 0 and 922,337,203,685';
        hasError.limit = true;
      }
    }

    if (!hasError.limit && selected.value) {
      changeOperationAction(id, {
        checked: true,
        limit: values.limit,
        asset: values.asset,
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

                <div className="flex items-start pt-2">
                  <div className="basis-full">
                    <Input
                      noMT
                      type="number"
                      placeholder="1000"
                      size="medium"
                      styleType="light"
                      className="grow"
                      input={input}
                      meta={meta}
                      onKeyPress={controlNumberInput}
                    />
                  </div>

                  <SelectOption
                    items={mappedAssets}
                    onChange={onChange}
                    variant="outlined"
                    width={99}
                    className="ml-2"
                    indicatorSize="small"
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

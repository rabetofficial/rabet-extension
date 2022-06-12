import { Horizon, StrKey } from 'stellar-sdk';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { DateTime } from 'luxon';

import BN from 'helpers/BN';
import { ElementOption } from 'popup/models';
import Input from 'popup/components/common/Input';
import getAccountData from 'popup/api/getAccount';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import DatePicker from 'popup/components/common/DatePicker';
import isTransferable from 'popup/utils/isTransferable';
import controlNumberInput from 'popup/utils/controlNumberInput';
import SelectOption from 'popup/components/common/SelectOption';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  amount: string;
  destination: string;
  startDate: string;
  endDate: string;
};

type AppProps = {
  id: string;
};

const CreateClaimableBalance = ({ id }: AppProps) => {
  const [currentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  const account = useActiveAccount();

  const assets = account.assets || [];
  const assetsMapped = assets.map((asset) => ({
    label: asset.asset_code || 'XLM',
    value: asset,
  }));

  const [selected, setSelected] = useState(assetsMapped[0]);

  const onChange = (e: ElementOption<Horizon.BalanceLine>) => {
    setSelected(e);
  };

  const onChangeDate = (e: Date, forDate: 'start' | 'end') => {
    if (forDate === 'start') {
      setStartDate(e);
    } else {
      setEndDate(e);
    }
  };

  const validateForm = async (v: FormValidate) => {
    const values = {
      ...v,
      asset: selected.value,
      startDate,
      endDate,
    };

    const errors: Partial<FormValidate> = {};
    const hasError = {
      amount: false,
      destination: false,
      startDate: false,
      endDate: false,
    };

    hasError.startDate = true;
    errors.startDate = 'some errors';

    hasError.endDate = true;
    errors.endDate = 'some new errors';

    const sDate =
      DateTime.fromJSDate(startDate).toFormat('yyyy LLL dd');

    const eDate =
      DateTime.fromJSDate(endDate).toFormat('yyyy LLL dd');

    if (sDate === eDate) {
      hasError.amount = true;
      errors.amount = 'Dates cannot be the same.';
    } else if (+startDate > +endDate) {
      hasError.amount = true;
      errors.amount = 'End date should be after start date.';
    }

    if (!values.amount) {
      errors.amount = '';
      hasError.amount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else if (new BN(values.amount).isLessThanOrEqualTo('0')) {
      errors.amount = 'Amount must be higher than 0.';
      hasError.amount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (
        !isInsufficientAsset(
          values.asset,
          account.subentry_count,
          values.amount,
        )
      ) {
        errors.amount = `Insufficient ${
          values.asset.asset_code || 'XLM'
        } balance.`;
        hasError.amount = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.destination) {
      errors.destination = '';
      hasError.destination = true;
    } else {
      if (!StrKey.isValidEd25519PublicKey(values.destination)) {
        errors.destination = 'Invalid destination.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!hasError.amount && !hasError.destination && values.asset) {
      const accountData = await getAccountData(values.destination);

      const [, resultCode] = isTransferable(values, accountData);

      if (resultCode === 'INACTIVE') {
        errors.destination =
          'Inactive accounts cannot receive tokens.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      } else {
        changeOperationAction(id, {
          checked: true,
          ...values,
        });
      }
    }
    console.warn(errors);
    return errors;
  };

  return (
    <Form
      onSubmit={() => {}}
      validate={(values: FormValidate) => validateForm(values)}
      render={({ submitError, handleSubmit, form }) => (
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="destination">
            {({ input, meta }) => (
              <>
                <label className="label-primary">Destination</label>

                <Input
                  type="text"
                  placeholder="G…"
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </>
            )}
          </Field>

          <Field name="amount">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">Amount</label>

                <div className="flex items-start pt-2">
                  <div className="basis-full">
                    <Input
                      noMT
                      type="number"
                      placeholder="1"
                      size="medium"
                      input={input}
                      meta={meta}
                      variant="max"
                      styleType="light"
                      className="grow"
                      setMax={form.mutators.setMax}
                      onKeyPress={controlNumberInput}
                    />
                  </div>

                  <SelectOption
                    items={assetsMapped}
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

          <div className="flex items-start space-x-4 mt-2">
            <div className="flex-1">
              <label className="label-primary">From</label>
              <Field name="startDate">
                {({ meta }) => (
                  <>
                    <DatePicker
                      value={startDate}
                      onChange={(e) => {
                        onChangeDate(e, 'start');
                      }}
                      className="my-2"
                    />
                    <span className="error">
                      {meta.error || meta.submitError}
                    </span>
                  </>
                )}
              </Field>
            </div>

            <div className="flex-1">
              <label className="label-primary">To</label>
              <Field name="endDate">
                {({ meta }) => (
                  <>
                    <DatePicker
                      value={endDate}
                      onChange={(e) => {
                        onChangeDate(e, 'end');
                      }}
                      className="my-2"
                    />
                    <span className="error">
                      {meta.error || meta.submitError}
                    </span>
                  </>
                )}
              </Field>
            </div>
          </div>

          {submitError && <div className="error">{submitError}</div>}
        </form>
      )}
    />
  );
};

export default CreateClaimableBalance;

import React, {useState} from 'react';
import {Field, Form} from "react-final-form";
import {Asset, Horizon} from "stellar-sdk";

import Input from "popup/components/common/Input";
import controlNumberInput from "popup/utils/controlNumberInput";
import SelectOption from "popup/components/common/SelectOption";
import {ElementOption} from "popup/models";
import useActiveAccount from "popup/hooks/useActiveAccount";

type FormValidate = {
    amount: string;
    destination: string;
};

type AppProps = {
    id: string;
};

const ClaimableBalance = ({ id }: AppProps) => {
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

    const validateForm = async (v: FormValidate) => {}
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

            {submitError && (
              <div className="error">{submitError}</div>
            )}
          </form>
        )}
      />
    );
};

export default ClaimableBalance;
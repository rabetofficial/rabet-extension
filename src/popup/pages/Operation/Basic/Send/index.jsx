import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';

import Input from '../../../../components/Input';
import matchAsset from '../../../../utils/matchAsset';
import currentActiveAccount from '../../../../utils/activeAccount';
import InputSelectOption from '../../../../components/InputSelectModal';

import styles from './styles.less';
import validateMemo from '../../../../utils/validate/memo';

const Send = () => {
  const assetImages = useSelector((store) => store.assetImages);
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();
  const [selectedAsset, setSelectedAsset] = useState([]);

  const [assets] = useState(() => {
    const newList = [];

    for (let i = 0; i < balances.length; i += 1) {
      const assetImage = assetImages.find((x) => matchAsset(x, balances[i]));

      newList.push({
        logo: assetImage?.logo,
        domain: assetImage?.domain,
        value: balances[i].asset_code,
        label: balances[i].asset_code,
        ...balances[i],
      });
    }

    return newList;
  });

  const onSubmit = async (values) => {
  };

  const validateForm = async (v) => {
    const values = {
      ...v,
      asset: selectedAsset,
    };

    if (values.memo && !validateMemo(values.memo)) {
      return {
        memo: 'Memo should not be more than 28 characters.',
      };
    }

    return {};
  };

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
                  <Input
                    type="number"
                    placeholder="123"
                    size="input-medium"
                    input={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>

            <Field name="asset">
              {({ input, meta }) => (
                <InputSelectOption
                  input={input}
                  meta={meta}
                  max
                  form={form}
                  currencies={assets}
                  onChange={setSelectedAsset}
                />
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

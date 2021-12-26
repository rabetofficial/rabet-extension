import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import getMaxBalance from '../../../../utils/maxBalance';
import SwapDetails from '../../../../pageComponents/SwapDetails';
import currentActiveAccount from '../../../../utils/activeAccount';
import SelectAssetModal from '../../../../components/SelectAssetModal';
import { buttonSizes, buttonTypes, inputTypes } from '../../../../staticRes/enum';

import styles from './styles.less';

const Swap = () => {
  const navigate = useNavigate();
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();
  const [selectedAsset1, setSelectedAsset1] = useState(balances[0]);
  const [selectedAsset2, setSelectedAsset2] = useState(balances[0]);
  const [path, setPath] = useState([]);
  const [showSwapInfo, setShowSwapInfo] = useState(false);

  const onSubmit = async (values) => {
    console.warn(values);
  };

  const validateForm = async (v) => {
    const values = {
      ...v,
      asset1: selectedAsset1,
      asset2: selectedAsset2,
    };

    if (!values.from) {
      setShowSwapInfo(false);

      return {
        from: 'Invalid amount.',
      };
    }

    setShowSwapInfo(true);

    return {};
  };

  return (
    <div>
      <Form
        mutators={{
          setMax: (a, s, u) => {
            u.changeValue(s, 'from', () => getMaxBalance(selectedAsset1));
          },
        }}
        onSubmit={onSubmit}
        validate={validateForm}
        render={({
          form,
          pristine,
          invalid,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.group}>
              <label className="label-primary">From</label>
              <div className={styles.inputModal}>
                <div className={styles.inputValue}>
                  <Field name="from">
                    {({ input, meta }) => (
                      <Input
                        type="number"
                        placeholder="123"
                        size="input-medium"
                        input={input}
                        meta={meta}
                        variant={inputTypes.max}
                        setMax={form.mutators.setMax}
                      />
                    )}
                  </Field>
                </div>

                <Field name="asset1">
                  {({ input, meta }) => (
                    <SelectAssetModal
                      input={input}
                      meta={meta}
                      max
                      form={form}
                      currencies={balances}
                      onChange={setSelectedAsset1}
                    />
                  )}
                </Field>
              </div>
            </div>

            <div className={styles.group}>
              <label className="label-primary">To</label>
              <div className={styles.inputModal}>
                <div className={styles.inputValue}>
                  <Field name="to">
                    {({ input, meta }) => (
                      <Input
                        type="number"
                        placeholder="123"
                        size="input-medium"
                        input={input}
                        meta={meta}
                      />
                    )}
                  </Field>
                </div>

                <Field name="asset2">
                  {({ input, meta }) => (
                    <SelectAssetModal
                      input={input}
                      meta={meta}
                      max={false}
                      currencies={balances}
                      onChange={setSelectedAsset2}
                    />
                  )}
                </Field>

              </div>

              <hr className={styles.hr} />

              {showSwapInfo
                ? <SwapDetails price={1} received={123.5} path={path} />
                : ''}
            </div>

            <div className={styles.buttons}>
              <Button
                type="button"
                variant={buttonTypes.default}
                size={buttonSizes.medium}
                content="Cancel"
                onClick={() => { navigate(-1); }}
              />

              <Button
                type="submit"
                variant={buttonTypes.primary}
                size={buttonSizes.medium}
                content="Send"
                disabled={invalid || pristine}
              />
            </div>
          </form>
        )}
      />

    </div>
  );
};

export default Swap;

import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Input from '../../../../components/Input';
import SwapDetails from '../../../../pageComponents/SwapDetails';
import currentActiveAccount from '../../../../utils/activeAccount';
import SelectAssetModal from '../../../../components/SelectAssetModal';

import styles from './styles.less';

const Swap = () => {
  const navigate = useNavigate();
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();
  const [selectedAsset, setSelectedAsset] = useState(balances[0]);

  const onSubmit = async (values) => {
    console.warn(values);
  };

  const validateForm = async (values) => {

  };

  const path = ['XLM', 'USDC', 'ETH'];

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.group}>
              <label className="label-primary">From</label>
              <div className={styles.inputModal}>
                <Field name="from">
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
                <Field name="asset1">
                  {({ input, meta }) => (
                    <SelectAssetModal
                      input={input}
                      meta={meta}
                      max
                      form={form}
                      currencies={[]}
                    />
                  )}
                </Field>
              </div>
            </div>

            <div className={styles.group}>
              <label className="label-primary">To</label>
              <div className={styles.inputModal}>
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

                <Field name="asset2">
                  {({ input, meta }) => (
                    <SelectAssetModal
                      input={input}
                      meta={meta}
                      max={false}
                      currencies={[]}
                    />
                  )}
                </Field>

              </div>
            </div>

          </form>
        )}
      />

      <hr className={styles.hr} />

      <SwapDetails price={1} received={123.5} path={path} />
    </div>
  );
};

export default Swap;

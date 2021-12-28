import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import isNative from '../../../../utils/isNative';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import getMaxBalance from '../../../../utils/maxBalance';
import SwapDetails from '../../../../pageComponents/SwapDetails';
import currentActiveAccount from '../../../../utils/activeAccount';
import SelectAssetModal from '../../../../components/SelectAssetModal';
import { buttonSizes, buttonTypes, inputTypes } from '../../../../staticRes/enum';
import iconRotateSrc from '../../../../../assets/images/arrow-rotate.svg';

import styles from './styles.less';
import nativeAsset from '../../../../utils/nativeAsset';
import matchAsset from '../../../../utils/matchAsset';

const Swap = () => {
  const navigate = useNavigate();
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();
  const [balances1, setBalances1] = useState(balances);
  const [balances2, setBalances2] = useState(balances);
  const [selectedAsset1, setSelectedAsset1] = useState(balances[0]);
  const [selectedAsset2, setSelectedAsset2] = useState(balances[0]);
  const [path, setPath] = useState([]);
  const [showSwapInfo, setShowSwapInfo] = useState(false);

  const onSubmit = async (values) => {
    console.warn(values);
  };

  const filterAssets = (asset) => {
    let b;

    if (isNative(asset)) {
      b = balances.filter((x) => !nativeAsset(x));
    } else {
      b = balances.filter((x) => !matchAsset(x, asset));
    }

    return b;
  };

  const handleChangeAsset1 = (newAsset) => {
    setSelectedAsset1(newAsset);
    setBalances2(filterAssets(newAsset));
  };

  const handleChangeAsset2 = (newAsset) => {
    setSelectedAsset2(newAsset);
    setBalances1(filterAssets(newAsset));
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
                      currencies={balances1}
                      onChange={handleChangeAsset1}
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
                      currencies={balances2}
                      onChange={handleChangeAsset2}
                    />
                  )}
                </Field>

              </div>

              {showSwapInfo
                ? (
                  <>
                    <div className={styles.equivalent}>
                      1 BTC = 12 ETH
                      <img src={iconRotateSrc} alt="icon" />
                    </div>
                    <hr className={styles.hr} />
                    <SwapDetails price={1} received={123.5} path={path} />
                  </>
                )
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

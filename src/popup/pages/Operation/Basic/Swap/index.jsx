import { useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Input from '../../../../components/Input';
import isNative from '../../../../utils/isNative';
import Button from '../../../../components/Button';
import * as route from '../../../../staticRes/routes';
import matchAsset from '../../../../utils/matchAsset';
import nativeAsset from '../../../../utils/nativeAsset';
import getMaxBalance from '../../../../utils/maxBalance';
import isAssetEqual from '../../../../utils/swap/isAssetEqual';
import SwapDetails from '../../../../pageComponents/SwapDetails';
import currentActiveAccount from '../../../../utils/activeAccount';
import SelectAssetModal from '../../../../components/SelectAssetModal';
import iconRotateSrc from '../../../../../assets/images/arrow-rotate.svg';
import calculateStrictSend from '../../../../utils/swap/calculateStrictSend';
import { buttonSizes, buttonTypes, inputTypes } from '../../../../staticRes/enum';

import styles from './styles.less';
import isInsufficientAsset from '../../../../utils/isInsufficientAsset';

const Swap = () => {
  const navigate = useNavigate();
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();
  const [balances1, setBalances1] = useState(balances);
  const [balances2, setBalances2] = useState(balances);
  const [selectedAsset1, setSelectedAsset1] = useState(balances[0]);
  const [selectedAsset2, setSelectedAsset2] = useState(balances[0]);
  const [path, setPath] = useState([]);
  const [showSwapInfo, setShowSwapInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minimumReceived, setMinimumReceived] = useState(0);
  const timeoutRef = useRef();

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSelectedAsset1(newAsset);
    setBalances2(filterAssets(newAsset));

    setTimeout(() => {
      setLoading(true);
      setShowSwapInfo(false);
      window.calculateTo();
    }, 150);
  };

  const handleChangeAsset2 = (newAsset) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSelectedAsset2(newAsset);
    setBalances1(filterAssets(newAsset));
    setShowSwapInfo(false);

    setTimeout(() => {
      setLoading(true);
      setShowSwapInfo(false);
      window.calculateTo();
    }, 150);
  };

  const onSubmit = async (v) => {
    const values = {
      ...v,
      path,
      minimumReceived,
      asset1: selectedAsset1,
      asset2: selectedAsset2,
    };

    navigate(route.basicSwapConfirmPage, {
      state: {
        values,
      },
    });
  };

  const handleFieldFrom = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    window.calculateTo();
    setShowSwapInfo(false);
  };

  const handleFieldTo = (e) => {
    console.log(e.target.value);
  };

  const validate = (v) => {
    const values = {
      ...v,
      asset1: selectedAsset1,
      asset2: selectedAsset2,
    };

    if (!values.from) {
      setShowSwapInfo(false);

      return {
        from: null,
      };
    }

    if (isAssetEqual(values.asset1, values.asset2)) {
      return {
        from: 'Assets are the same.',
      };
    }

    if (!isInsufficientAsset(values.asset1, maxXLM, values.from)) {
      return {
        from: 'Insufficient amount.',
      };
    }

    return {};
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        mutators={{
          setTo: (a, s, u) => {
            u.changeValue(s, 'to', () => a[0]);
          },
          setFrom: (a, s, u) => {
            u.changeValue(s, 'from', () => a[0]);
          },
          setMax: (a, s, u) => {
            u.changeValue(s, 'from', () => getMaxBalance(selectedAsset1));

            setTimeout(() => {
              window.calculateTo();
            }, 150);
          },
          calculateTo: async (a, s, u) => {
            const { formState } = s;

            if (!formState.valid) {
              return;
            }

            setLoading(true);

            const { values: v } = formState;
            const values = {
              ...v,
              asset1: selectedAsset1,
              asset2: selectedAsset2,
            };

            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(async () => {
              const calculatedResult = await calculateStrictSend(values);

              setLoading(false);

              if (!calculatedResult.path.length && calculatedResult.destination_amount === '0') {
                return;
              }

              u.changeValue(s, 'to', () => calculatedResult.destination_amount);

              const calculatePath = [
                values.asset1,
                ...calculatedResult.path,
                values.asset2,
              ];
              setMinimumReceived(calculatedResult.destination_amount);
              setPath(calculatePath);
              setShowSwapInfo(true);
            });
          },
        }}
        subscription={{ submitting: true, pristine: true }}
        render={({
          form,
          pristine,
          invalid,
          handleSubmit,
        }) => {
          if (!window.setTo) {
            window.setTo = form.mutators.setTo;
            window.setFrom = form.mutators.setFrom;
            window.calculateTo = form.mutators.calculateTo;
          }

          return (
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
                          onChange={handleFieldFrom}
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
                          onChange={handleFieldTo}
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
                {invalid && loading ? (
                  <p>LOADING</p>
                ) : null}

                {showSwapInfo
                  ? (
                    <>
                      <div className={styles.equivalent}>
                        1 BTC = 12 ETH
                        <img src={iconRotateSrc} alt="icon" />
                      </div>
                      <hr className={styles.hr} />
                      <SwapDetails
                        form={form}
                        path={path}
                        asset1={selectedAsset1}
                        asset2={selectedAsset2}
                        received={{ asset: selectedAsset2, minimumReceived }}
                      />
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
                  onClick={() => {
                    navigate(
                      '/',
                      {
                        state: {
                          alreadyLoaded: true,
                        },
                      },
                    );
                  }}
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
          );
        }}
      />
    </div>
  );
};

export default Swap;

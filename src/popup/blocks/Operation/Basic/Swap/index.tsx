import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import BN from 'helpers/BN';
import Loading from 'popup/components/Loading';
import * as route from 'popup/staticRes/routes';
import Input from 'popup/components/common/Input';
import getMaxBalance from 'popup/utils/maxBalance';
import defaultTokens from 'popup/staticRes/tokens';
import Button from 'popup/components/common/Button';
import isAssetEqual from 'popup/utils/swap/isAssetEqual';
import combineTokens from 'popup/utils/swap/combineTokens';
import SwapDetails from 'popup/pageComponents/SwapDetails';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import controlNumberInput from 'popup/utils/controlNumberInput';
import SelectAssetModal from 'popup/components/SelectAssetModal';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import calculateStrictSend from 'popup/utils/swap/calculateStrictSend';

import styles from './styles.less';
import SwapButton from './SwapButton';
import ShowFractional from './ShowFractional';
import swapImg from '../../../../../assets/images/swap.svg';
import iconRotateSrc from '../../../../../assets/images/arrow-rotate.svg';

const Swap = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();

  const assets = account.assets || [];

  const asset2Tokens = combineTokens(assets, defaultTokens);

  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSwapInfo, setShowSwapInfo] = useState(false);
  const [minimumReceived, setMinimumReceived] = useState(0);
  const [isRotateActive, setIsRotateActive] = useState(false);

  const [asset1, setAsset1] = useState(null);
  const [asset2, setAsset2] = useState(asset2Tokens[0]);

  const timeoutRef = useRef();

  const {
    control,
    setError,
    setValue,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      asset1: assets[0],
      asset2: asset2Tokens[0],
    },
  });

  const calculate = async () => {
    setIsRotateActive(false);

    const formValues = getValues();

    if (!formValues.asset2) {
      return;
    }

    if (new BN(formValues.from).isNaN()) {
      return;
    }

    clearErrors(['from']);

    if (
      new BN(formValues.from).isLessThanOrEqualTo('0') ||
      new BN(formValues.from).isNaN()
    ) {
      setError('from', {
        type: 'error',
        message: 'Amount must be bigger than 0.',
      });

      return;
    }

    if (!isInsufficientAsset(formValues.asset1, 0, formValues.from)) {
      setError('from', {
        type: 'error',
        message: 'Insufficient amount.',
      });

      // return;
    }

    setLoading(true);
    const calculatedResult = await calculateStrictSend(formValues);
    setLoading(false);

    if (
      calculatedResult.destination_amount === '0' &&
      !calculatedResult.path.length
    ) {
      setError('from', {
        type: 'error',
        message: 'Could not find an order.',
      });

      return;
    }

    setValue('to', calculatedResult.destination_amount);

    const calculatePath = [
      formValues.asset1,
      ...calculatedResult.path,
      formValues.asset2,
    ];

    const minReceived = new BN(calculatedResult.destination_amount)
      .div(100)
      .times(99.8);

    setMinimumReceived(parseFloat(minReceived.toString()));
    setPath(calculatePath);
    setShowSwapInfo(true);
  };

  const setFromMax = () => {
    clearErrors('from');

    const formValues = getValues();

    const maxValue = getMaxBalance(formValues.asset1);

    setValue('from', maxValue);

    if (new BN(maxValue).isNaN()) {
      return;
    }

    if (
      new BN(maxValue).isLessThanOrEqualTo('0') ||
      new BN(maxValue).isNaN()
    ) {
      setError('from', {
        type: 'error',
        message: 'Amount must be bigger than 0.',
      });

      return;
    }

    if (!isInsufficientAsset(formValues.asset1, 0, maxValue)) {
      setError('from', {
        type: 'error',
        message: 'Insufficient amount.',
      });

      return;
    }

    setValue('to', 0);
    calculate();
  };

  const handleAsset1 = (asset) => {
    const formValues = getValues();

    if (!formValues.asset2) {
      return;
    }

    if (isAssetEqual(asset, formValues.asset2)) {
      setValue('asset2', formValues.asset1);
      setAsset2(formValues.asset1);
    }

    if (!isInsufficientAsset(asset, 0, formValues.from)) {
      setShowSwapInfo(false);

      setError('from', {
        type: 'error',
        message: 'Insufficient amount.',
      });

      return;
    }

    clearErrors(['to']);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      calculate();
    }, 150);
  };

  const handleAsset2 = (asset) => {
    const formValues = getValues();

    if (isAssetEqual(formValues.asset1, asset)) {
      setValue('asset1', formValues.asset2);
      setAsset1(formValues.asset2);
    }

    clearErrors(['to']);

    if (!isInsufficientAsset(formValues.asset1, 0, formValues.from)) {
      setError('from', {
        type: 'error',
        message: 'Insufficient amount.',
      });

      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      calculate();
    }, 150);
  };

  const handleFromChange = () => {
    const formValues = getValues();

    if (new BN(formValues.from).isNaN()) {
      setShowSwapInfo(false);

      setValue('to', '');

      return;
    }

    if (
      new BN(formValues.from).isLessThanOrEqualTo('0') ||
      new BN(formValues.from).isNaN()
    ) {
      setError('from', {
        type: 'error',
        message: 'Amount must be bigger than 0.',
      });

      return;
    }

    setValue('to', 0);
    calculate();
  };

  const onSubmit = async (v) => {
    const values = {
      ...v,
      path,
      minimumReceived,
    };

    navigate(route.basicSwapConfirmPage, {
      state: {
        values,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.group}>
        <label className="label-primary">From</label>
        <div className={styles.inputModal}>
          <div className={styles.inputValue}>
            <Controller
              name="from"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="123"
                  size="medium"
                  variant="max"
                  onChange={field.onChange}
                  defaultValue={field.value}
                  hookError={errors.from}
                  inputOnChange={handleFromChange}
                  setMax={setFromMax}
                  errorMsg={errors.from && errors.from.message}
                  onKeyPress={controlNumberInput}
                />
              )}
            />
          </div>

          <Controller
            name="asset1"
            control={control}
            render={() => (
              <SelectAssetModal
                max
                asset={asset1}
                valueName="asset1"
                setValue={setValue}
                currencies={assets}
                onChange={handleAsset1}
              />
            )}
          />
        </div>
      </div>

      <img src={swapImg} className={styles['swap-icon']} alt="icon" />

      <div style={{ marginTop: '-18px' }}>
        <label className="label-primary">To</label>
        <div className={styles.inputModal}>
          <div className={styles.inputValue}>
            <Controller
              name="to"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="123"
                  size="medium"
                  defaultValue={field.value}
                  onChange={field.onChange}
                  hookError={errors.to}
                  errorMsg={errors.to && errors.to.message}
                />
              )}
            />
          </div>

          <Controller
            name="asset2"
            control={control}
            render={() => (
              <SelectAssetModal
                max={false}
                asset={asset2}
                valueName="asset2"
                setValue={setValue}
                currencies={asset2Tokens}
                onChange={handleAsset2}
              />
            )}
          />
        </div>

        {loading ? (
          <div className={styles.loading}>
            <Loading size={56} />
          </div>
        ) : null}

        {showSwapInfo && !loading ? (
          <>
            <div className={styles.equivalent}>
              <ShowFractional
                control={control}
                isRotateActive={isRotateActive}
              />

              <img
                alt="icon"
                src={iconRotateSrc}
                onClick={() => {
                  setIsRotateActive(!isRotateActive);
                }}
                className={styles.refreshIcon}
              />
            </div>
            <hr className={styles.hr} />
            <SwapDetails
              path={path}
              control={control}
              minimumReceived={minimumReceived}
            />
          </>
        ) : (
          ''
        )}
      </div>

      <div className={styles.buttons}>
        <Button
          type="button"
          variant="default"
          size="medium"
          content="Cancel"
          onClick={() => {
            navigate('/', {
              state: {
                alreadyLoaded: true,
              },
            });
          }}
        />

        <SwapButton control={control} />
      </div>
    </form>
  );
};

export default Swap;

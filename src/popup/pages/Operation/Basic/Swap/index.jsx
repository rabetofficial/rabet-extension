import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import SwapButton from './SwapButton';
import BN from '../../../../../helpers/BN';
import ShowFractional from './ShowFractional';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Loading from '../../../../components/Loading';
import * as route from '../../../../staticRes/routes';
import getMaxBalance from '../../../../utils/maxBalance';
import SwapDetails from '../../../../pageComponents/SwapDetails';
import currentActiveAccount from '../../../../utils/activeAccount';
import SelectAssetModal from '../../../../components/SelectAssetModal';
import isInsufficientAsset from '../../../../utils/isInsufficientAsset';
import iconRotateSrc from '../../../../../assets/images/arrow-rotate.svg';
import calculateStrictSend from '../../../../utils/swap/calculateStrictSend';
import { buttonSizes, buttonTypes, inputTypes } from '../../../../staticRes/enum';

import styles from './styles.less';
import isAssetEqual from '../../../../utils/swap/isAssetEqual';

const Swap = () => {
  const navigate = useNavigate();
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();

  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSwapInfo, setShowSwapInfo] = useState(false);
  const [minimumReceived, setMinimumReceived] = useState(0);

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
      asset1: balances[0],
      asset2: null,
    },
  });

  const calculate = async () => {
    const formValues = getValues();

    if (!formValues.asset2) {
      return;
    }

    if (new BN(formValues.from).isNaN()) {
      return;
    }

    clearErrors(['from']);

    if (new BN(formValues.from).isLessThanOrEqualTo('0') || new BN(formValues.from).isNaN()) {
      setError('from', {
        type: 'error',
        message: 'Amount must be bigger than 0.',
      });

      return;
    }

    setLoading(true);
    const calculatedResult = await calculateStrictSend(formValues);
    setLoading(false);

    if (calculatedResult.destination_amount === '0' && !calculatedResult.path.length) {
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

    setMinimumReceived(calculatedResult.destination_amount);
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

    if (new BN(maxValue).isLessThanOrEqualTo('0') || new BN(maxValue).isNaN()) {
      setError('from', {
        type: 'error',
        message: 'Amount must be bigger than 0.',
      });

      return;
    }

    if (!isInsufficientAsset(formValues.asset1, maxXLM, maxValue)) {
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
      setError('to', {
        type: 'error',
        message: 'Assets are the same.',
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
      setError('to', {
        type: 'error',
        message: 'Assets are the same.',
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

  const handleFromChange = () => {
    const formValues = getValues();

    if (new BN(formValues.from).isNaN()) {
      return;
    }

    if (new BN(formValues.from).isLessThanOrEqualTo('0') || new BN(formValues.from).isNaN()) {
      setError('from', {
        type: 'error',
        message: 'Amount must be bigger than 0.',
      });

      return;
    }

    if (!isInsufficientAsset(formValues.asset1, maxXLM, formValues.from)) {
      setError('from', {
        type: 'error',
        message: 'Insufficient amount.',
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
                  size="input-medium"
                  variant={inputTypes.max}
                  onChange={field.onChange}
                  defaultValue={field.value}
                  hookError={errors.from}
                  inputOnChange={handleFromChange}
                  setMax={setFromMax}
                  errorMsg={errors.from && errors.from.message}
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
                valueName="asset1"
                setValue={setValue}
                currencies={balances}
                onChange={handleAsset1}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.group}>
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
                  size="input-medium"
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
                defaultNull
                valueName="asset2"
                setValue={setValue}
                currencies={balances}
                onChange={handleAsset2}
              />
            )}
          />
        </div>

        {loading ? <div className={styles.loading}><Loading size={56} /></div> : null}

        {(showSwapInfo && !loading) ? (
          <>
            <div className={styles.equivalent}>
              <ShowFractional control={control} />

              <img
                alt="icon"
                src={iconRotateSrc}
                onClick={calculate}
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
          variant={buttonTypes.default}
          size={buttonSizes.medium}
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

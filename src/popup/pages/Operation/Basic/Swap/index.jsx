import { useState } from 'react';
// import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import SwapDetails from '../../../../pageComponents/SwapDetails';
import currentActiveAccount from '../../../../utils/activeAccount';
import SelectAssetModal from '../../../../components/SelectAssetModal';
import { buttonSizes, buttonTypes, inputTypes } from '../../../../staticRes/enum';

import styles from './styles.less';
import iconRotateSrc from '../../../../../assets/images/arrow-rotate.svg';

const Swap = () => {
  const {
    handleSubmit, setValue, control, formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();
  const [selectedAsset1, setSelectedAsset1] = useState(balances[0]);
  const [selectedAsset2, setSelectedAsset2] = useState(balances[0]);
  const [path, setPath] = useState([]);
  const [showSwapInfo, setShowSwapInfo] = useState(false);
  const [minimumReceived, setMinimumReceived] = useState(0);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    console.warn(values);
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
              rules={{
                required: true,
                minLength: {
                  value: 3,
                  message: 'must be at least 3 char',
                },
                validate: (value) => {
                  if (value <= 0) {
                    return 'must be bigger than 0';
                  } return null;
                },
              }}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="123"
                  size="input-medium"
                  variant={inputTypes.max}
                  onChange={field.onChange}
                  defaultValue={field.value}
                  hookError={errors.from}
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
                currencies={balances}
                onChange={setSelectedAsset1}
                valueName="asset1"
                setValue={setValue}
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
                currencies={balances}
                onChange={setSelectedAsset2}
                valueName="asset2"
                setValue={setValue}
              />
            )}
          />
        </div>

        {!isValid && loading ? <p>LOADING</p> : null}

        {showSwapInfo ? (
          <>
            <div className={styles.equivalent}>
              1 BTC = 12 ETH
              <img src={iconRotateSrc} alt="icon" />
            </div>
            <hr className={styles.hr} />
            <SwapDetails
              path={path}
              asset1={selectedAsset1}
              asset2={selectedAsset2}
              received={{ asset: selectedAsset2, minimumReceived }}
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
        />

        <Button
          type="submit"
          variant={buttonTypes.primary}
          size={buttonSizes.medium}
          content="Send"
          disabled={!isDirty || !isValid}
        />
      </div>
    </form>
  );
};

export default Swap;

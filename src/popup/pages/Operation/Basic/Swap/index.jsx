import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import useActiveAcconut from '../../../../hooks/useActiveAccount';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import * as route from '../../../../staticRes/routes';
import getMaxBalance from '../../../../utils/maxBalance';
import isAssetEqual from '../../../../utils/swap/isAssetEqual';
import SelectAssetModal from '../../../../components/SelectAssetModal';
import {
  buttonSizes,
  buttonTypes,
  inputTypes,
} from '../../../../staticRes/enum';

import styles from './styles.less';
import isInsufficientAsset from '../../../../utils/isInsufficientAsset';

const Swap = () => {
  const navigate = useNavigate();
  const { balances, maxXLM } = useActiveAcconut();
  const [selectedAsset1, setSelectedAsset1] = useState(balances[0]);
  const [selectedAsset2, setSelectedAsset2] = useState(balances[0]);
  const {
    control,
    trigger,
    setError,
    formState,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });

  const submitForm = () => {
    console.log('hihi');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="from"
          control={control}
          rules={{ required: ' ' }}
          render={({ field }) => (
            <input
              type="number"
              placeholder="123"
              size="input-medium"
              variant={inputTypes.max}
              ref={field.ref}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </form>
    </div>
  );
};

export default Swap;

import React from 'react';
import classNames from 'classnames';

import Tooltip from '../../Tooltip';

import styles from './styles.less';

import {
  InputVariantType,
} from '../../../staticRes/enum';

const errorBtn = (
  <button type="button" className={styles.icon}>
    <span className="icon-exclamation-circle" />
  </button>
);

type AppProps = {
  variant?: InputVariantType
  isError: boolean
  visibleType: string
  toggleVisible: () => void
  setMax?: () => void
}

const InputBtn = ({
  variant, isError, visibleType, toggleVisible, setMax,
}: AppProps) => {
  const generateBtn = () => {
    if (variant === InputVariantType.Password) {
      return (
        <button type="button" className={styles.icon} onClick={toggleVisible}>
          <span
            className={visibleType !== 'text' ? 'icon-invisible' : 'icon-visible-eye'}
          />
        </button>
      );
    }

    if (variant === InputVariantType.Max) {
      return (
        <button type="button" className={styles.max}>
          <Tooltip trigger="hover" tooltip="Send entire" placement="top">
            <span
              className={classNames('icon-double-arrow-up', styles.maxIcon)}
              onClick={setMax}
            />
          </Tooltip>
        </button>
      );
    }

    if (isError) {
      return errorBtn;
    }

    return null;
  };

  return generateBtn();
};

export default InputBtn;

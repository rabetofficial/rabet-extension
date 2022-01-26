import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useEffect, useRef } from 'react';

import Tooltip from '../Tooltip';
import { inputTypes } from '../../staticRes/enum';

import styles from './styles.less';

const Input = ({
  type,
  defaultValue,
  variant,
  size,
  disabled,
  placeholder,
  name,
  style,
  input,
  meta,
  setMax,
  autoFocus,
  onChange,
  hookError,
  errorMsg,
  inputOnChange,
  onKeyDown,
}) => {
  const [visibleType, setVisibleType] = useState(type);

  const toggleVisible = () => {
    if (visibleType === 'password') {
      setVisibleType('text');
    } else {
      setVisibleType(type);
    }
  };

  // const isError = meta && (meta.error || meta.submitError) && meta.touched;
  const isError = hookError || (meta && !meta.valid);

  // console.log(meta, meta.touched, meta.error, meta.submitError)

  const errorBtn = (
    <button type="button" className={styles.icon}>
      <span className="icon-exclamation-circle" />
    </button>
  );

  const generateBtn = () => {
    if (variant === inputTypes.passVisible) {
      return (
        <button type="button" className={styles.icon} onClick={toggleVisible}>
          <span
            className={visibleType !== 'text' ? 'icon-invisible' : 'icon-visible-eye'}
          />
        </button>
      );
    }

    if (variant === inputTypes.max) {
      return (
        <button type="button" className={styles.max}>
          <Tooltip trigger="hover" tooltip="Send entire" placement="top">
            <span
              className={classNames('icon-double-arrow-up', styles.maxIcon)}
              onClick={() => {
                setMax();
              }}
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

  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className={classNames(styles.group, size)} style={style}>
        <input
          autoComplete="off"
          type={visibleType}
          className="input"
          value={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          {...input}
          ref={inputRef}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            if (input) {
              input.onChange(e);
            }

            if (onChange) {
              onChange(e);
            }

            if (inputOnChange) {
              inputOnChange(e);
            }
          }}
        />
        {generateBtn()}
      </div>
      {isError && (
      <p className={styles.error}>
        {meta ? (meta.error || meta.submitError) : errorMsg }
      </p>
      )}
    </>
  );
};

Input.defaultProps = {
  defaultValue: '',
  variant: '',
  disabled: false,
  placeholder: '',
  name: '',
  icon: '',
  style: {},
  setMax: () => {},
  autoFocus: false,
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  variant: PropTypes.string,
  size: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.object,
  setMax: PropTypes.func,
  autoFocus: PropTypes.bool,
};

export default Input;

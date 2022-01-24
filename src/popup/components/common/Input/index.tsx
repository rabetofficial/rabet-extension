import React, {
  useState, useEffect, useRef, CSSProperties, ChangeEvent,
} from 'react';

import InputBtn from './InputBtn';

import * as S from './styles';

import { InputVariant, InputSize } from '../../../models';

type AppProps = {
  type: string
  size: InputSize
  variant: InputVariant
  defaultValue?: string | number
  disabled?: boolean
  placeholder?: string
  name?: string
  icon?: string
  style?: CSSProperties
  input: any
  meta: any
  autoFocus?: boolean
  setMax?: () => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const defaultProps = {
  defaultValue: '',
  disabled: false,
  placeholder: '',
  name: '',
  icon: '',
  style: {},
  autoFocus: false,
  setMax: () => {},
  onChange: () => {},
};

const Input = (props: AppProps) => {
  const {
    type, defaultValue, variant, size, disabled, placeholder, name, style, input,
    meta, setMax, autoFocus, onChange,
  } = props;
  const isError = !meta.valid;
  const inputRef = useRef<any>(null);
  const [visibleType, setVisibleType] = useState(type);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const toggleVisible = () => setVisibleType(visibleType === 'password' ? 'text' : type);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    input.onChange(e);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <S.Group className={`input-${size}`} style={style}>
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
          onChange={onChangeInput}
        />

        <InputBtn
          isError={isError}
          variant={variant}
          setMax={setMax}
          toggleVisible={toggleVisible}
          visibleType={visibleType}
        />
      </S.Group>
      {isError
      && (
      <S.ErrorMsg>
        {meta.error || meta.submitError}
      </S.ErrorMsg>
      )}
    </>
  );
};

Input.defaultProps = defaultProps;

export default Input;

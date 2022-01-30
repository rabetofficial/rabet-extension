import React, {
  useState, useEffect, useRef, CSSProperties, ChangeEvent,
} from 'react';

import InputBtn from './InputBtn';
import { InputVariant, InputSize } from '../../../models';

import * as S from './styles';

type AppProps = {
  type: string
  size: InputSize
  variant?: InputVariant
  defaultValue?: string | number
  disabled?: boolean
  placeholder?: string
  name?: string
  icon?: string
  style?: CSSProperties
  className?: string
  input: any
  meta: any
  autoFocus?: boolean
  setMax?: () => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  [x:string]: any;
}

const Input = (props: AppProps) => {
  const {
    type, defaultValue, variant, size, disabled, placeholder, name,
    style, className, input, meta, setMax, autoFocus, onChange, ...inputProps
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
      <S.Group className={`${className} ${size}`} style={style}>
        <input
          autoComplete="off"
          type={visibleType}
          className="input"
          value={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          {...input}
          {...inputProps}
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

Input.defaultProps = {
  defaultValue: '',
  variant: '',
  disabled: false,
  placeholder: '',
  name: '',
  icon: '',
  style: {},
  className: '',
  autoFocus: false,
  setMax: () => {},
  onChange: () => {},
};

export default Input;

import React, {
  useState,
  useEffect,
  useRef,
  CSSProperties,
  ChangeEvent,
  ReactNode,
} from 'react';

import isEmpty from 'helpers/isEmpty';
import { InputVariant, InputSize } from 'popup/models';
import InputBtn from 'popup/components/common/Input/InputBtn';

import * as S from './styles';

type Error = {
  type: string;
  message: string;
  ref: ReactNode;
};

type AppProps = {
  type: string;
  size: InputSize;
  variant?: InputVariant;
  defaultValue?: string | number;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  icon?: string;
  style?: CSSProperties;
  className?: string;
  autoFocus?: boolean;
  setMax?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  styleType?: 'light' | 'dark';
  errorMsg: Error;
  [x: string]: any;
};

const Input = (props: AppProps) => {
  const {
    type,
    defaultValue,
    variant,
    size,
    disabled,
    placeholder,
    name,
    style,
    className,
    setMax,
    autoFocus,
    onChange,
    styleType,
    errorMsg,
    ...inputProps
  } = props;
  const inputRef = useRef<any>(null);
  const [visibleType, setVisibleType] = useState(type);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const toggleVisible = () =>
    setVisibleType(visibleType === 'password' ? 'text' : type);

  return (
    <div className="flex flex-col grow">
      <S.Group
        className={`${className} ${size}`}
        style={style}
        styleType={styleType}
      >
        <input
          autoComplete="off"
          type={visibleType}
          className="input"
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          {...inputProps}
          ref={inputRef}
          onChange={onChange}
        />

        <InputBtn
          isError={!isEmpty(errorMsg)}
          variant={variant}
          setMax={setMax}
          toggleVisible={toggleVisible}
          visibleType={visibleType}
        />
      </S.Group>

      {!isEmpty(errorMsg) && <S.ErrorMsg>{errorMsg}</S.ErrorMsg>}
    </div>
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
  styleType: 'dark',
};

export default Input;

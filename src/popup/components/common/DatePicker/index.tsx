import React, { forwardRef } from 'react';
import Datepicker from 'react-datepicker';
import moment from 'moment';

import Calender from 'popup/svgs/Calender';

import * as S from './styles';

type CustomInputType = {
  value?: Date;
  onClick?: () => void;
};

type AppProps = {
  value: Date;
  onChange: (arg: Date) => void;
  disabled?: boolean;
  className?: string;
};

const CustomInput = forwardRef(
  (
    { value, onClick }: CustomInputType,
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <S.CustomInputContainer ref={ref} onClick={onClick}>
      {moment(value).format('DD/ MMM/ YYYY')}
      <Calender />
    </S.CustomInputContainer>
  ),
);

const DatePicker = ({
  value,
  onChange,
  disabled,
  className,
}: AppProps) => {
  const onChangeDate = (date) => {
    onChange(date);
  };

  return (
    <S.DatepickerContainer className={className}>
      <Datepicker
        selected={value}
        onChange={onChangeDate}
        customInput={<CustomInput />}
        disabled={disabled}
      />
    </S.DatepickerContainer>
  );
};

DatePicker.defaultProps = {
  disabled: false,
  className: '',
};

CustomInput.defaultProps = {
  value: null,
  onClick: () => {},
};

export default DatePicker;

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ElementOption } from 'popup/models';
import isEmpty from '../../../../helpers/isEmpty';

import Container from './styles';

type AppProps = {
  items: ElementOption[];
  onChange: (value: any) => void;
  variant: 'default' | 'outlined';
  defaultValue: ElementOption | {};
  selected?: ElementOption | {};
  isSearchable?: boolean;
  className?: string;
  width?: number | null;
};

const SelectOption = ({
  items,
  onChange,
  variant,
  isSearchable,
  defaultValue,
  selected,
  className,
  width,
}: AppProps) => {
  const borderColor = variant === 'default' ? '#f8f8f8' : '#f3f3f3';
  const [value, setValue] = useState<ElementOption | {}>({});

  useEffect(() => {
    if (!isEmpty(selected)) {
      setValue(selected as ElementOption | {});
    } else {
      setValue(defaultValue);
    }
  }, [selected, defaultValue]);

  const style = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? borderColor : borderColor,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': { borderColor },
    }),
  };

  return (
    <Container className={`${variant} ${className}`} width={width}>
      <Select
        classNamePrefix="ops"
        closeMenuOnSelect
        value={value}
        defaultValue={defaultValue}
        options={items}
        hideSelectedOptions={false}
        isSearchable={isSearchable}
        onChange={onChange}
        styles={style}
      />
    </Container>
  );
};

SelectOption.defaultProps = {
  isSearchable: true,
  selected: {},
  className: '',
  width: null,
};

export default SelectOption;

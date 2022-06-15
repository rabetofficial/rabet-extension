import Select from 'react-select';
import React, { useState, useEffect } from 'react';

import isEmpty from 'helpers/isEmpty';
import { ElementOption } from 'popup/models';

import Container from './styles';

type AppProps<T = string> = {
  items: ElementOption<T>[];
  onChange: (value: any) => void;
  variant: 'default' | 'outlined';
  indicatorSize?: 'large' | 'small';
  defaultValue: ElementOption | {};
  selected?: ElementOption | {};
  isSearchable?: boolean;
  className?: string;
  width?: number | null;
  height?: number | null;
};

const SelectOption = <T extends unknown>({
  items,
  onChange,
  variant,
  isSearchable,
  defaultValue,
  selected,
  className,
  width,
  height,
  indicatorSize,
}: AppProps<T>) => {
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
    <Container
      className={`${variant} ${className} indicator-${indicatorSize}`}
      width={width}
      height={height}
    >
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
  height: null,
  indicatorSize: 'large',
};

export default SelectOption;

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.less';

const SelectOption = ({
  items,
  onChange,
  variant,
  isSearchable,
  defaultValue,
  selected,
}) => {
  const borderColor = (variant === 'select-default') ? '#f8f8f8' : '#ededed';
  const [value, setValue] = useState({});

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setValue(selected);
    } else {
      setValue(defaultValue);
    }
  }, [selected, defaultValue]);

  const style = {
    ...styles,
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? borderColor : borderColor,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': { borderColor },
    }),
  };

  return (
    <div className={classNames(styles.select, variant)}>
      <Select
        classNamePrefix="ops"
        separator={false}
        closeMenuOnSelect
        value={value}
        defaultValue={defaultValue}
        options={items}
        hideSelectedOptions={false}
        isSearchable={isSearchable}
        onChange={(e) => onChange(e)}
        styles={style}
      />
    </div>
  );
};

SelectOption.defaultProps = {
  isSearchable: true,
  selected: {},
};

SelectOption.propTypes = {
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  isSearchable: PropTypes.bool,
  selected: PropTypes.object,
};

export default SelectOption;

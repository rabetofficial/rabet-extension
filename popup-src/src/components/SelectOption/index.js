import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const SelectOption = ({ items, onChange, variant, isSearchable, defaultValue }) => {
  const borderColor = (variant === 'select-default') ? '#f8f8f8' : '#ededed';
  const style = {
    ...styles,
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? borderColor : borderColor,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': { borderColor: borderColor },
    }),
  };

  return (
      <div className={ classNames(styles.select, variant) }>
        <Select
          value={defaultValue}
          classNamePrefix="ops"
          separator={ false }
          closeMenuOnSelect
          defaultValue={defaultValue}
          options={ items }
          hideSelectedOptions={ false }
          isSearchable={ isSearchable }
          onChange={ (e) => onChange(e) }
          styles={ style }
        />
      </div>
  );
};

SelectOption.defaultProps = {
  isSearchable: true,
};

SelectOption.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  isSearchable: PropTypes.bool,
};

export default SelectOption;

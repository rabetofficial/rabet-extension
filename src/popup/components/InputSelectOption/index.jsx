import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import SelectOption from '../SelectOption';

import styles from './styles.less';

const InputSelectOption = ({
  input, meta, form, max, selectItems,
}) => {
  const [selected, setSelected] = useState({});

  const onChange = (e) => {
    setSelected(e);
  };

  return (
    <div className={styles.input}>
      <Input
        type="number"
        placeholder="1"
        size="input-medium"
        input={input}
        meta={meta}
        variant={max ? 'max' : ''}
        setMax={max && form.mutators.setMax}
      />
      <SelectOption
        items={selectItems}
        onChange={onChange}
        variant="select-outlined"
        defaultValue={selectItems[0]}
        selected={selected}
      />
    </div>
  );
};

InputSelectOption.defaultProps = {
  max: false,
};

InputSelectOption.propTypes = {
  max: PropTypes.bool,
  selectItems: PropTypes.array.isRequired,
};

export default InputSelectOption;

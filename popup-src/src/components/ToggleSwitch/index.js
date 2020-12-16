import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import styles from './styles.less';

const ToggleSwitch = ({ handleChange, checked, disabled }) => {

  return (
     <div className={ styles.switch }>
       <Switch
         disabled={disabled}
         onChange={ handleChange }
         checked={ checked }
         checkedIcon={ false }
         uncheckedIcon={ false }
         boxShadow="0 0 0 0"
         activeBoxShadow="0 0 0 0"
         height={ 40 }
         width={ 76 }
         offColor="#f8f8f8"
         onColor="#f8f8f8"
         offHandleColor="#d5d5d5"
         onHandleColor="#000000"
       />
     </div>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;

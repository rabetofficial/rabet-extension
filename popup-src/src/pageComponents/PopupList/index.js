import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';

const PopupList = ({info}) => {
  return (
      <div className="popup-item" >
        <div className="popup-avatar" >AA</div>
        <div className="popup-div" >
          <div className="popup-name" >{info.name}</div>
          <div className="popup-address" >{info.address}</div>
        </div>
        <div className="popup-amount" >{info.amount}</div>
      </div>
  );
};

PopupList.propTypes = {
  
};

export default PopupList;

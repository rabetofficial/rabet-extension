import React from 'react';

import abbr from '../../helpers/abbr';

import './styles.less';

const PopupList = ({ info }) => {
  return (
      <div className="popup-item">
        <div className="popup-avatar">{abbr(info.name)}</div>
        <div className="popup-div">
          <div className="popup-name">
              {(info.name && info.name.length > 13) ? info.name.substr(0, 13).concat('...') : info.name}
          </div>
          <div className="popup-address">
              {info.publicKey}
          </div>
        </div>
        <div className="popup-amount">{info.balance}</div>
      </div>
  );
};

PopupList.propTypes = {};

export default PopupList;

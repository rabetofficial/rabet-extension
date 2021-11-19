import React from 'react';
import { useSelector } from 'react-redux';

import abbr from '../../utils/abbr';

import './styles.less';

const PopupList = ({ info }) => {
  const { isConnected } = info;
  const { host } = useSelector((store) => store.options);

  let img = '';

  if (host) {
    img = `https://logo.clearbit.com/${host}?size=30`;
  }

  return (
    <div className="popup-item">
      <div className="popup-avatar">{abbr(info.name)}</div>
      <div className="popup-div">
        <div className="popup-name">
          {(info.name && info.name.length > 13) ? info.name.substr(0, 13).concat('...') : info.name}
        </div>
        <div className="popup-amount">
          {info.balances}
        </div>
      </div>
      {isConnected
        ? (
          <div className="popup-img">
            <img src={img} alt="Host" />
          </div>
        ) : ''}
    </div>
  );
};

PopupList.propTypes = {};

export default PopupList;

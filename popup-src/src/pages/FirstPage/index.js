import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'Root/components/Logo';
import {buttonSizes, buttonTypes} from 'Root/staticRes/enum';
import Button from 'Root/components/Button';
import styles from './styles.less';

const FirstPage = props => {
  return (
      <div className="pure-g content">
        <div className="pure-u-1-1">
          <Logo/>
          <div className={ styles.container }>
            <Button
              type="button"
              variant={ buttonTypes.primary }
              size={ buttonSizes.large }
              content="Create Wallet"
              style={ {marginBottom: '27px'} }
            />
            <Button
              type="button"
              variant={ buttonTypes.outlined }
              size={ buttonSizes.large }
              content="Import Wallet"
              style={ {marginBottom: '27px'} }
            />
          </div>
        </div>
      </div>
  );
};

FirstPage.propTypes = {

};

export default FirstPage;

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import get from 'Root/actions/get';
import Logo from 'Root/components/Logo';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import {buttonSizes, buttonTypes} from 'Root/staticRes/enum';

import styles from './styles.less';

const FirstPage = props => {
  get();
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
              onClick={() => { props.history.push(route.createWalletPage) }}
            />

            <Button
              type="button"
              variant={ buttonTypes.outlined }
              size={ buttonSizes.large }
              content="Import Wallet"
              style={ {marginBottom: '27px'} }
              onClick={() => { props.history.push(route.restoreWalletPage) }}
            />
          </div>
        </div>
      </div>
  );
};

FirstPage.propTypes = {

};

export default withRouter(FirstPage);

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import * as route from 'Root/staticRes/routes';

import styles from './styles.less';

const PageTitle = ({ title, status, statusTitle, alreadyLoaded, ...props }) => {

  return (
      <div className={ styles.div }>
        <div>
          <h1 className={ classNames(styles.status, title !== 'mainnet' ? styles.warn : styles.success) }><span />
            {title === 'mainnet' ? 'Main network' : 'Test network'}
          </h1>
        </div>
      </div>
  );
};

export default withRouter(PageTitle);

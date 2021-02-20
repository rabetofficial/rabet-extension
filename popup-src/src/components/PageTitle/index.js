import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as route from 'Root/staticRes/routes';

import styles from './styles.less';

const PageTitle = ({ title, status, statusTitle, alreadyLoaded, ...props }) => {
  const generateTitle = () => {
    if (status) {
      return (
        <h1
          className={classNames(
            styles.status,
            status === 'warn' ? styles.warn : styles.success,
          )}
        >
          <span />
          {statusTitle}
        </h1>
      );
    }

    if (title) {
      return <h1 className={styles.title}>{title}</h1>;
    }

    return null;
  };

  const { accounts } = props;

  return (
    <div className={styles.div}>
      <div>{generateTitle()}</div>

      <div className={styles.icon}>
        <span
          className="icon-multiply"
          onClick={() => {
            accounts.length
              ? props.history.push({
                  pathname: route.homePage,
                  state: {
                    alreadyLoaded: alreadyLoaded === undefined ? true : false,
                  },
                })
              : props.history.goBack();
          }}
        />
      </div>
    </div>
  );
};

PageTitle.defaulProps = {
  title: '',
  status: '',
  statusTitle: '',
};

PageTitle.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  statusTitle: PropTypes.string,
};

export default withRouter(
  connect((state) => ({
    accounts: state.accounts,
  }))(PageTitle),
);

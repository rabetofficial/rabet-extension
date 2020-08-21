import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const PageTitle = ({title, status, statusTitle}) => {

  const generateTitle = () => {
    if(status) {
      return <h1 className={ classNames(styles.status, status === 'warn' ? styles.warn : styles.success) }>
        <span />{statusTitle}
      </h1>;
    }
    if(title) {
      return <h1 className={ styles.title }>{title}</h1>;
    }
    return null;
  };

  return (
      <div className={ styles.div }>
        <div>{generateTitle()}</div>
        <div><a href="/" className={ styles.close }><span className="icon-multiply" /></a></div>
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

export default PageTitle;

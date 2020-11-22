import React, {Component} from 'react';
import classNames from 'classnames';

import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';
import Button from 'Root/components/Button';
import Alert from 'Root/components/Alert';

import styles from './styles.less';

class ConfirmFlag extends Component {
  render() {
    return (
        <>
          <Header />
          <PageTitle title="Flags" />

          <div className="content" style={{marginTop: '24px'}}>
            <Alert type="alert-warning" text="Are you sure you want to activate Immutable Flag?" icon="" />
            <p className={styles.message}>
              If this is set then none of the authorization flags can be changed and the account can never be deleted.
            </p>
            <div className={ classNames('pure-g justify-end', styles.buttons) }>
              <Button
                  variant="btn-default"
                  size="btn-medium"
                  content="Cancel"
              />

              <Button
                  type="submit"
                  variant="btn-primary"
                  size="btn-medium"
                  content="Confirm"
              />
            </div>
          </div>

        </>
    );
  }
}

export default ConfirmFlag;

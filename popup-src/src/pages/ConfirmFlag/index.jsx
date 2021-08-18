import classNames from 'classnames';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Alert from '../../components/Alert';
import Header from '../../components/Header';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';
import setFlagsAction from '../../actions/operations/setFlags';
import currentActiveAccount from '../../helpers/activeAccount';

import styles from './styles.less';

class ConfirmFlag extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { location, history } = this.props;
    const { activeAccount } = currentActiveAccount();

    const isAuthClawbackEnabledAlreadyEnabled = activeAccount.flags.auth_clawback_enabled;

    const flags = {
      ...location.state,
    };

    if (flags.auth_clawback_enabled
      && !flags.auth_revocable
      && !isAuthClawbackEnabledAlreadyEnabled
    ) {
      flags.auth_revocable = true;
    } else if (flags.auth_clawback_enabled
      && !flags.auth_revocable
      && isAuthClawbackEnabledAlreadyEnabled
    ) {
      flags.auth_revocable = false;
      flags.auth_clawback_enabled = false;
    }

    setFlagsAction(flags, history.push);
  }

  render() {
    const { location, history } = this.props;
    const { activeAccount } = currentActiveAccount();
    const { auth_revocable, auth_immutable, auth_clawback_enabled } = location.state;

    const isAuthClawbackEnabledAlreadyEnabled = activeAccount.flags.auth_clawback_enabled;

    return (
      <>
        <Header />
        <PageTitle title="Flags" />

        <div className="content" style={{ marginTop: '24px' }}>
          {auth_immutable
            ? (
              <>
                <Alert type="alert-warning" text="Are you sure you want to activate Immutable Flag?" icon="" />
                <p className={styles.message}>
                  If this is set then none of the authorization flags can be changed
                  and the account can never be deleted.
                </p>
              </>
            )
            : ''}

          {auth_clawback_enabled && !auth_revocable && !isAuthClawbackEnabledAlreadyEnabled ? (
            <>
              <Alert type="alert-warning" text="Clawback enabled requires authorization revocable. Are you sure you want to activate revocable?" icon="" />
            </>
          ) : ''}

          {auth_clawback_enabled && !auth_revocable && isAuthClawbackEnabledAlreadyEnabled
            ? (
              <>
                <Alert type="alert-warning" text="Disabling authorization revocable disables clawback enabled as well. Are you sure you want to deactivate both?" icon="" />
              </>
            )
            : ''}

          <div className={classNames('pure-g justify-end', styles.buttons)}>
            <Button
              variant="btn-default"
              size="btn-medium"
              content="Cancel"
              onClick={() => {
                history.goBack();
              }}
            />

            <Button
              type="submit"
              variant="btn-primary"
              size="btn-medium"
              content="Confirm"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ConfirmFlag);

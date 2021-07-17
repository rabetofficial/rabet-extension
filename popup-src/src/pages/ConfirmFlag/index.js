import classNames from 'classnames';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Alert from 'Root/components/Alert';
import Button from 'Root/components/Button';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';
import setFlagsAction from 'Root/actions/operations/setFlags';

import styles from './styles.less';

class ConfirmFlag extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const flags = {
      ...this.props.location.state,
    };

    if (flags.auth_clawback_enabled && !flags.auth_revocable) {
      flags.auth_revocable = true;
    }

    setFlagsAction(flags, this.props.history.push);
  }

  render() {
    const { auth_revocable, auth_immutable, auth_clawback_enabled } = this.props.location.state;

    return (
        <>
          <Header />
          <PageTitle title="Flags" />

          <div className="content" style={{marginTop: '24px'}}>
            {auth_immutable
              ? (
                <>
                  <Alert type="alert-warning" text="Are you sure you want to activate Immutable Flag?" icon="" />
                  <p className={styles.message}>
                    If this is set then none of the authorization flags can be changed and the account can never be deleted.
                  </p>
                </>
              )
              : ''
            }

            {auth_clawback_enabled && !auth_revocable
              ? (
                <>
                  <Alert type="alert-warning" text="Clawback enabled requires authorization revocable. Are you sure you want to activate revocable?" icon="" />
                </>
              )
              : ''
            }

            <div className={ classNames('pure-g justify-end', styles.buttons) }>
              <Button
                  variant="btn-default"
                  size="btn-medium"
                  content="Cancel"
                  onClick={() => {this.props.history.goBack()}}
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

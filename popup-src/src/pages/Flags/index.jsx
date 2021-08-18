import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Tooltip from '../../components/Tooltip';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import ToggleSwitch from '../../components/ToggleSwitch';
import currentActiveAccount from '../../helpers/activeAccount';
import setFlagsAction from '../../actions/operations/setFlags';

import styles from './styles.less';

const tooltipInfo = {
  required: 'Requires the issuing account to give other accounts permission before they can hold the issuing account’s credit.',
  revocable: 'Allows the issuing account to revoke its credit held by other accounts.',
  immutable: 'If this is set then none of the authorization flags can be changed and the account can never be deleted.',
  clawback: 'Enables clawbacks for all assets issued by this account. Note that this only applies along trustlines established after this flag has been set. Requires authorization revocable.',
};

class Flags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      auth_required: false,
      auth_revocable: false,
      auth_immutable: false,
      auth_clawback_enabled: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckedRequired = this.handleCheckedRequired.bind(this);
    this.handleCheckedRevocable = this.handleCheckedRevocable.bind(this);
    this.handleCheckedImmutable = this.handleCheckedImmutable.bind(this);
    this.handleClawbackEnabled = this.handleClawbackEnabled.bind(this);
  }

  componentDidMount() {
    const { activeAccount } = currentActiveAccount();

    if (activeAccount.flags.auth_immutable) {
      this.setState({
        disabled: true,
      });
    }

    this.setState({
      auth_required: activeAccount.flags.auth_required || false,
      auth_revocable: activeAccount.flags.auth_revocable || false,
      auth_immutable: activeAccount.flags.auth_immutable || false,
      auth_clawback_enabled: activeAccount.flags.auth_clawback_enabled || false,
    });
  }

  handleCheckedRequired(checked) { this.setState({ auth_required: checked }); }

  handleCheckedRevocable(checked) { this.setState({ auth_revocable: checked }); }

  handleCheckedImmutable(checked) { this.setState({ auth_immutable: checked }); }

  handleClawbackEnabled(checked) { this.setState({ auth_clawback_enabled: checked }); }

  handleSubmit() {
    const {
      auth_revocable,
      auth_immutable,
      auth_clawback_enabled,
    } = this.state;

    const { history } = this.props;

    if (auth_immutable || (auth_clawback_enabled && !auth_revocable)) {
      history.push({
        pathname: route.confirmFlagPage,
        state: {
          ...this.state,
        },
      });
    } else {
      setFlagsAction(this.state, history.push);
    }
  }

  render() {
    const {
      disabled,
      auth_required,
      auth_revocable,
      auth_immutable,
      auth_clawback_enabled,
    } = this.state;

    const { history } = this.props;

    return (
      <>
        <div className={classNames(styles.page, 'hidden-scroll content-scroll')}>
          <Header />

          <PageTitle title="Flags" />

          <div className="content">
            <h6 className={styles.title}>
              Currently, there are 4 flags, used by issuers of assets.
              in below you can see your flags status:
            </h6>

            <div className={classNames('pure-g', styles.div, styles.first)}>
              <div className="pure-u-2-3">
                <h3 className={styles.toggleTitle}>
                  Authorization required
                  <Tooltip trigger="hover" tooltip={tooltipInfo.required} placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  disabled={disabled}
                  checked={auth_required}
                  handleChange={this.handleCheckedRequired}
                />
              </div>
            </div>

            <div className={classNames('pure-g', styles.div)}>
              <div className="pure-u-2-3">
                <h3 className={styles.toggleTitle}>
                  Authorization revocable
                  <Tooltip trigger="hover" tooltip={tooltipInfo.revocable} placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  disabled={disabled}
                  checked={auth_revocable}
                  handleChange={this.handleCheckedRevocable}
                />
              </div>
            </div>

            <div className={classNames('pure-g', styles.div)}>
              <div className="pure-u-2-3">
                <h3 className={styles.toggleTitle}>
                  Authorization immutable
                  <Tooltip trigger="hover" tooltip={tooltipInfo.immutable} placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  disabled={disabled}
                  checked={auth_immutable}
                  handleChange={this.handleCheckedImmutable}
                />
              </div>
            </div>

            <div className={classNames('pure-g', styles.div)}>
              <div className="pure-u-2-3">
                <h3 className={styles.toggleTitle}>
                  Clawback enabled
                  <Tooltip trigger="hover" tooltip={tooltipInfo.clawback} placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  disabled={disabled}
                  checked={auth_clawback_enabled}
                  handleChange={this.handleClawbackEnabled}
                />
              </div>

              {disabled ? (
                <div className="error-box" style={{ marginTop: '16px' }}>
                  You can no longer change the status of your flags
                  because you have already activated theImmutable flag.
                </div>
              ) : ''}
            </div>
          </div>
        </div>

        <div className={classNames('pure-g justify-end content', styles.buttons)}>
          <Button
            variant="btn-default"
            size="btn-medium"
            content="Cancel"
            onClick={() => {
              history.push({
                pathname: route.homePage,
                state: {
                  alreadyLoaded: true,
                },
              });
            }}
          />

          <Button
            disabled={disabled}
            onClick={this.handleSubmit}
            variant="btn-primary"
            size="btn-medium"
            content="Save"
          />
        </div>
      </>
    );
  }
}

Flags.propTypes = {};

export default withRouter(connect((state) => ({
  accounts: state.accounts,
}))(Flags));

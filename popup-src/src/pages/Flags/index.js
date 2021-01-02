import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import Tooltip from 'Root/components/Tooltip';
import * as route from 'Root/staticRes/routes';
import PageTitle from 'Root/components/PageTitle';
import ToggleSwitch from 'Root/components/ToggleSwitch';
import currentActiveAccount from 'Root/helpers/activeAccount';
import setFlagsAction from 'Root/actions/operations/setFlags';

import styles from './styles.less';

const tooltipInfo = {
  required: 'Requires the issuing account to give other accounts permission before they can hold the issuing account’s credit.',
  revocable: 'Allows the issuing account to revoke its credit held by other accounts.',
  immutable: 'If this is set then none of the authorization flags can be changed and the account can never be deleted.',
};


class Flags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      auth_required: false,
      auth_revocable: false,
      auth_immutable: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckedRequired = this.handleCheckedRequired.bind(this);
    this.handleCheckedRevocable = this.handleCheckedRevocable.bind(this);
    this.handleCheckedImmutable = this.handleCheckedImmutable.bind(this);
  }

  handleCheckedRequired(checked) { this.setState({ auth_required: checked }); }
  handleCheckedRevocable(checked) { this.setState({ auth_revocable: checked }); }
  handleCheckedImmutable(checked) { this.setState({ auth_immutable: checked }); }

  componentDidMount() {
    const { activeAccount, activeAccountIndex } = currentActiveAccount();

    if (activeAccount.flags.auth_immutable) {
      this.setState({
        disabled: true,
      });
    }

    this.setState({
      auth_required: activeAccount.flags.auth_required || false,
      auth_revocable: activeAccount.flags.auth_revocable || false,
      auth_immutable: activeAccount.flags.auth_immutable || false,
    });
  }

  handleSubmit() {
    if (this.state.auth_immutable) {
      this.props.history.push({
        pathname: route.confirmFlagPage,
        state: {
          ...this.state,
        },
      });
    } else {
      setFlagsAction(this.state, this.props.history.push);
    }
  }

  render() {

    return (
      <>
        <div className={ classNames(styles.page, 'hidden-scroll content-scroll') }>
          <Header/>

          <PageTitle title="Flags" />

          <div className="content">
            <h6 className={ styles.title }>
              Currently, there are three flags, used by issuers of assets.
              in below you can see your flags status:
            </h6>

            <div className={ classNames('pure-g', styles.div, styles.first) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.toggleTitle }>Authorization required
                  <Tooltip trigger="hover" tooltip={tooltipInfo.required} placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  disabled={this.state.disabled}
                  checked={ this.state.auth_required }
                  handleChange={ this.handleCheckedRequired }
                />
              </div>
            </div>

            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.toggleTitle }>Authorization revocable
                  <Tooltip trigger="hover" tooltip={tooltipInfo.revocable} placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  disabled={this.state.disabled}
                  checked={ this.state.auth_revocable }
                  handleChange={ this.handleCheckedRevocable }
                />
              </div>
            </div>

            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.toggleTitle }>Authorization immutable
                  <Tooltip trigger="hover" tooltip={tooltipInfo.immutable} placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  disabled={this.state.disabled}
                  checked={ this.state.auth_immutable }
                  handleChange={ this.handleCheckedImmutable }
                />
              </div>

              {this.state.disabled
                ? (
                  <div className="error-box" style={{marginTop: '16px'}}>
                    You can no longer change the status of your flags because you have already activated the Immutable flag.
                  </div>
                ) : ''
              }
            </div>
            </div>
            </div>

            <div className={ classNames('pure-g justify-end content', styles.buttons) }>
              <Button
                variant="btn-default"
                size="btn-medium"
                content="Cancel"
                onClick={() => {this.props.history.push({
                  pathname: route.homePage,
                  state: {
                    alreadyLoaded: true,
                  }
                })}}
              />

              <Button
                disabled={this.state.disabled}
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

export default withRouter(connect(state => ({
  accounts: state.accounts,
}))(Flags));

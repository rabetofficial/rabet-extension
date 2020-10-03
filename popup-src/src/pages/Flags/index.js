import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import Tooltip from 'Root/components/Tooltip';
import PageTitle from 'Root/components/PageTitle';
import ToggleSwitch from 'Root/components/ToggleSwitch';
import currentActiveAccount from 'Root/helpers/activeAccount';
import setFlagsAction from 'Root/actions/operations/setFlags';

import styles from './styles.less';

class Flags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_required: false,
      auth_revocable: true,
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

    this.setState({
      auth_required: activeAccount.flags.auth_required || false,
      auth_revocable: activeAccount.flags.auth_revocable || false,
      auth_immutable: activeAccount.flags.auth_immutable || false,
    });
  }

  handleSubmit() {
    setFlagsAction(this.state, this.props.history.push);
  }

  render() {
    return (
        <div className={ styles.page }>
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
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  checked={ this.state.auth_required }
                  handleChange={ this.handleCheckedRequired }
                />
              </div>
            </div>

            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.toggleTitle }>Authorization revocable
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  checked={ this.state.auth_revocable }
                  handleChange={ this.handleCheckedRevocable }
                />
              </div>
            </div>

            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.toggleTitle }>Authorization immutable
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  checked={ this.state.auth_immutable }
                  handleChange={ this.handleCheckedImmutable }
                />
              </div>
            </div>

            <div className={ classNames('pure-g justify-end', styles.buttons) }>
              <Button
                variant="btn-default"
                size="btn-medium"
                content="Cancel"
                onClick={() => {this.props.history.goBack()}}
              />

              <Button
                onClick={this.handleSubmit}
                variant="btn-primary"
                size="btn-medium"
                content="Save"
              />
            </div>
          </div>
        </div>
    );
  }
}

Flags.propTypes = {};

export default withRouter(connect(state => ({
  accounts: state.accounts,
}))(Flags));

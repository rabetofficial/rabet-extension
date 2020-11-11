import classNames from 'classnames';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'Root/components/Header';
import Tooltip from 'Root/components/Tooltip';
import * as route from 'Root/staticRes/routes';
import PageTitle from 'Root/components/PageTitle';
import ToggleSwitch from 'Root/components/ToggleSwitch';
import changeOptionsAction from 'Root/actions/options/change';

import styles from './styles.less';
import Button from '../../components/Button';
import SelectOption from '../../components/SelectOption';

const networkOptions = [
  { value: 'mainnet', label: 'MAINNET' },
  { value: 'testnet', label: 'TESTNET' },
];

const timerOptions = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
];

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      selectedNetwork: {},
      selectedTimer: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.onChangeTimer = this.onChangeTimer.bind(this);
    this.onChangeNetwork = this.onChangeNetwork.bind(this);
  }

  componentDidMount() {
    const { options } = this.props;

    this.setState({
      selectedNetwork: { value: options.network.toLowerCase(), label: options.network.toUpperCase() },
    });

    let timerLabel;

    if (options.autoTimeLocker === 15) {
      timerLabel = '15 minutes';
    } else if (options.autoTimeLocker === 30) {
      timerLabel = '30 minutes';
    } else if (options.autoTimeLocker === 60) {
      timerLabel = '1 hour';
    }

    this.setState({
      selectedTimer: { value: options.autoTimeLocker, label: timerLabel },
    });

    this.setState({
      checked: options.privacyMode,
    });
  }

  handleChecked(checked) {
    this.setState({ checked });
  }

  onChangeNetwork(e) {
    this.setState({ selectedNetwork: e });
  }

  onChangeTimer(e) {
    this.setState({ selectedTimer: e });
  }

  handleSubmit() {
    changeOptionsAction({
      privacyMode: this.state.checked,
      network: this.state.selectedNetwork,
      autoTimeLocker: this.state.selectedTimer,
    }, this.props.history.push);
  }

  render() {
    return (
        <div className={ styles.page }>
          <Header/>

          <PageTitle title="Setting" />

          <div className="content">
            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.title }>Network
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <div className={ styles.select }>
                  <SelectOption
                    items={networkOptions}
                    onChange={ this.onChangeNetwork }
                    variant="select-outlined"
                    isSearchable={ false }
                    defaultValue={this.state.selectedNetwork}
                  />
                </div>
              </div>
            </div>

            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.title }>Auto-lock timer
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <div className={ styles.select }>
                  <SelectOption
                    items={timerOptions}
                    onChange={ this.onChangeTimer }
                    variant="select-outlined"
                    isSearchable={ false }
                    defaultValue={this.state.selectedTimer}
                  />
                </div>
              </div>
            </div>

            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-3">
                <h3 className={ styles.title }>Privacy mode
                  <Tooltip trigger="hover" tooltip="Some text" placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-1-3">
                <ToggleSwitch
                  checked={ this.state.checked }
                  handleChange={ this.handleChecked }
                />
              </div>
            </div>

            <div className={ classNames('pure-g justify-end', styles.buttons) }>
              <Button
                variant="btn-default"
                size="btn-medium"
                content="Cancel"
                onClick={() => { this.props.history.push({
                  pathname: route.homePage,
                  state: {
                    alreadyLoaded: true,
                  },
                }) }}
              />

              <Button
                onClick={this.handleSubmit}
                variant="btn-primary"
                size="btn-medium"
                content="Save"
              />
            </div>
          </div>

          <p className={ styles.version }>Version 0.0.1</p>
        </div>
    );
  }
}

export default withRouter(connect(state => ({
  options: state.options,
}))(Setting));

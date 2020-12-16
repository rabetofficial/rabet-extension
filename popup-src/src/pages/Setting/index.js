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

const explorerOptions = [
  { value: 'steexp', label: 'Steexp' },
  { value: 'lumenscan', label: 'Lumenscan' },
  { value: 'stellarexpert', label: 'StellarExpert' },
];

const timerOptions = [
  { value: 5, label: '5 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
];

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      selectedExplorer: {},
      selectedTimer: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.onChangeTimer = this.onChangeTimer.bind(this);
    this.onChangeNetwork = this.onChangeNetwork.bind(this);
  }

  componentDidMount() {
    const { options } = this.props;

    let label;

    if (options.explorer === 'stellarexpert') {
      label = 'StellarExpert';
    } else if (options.explorer === 'lumenscan') {
      label = 'Lumenscan';
    } else {
      label = 'Steexp';
    }

    const selectedExplorer = {
      label,
      value: options.explorer.toLowerCase(),
    }

    this.setState({
      selectedExplorer,
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
    this.setState({ selectedExplorer: e });
  }

  onChangeTimer(e) {
    this.setState({ selectedTimer: e });
  }

  handleSubmit() {
    changeOptionsAction({
      privacyMode: this.state.checked,
      explorer: this.state.selectedExplorer,
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
              <div className="pure-u-2-5">
                <h3 className={ styles.title }>Explorer
                  <Tooltip trigger="hover" tooltip="You will be referred to this Explorer to see the details of your transactions." placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-3-5">
                <div className={ styles.select }>
                  <SelectOption
                    items={explorerOptions}
                    onChange={ this.onChangeNetwork }
                    variant="select-outlined"
                    isSearchable={ false }
                    defaultValue={this.state.selectedExplorer}
                  />
                </div>
              </div>
            </div>

            <div className={ classNames('pure-g', styles.div) }>
              <div className="pure-u-2-5">
                <h3 className={ styles.title }>Auto-lock timer
                  <Tooltip trigger="hover" tooltip="Stenk will lock automatically after a set amount of time." placement="top">
                    <span className="icon-question-mark" />
                  </Tooltip>
                </h3>
              </div>

              <div className="pure-u-3-5">
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
                  <Tooltip trigger="hover" tooltip="Websites must request access to view your account information." placement="top">
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

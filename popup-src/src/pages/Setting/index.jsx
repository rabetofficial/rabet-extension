import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import config from '../../config';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Tooltip from '../../components/Tooltip';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import ToggleSwitch from '../../components/ToggleSwitch';
import SelectOption from '../../components/SelectOption';
import changeOptionsAction from '../../actions/options/change';
import * as currenciesModule from '../../staticRes/currencies';

import styles from './styles.less';

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
  { value: 60 * 24 * 30 * 12 * 5, label: 'Never' },
];

let currencies = Object.values(currenciesModule);

currencies = currencies.map((x) => ({
  ...x,
  value: x.name,
  label: x.name,
}));

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      selectedExplorer: {},
      selectedTimer: {},
      selectedCurrency: currencies[0],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.onChangeTimer = this.onChangeTimer.bind(this);
    this.onChangeNetwork = this.onChangeNetwork.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
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
    };

    this.setState({
      selectedExplorer,
    });

    let timerLabel;

    if (options.autoTimeLocker === 5) {
      timerLabel = '5 minutes';
    } else if (options.autoTimeLocker === 15) {
      timerLabel = '15 minutes';
    } else if (options.autoTimeLocker === 30) {
      timerLabel = '30 minutes';
    } else if (options.autoTimeLocker === 60) {
      timerLabel = '1 hour';
    } else if (options.autoTimeLocker === 60 * 24 * 30 * 12 * 5) {
      timerLabel = 'Never';
    }

    this.setState({
      selectedTimer: { value: options.autoTimeLocker, label: timerLabel },
    });

    this.setState({
      checked: options.privacyMode,
    });

    if (options.currency) {
      this.setState({
        selectedCurrency: { value: options.currency, label: options.currency.toUpperCase() },
      });
    }
  }

  handleChecked(checked) {
    this.setState({ checked });
  }

  handleSubmit() {
    const { history } = this.props;
    const {
      checked,
      selectedExplorer,
      selectedTimer,
      selectedCurrency,
    } = this.state;

    changeOptionsAction(
      {
        privacyMode: checked,
        explorer: selectedExplorer,
        autoTimeLocker: selectedTimer,
        currency: selectedCurrency,
      },
      history.push,
    );
  }

  onChangeCurrency(e) {
    this.setState({ selectedCurrency: e });
  }

  onChangeTimer(e) {
    this.setState({ selectedTimer: e });
  }

  onChangeNetwork(e) {
    this.setState({ selectedExplorer: e });
  }

  render() {
    const { history } = this.props;

    const {
      selectedExplorer,
      selectedTimer,
      selectedCurrency,
      checked,
    } = this.state;

    return (
      <div className={styles.page}>
        <Header />

        <PageTitle title="Setting" />

        <div className="content">
          <div className={classNames('pure-g', styles.div)}>
            <div className="pure-u-2-5">
              <h3 className={styles.title}>
                Explorer
                <Tooltip
                  trigger="hover"
                  tooltip="You will be referred to this Explorer to see the details of your transactions."
                  placement="top"
                >
                  <span className="icon-question-mark" />
                </Tooltip>
              </h3>
            </div>

            <div className="pure-u-3-5">
              <div className={styles.select}>
                <SelectOption
                  items={explorerOptions}
                  onChange={this.onChangeNetwork}
                  variant="select-outlined"
                  isSearchable={false}
                  defaultValue={selectedExplorer}
                />
              </div>
            </div>
          </div>

          <div className={classNames('pure-g', styles.div)}>
            <div className="pure-u-2-5">
              <h3 className={styles.title}>
                Auto-lock timer
                <Tooltip
                  trigger="hover"
                  tooltip="Rabet will lock automatically after a set amount of time."
                  placement="top"
                >
                  <span className="icon-question-mark" />
                </Tooltip>
              </h3>
            </div>

            <div className="pure-u-3-5">
              <div className={styles.select}>
                <SelectOption
                  items={timerOptions}
                  onChange={this.onChangeTimer}
                  variant="select-outlined"
                  isSearchable={false}
                  defaultValue={selectedTimer}
                />
              </div>
            </div>
          </div>

          <div className={classNames('pure-g', styles.div)}>
            <div className="pure-u-2-5">
              <h3 className={styles.title}>
                Currency conversion
                <Tooltip trigger="hover" tooltip="some info" placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </h3>
            </div>

            <div className="pure-u-3-5">
              <div className={styles.select}>
                <SelectOption
                  items={currencies}
                  onChange={this.onChangeCurrency}
                  variant="select-outlined"
                  isSearchable
                  defaultValue={selectedCurrency}
                />
              </div>
            </div>
          </div>

          <div className={classNames('pure-g', styles.div)}>
            <div className="pure-u-2-3">
              <h3 className={styles.title}>
                Privacy mode
                <Tooltip
                  trigger="hover"
                  tooltip="Websites must request access to view your account information."
                  placement="top"
                >
                  <span className="icon-question-mark" />
                </Tooltip>
              </h3>
            </div>

            <div className="pure-u-1-3">
              <ToggleSwitch checked={checked} handleChange={this.handleChecked} />
            </div>
          </div>

          <div className={classNames('pure-g justify-end', styles.buttons)}>
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

            <Button onClick={this.handleSubmit} variant="btn-primary" size="btn-medium" content="Save" />
          </div>
        </div>

        <p className={styles.version}>
          Version
          {config.VERSION}
        </p>
      </div>
    );
  }
}

export default withRouter(
  connect((state) => ({
    options: state.options,
  }))(Setting),
);

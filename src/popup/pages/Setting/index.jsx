import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '../../../config';
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

const Setting = ({ options }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [selectedExplorer, setSelectedExplorer] = useState({});
  const [selectedTimer, setSelectedTimer] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  useEffect(() => {
    let label;

    if (options.explorer === 'stellarexpert') {
      label = 'StellarExpert';
    } else if (options.explorer === 'lumenscan') {
      label = 'Lumenscan';
    } else {
      label = 'Steexp';
    }

    const newSelectedExplorer = {
      label,
      value: options.explorer.toLowerCase(),
    };

    setSelectedExplorer(newSelectedExplorer);

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

    setSelectedTimer({ value: options.autoTimeLocker, label: timerLabel });
    setChecked(options.privacyMode);

    if (options.currency) {
      setSelectedCurrency({ value: options.currency, label: options.currency.toUpperCase() });
    }
  }, []);

  const handleChecked = (c) => {
    setChecked(c);
  };

  const handleSubmit = () => {
    changeOptionsAction(
      {
        privacyMode: checked,
        explorer: selectedExplorer,
        autoTimeLocker: selectedTimer,
        currency: selectedCurrency,
      },
      navigate,
    );
  };

  const onChangeCurrency = (e) => {
    setSelectedCurrency(e);
  };

  const onChangeTimer = (e) => {
    setSelectedTimer(e);
  };

  const onChangeNetwork = (e) => {
    setSelectedExplorer(e);
  };

  return (
    <div className={styles.page}>
      <Header />

      <PageTitle title="Setting" />

      <div className="content">
        <div className={classNames('pure-g', styles.div)}>
          <div className="pure-u-2-5">
            <h3 className={styles.title}>
              <span className={styles.noWrap}>Explorer</span>
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
                onChange={onChangeNetwork}
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
              <span className={styles.noWrap}>Auto-lock timer</span>
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
                onChange={onChangeTimer}
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
              <span className={styles.noWrap}>Currency conversion</span>
              <Tooltip trigger="hover" tooltip="some info" placement="top">
                <span className="icon-question-mark" />
              </Tooltip>
            </h3>
          </div>

          <div className="pure-u-3-5">
            <div className={styles.select}>
              <SelectOption
                items={currencies}
                onChange={onChangeCurrency}
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
              <span className={styles.noWrap}>Privacy mode</span>
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
            <ToggleSwitch checked={checked} handleChange={handleChecked} />
          </div>
        </div>

        <div className={classNames('pure-g justify-end', styles.buttons)}>
          <Button
            variant="btn-default"
            size="btn-medium"
            content="Cancel"
            onClick={() => {
              navigate(
                route.homePage,
                {
                  state: {
                    alreadyLoaded: true,
                  },
                },
              );
            }}
          />

          <Button onClick={handleSubmit} variant="btn-primary" size="btn-medium" content="Save" />
        </div>
      </div>

      <p className={styles.version}>
        Version
        {' '}
        {config.VERSION}
      </p>
    </div>
  );
};

export default connect((state) => ({
  options: state.options,
}))(Setting);

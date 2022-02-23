import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import capital from 'popup/utils/capital';
import Button from 'popup/components/common/Button';
import * as route from 'popup/staticRes/routes';
import ToggleSwitch from 'popup/components/common/ToggleSwitch';
import SelectOption from 'popup/components/SelectOption';
import changeOptionsAction from 'popup/actions/options/change';
import * as currenciesModule from 'popup/staticRes/currencies';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import TooltipLabel from 'popup/components/common/TooltipLabel';
import config from '../../../../config';

import * as S from './styles';

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

const modeOptions = [
  { value: 'BASIC', label: 'Basic' },
  { value: 'ADVANCED', label: 'Advance' },
];

const SettingGeneral = ({ options }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [selectedExplorer, setSelectedExplorer] = useState({});
  const [selectedTimer, setSelectedTimer] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencies[0],
  );
  const [mode, setMode] = useState(modeOptions[0]);

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

    setSelectedTimer({
      value: options.autoTimeLocker,
      label: timerLabel,
    });
    setChecked(options.privacyMode);

    if (options.currency) {
      setSelectedCurrency({
        value: options.currency,
        label: options.currency.toUpperCase(),
      });
    }

    if (options.mode) {
      setMode({
        value: options.mode,
        label: capital(options.mode.toLowerCase()),
      });
    }
  }, [options]);

  const handleChecked = (c: boolean) => {
    setChecked(c);
  };

  const handleSubmit = () => {
    changeOptionsAction(
      {
        privacyMode: checked,
        explorer: selectedExplorer,
        autoTimeLocker: selectedTimer,
        currency: selectedCurrency,
        mode,
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

  const onChangeMode = (e) => {
    setMode(e);
  };

  return (
    <>
      <div className="flex justify-between items-center mt-[20px]">
        <TooltipLabel
          text="Explorer"
          tooltipText="You will be referred to this Explorer to see the details of your transactions."
        />

        <S.Select>
          <SelectOption
            items={explorerOptions}
            onChange={onChangeNetwork}
            variant="select-outlined"
            isSearchable={false}
            defaultValue={selectedExplorer}
          />
        </S.Select>
      </div>

      <div className="flex justify-between items-center mt-[20px]">
        <TooltipLabel
          text="Auto-lock timer"
          tooltipText="Rabet will lock automatically after a set amount of time."
        />

        <S.Select>
          <SelectOption
            items={timerOptions}
            onChange={onChangeTimer}
            variant="select-outlined"
            isSearchable={false}
            defaultValue={selectedTimer}
          />
        </S.Select>
      </div>

      <div className="flex justify-between items-center mt-[20px]">
        <TooltipLabel
          text="Currency conversion"
          tooltipText="some info"
        />

        <S.Select>
          <SelectOption
            items={currencies}
            onChange={onChangeCurrency}
            variant="select-outlined"
            isSearchable
            defaultValue={selectedCurrency}
          />
        </S.Select>
      </div>

      <div className="flex justify-between items-center mt-[20px]">
        <TooltipLabel text="Mode" tooltipText="some info" />

        <S.Select>
          <SelectOption
            items={modeOptions}
            onChange={onChangeMode}
            variant="select-outlined"
            isSearchable
            defaultValue={mode}
          />
        </S.Select>
      </div>

      <div className="flex justify-between items-center mt-[20px]">
        <TooltipLabel
          text="Privacy mode"
          tooltipText="Websites must request access to view your account information."
        />

        <ToggleSwitch
          checked={checked}
          handleChange={handleChecked}
        />
      </div>

      <ButtonContainer btnSize={100} justify="end" mt={40}>
        <Button
          variant="default"
          size="medium"
          content="Cancel"
          onClick={() => {
            navigate(route.homePage, {
              state: {
                alreadyLoaded: true,
              },
            });
          }}
        />

        <Button
          onClick={handleSubmit}
          variant="primary"
          size="medium"
          content="Save"
        />
      </ButtonContainer>

      <S.Version>Version {config.VERSION}</S.Version>
    </>
  );
};

export default connect((state) => ({
  options: state.options,
}))(SettingGeneral);

import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import Button from 'popup/components/common/Button';
import Tooltip from 'popup/components/common/Tooltips';
import ExtTitle from 'popup/components/common/Title/Ext';
import ScrollBar from 'popup/components/common/ScrollBar';
import currentActiveAccount from 'popup/utils/activeAccount';
import setFlagsAction from 'popup/actions/operations/setFlags';
import ToggleSwitch from 'popup/components/common/ToggleSwitch';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

const tooltipInfo = {
  required:
    'Requires the issuing account to give other accounts permission before they can hold the issuing account’s credit.',
  revocable:
    'Allows the issuing account to revoke its credit held by other accounts.',
  immutable:
    'If this is set then none of the authorization flags can be changed and the account can never be deleted.',
  clawback:
    'Enables clawbacks for all assets issued by this account. Note that this only applies along trustlines established after this flag has been set. Requires authorization revocable.',
};

const Flags = () => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [auth_required, setAuth_required] = useState(false);
  const [auth_revocable, setAuth_revocable] = useState(false);
  const [auth_immutable, setAuth_immutable] = useState(false);

  const [auth_clawback_enabled, setAuth_clawback_enabled] =
    useState(false);

  useEffect(() => {
    const { activeAccount } = currentActiveAccount();

    if (activeAccount.flags.auth_immutable) {
      setDisabled(true);
    }

    setAuth_required(activeAccount.flags.auth_required || false);
    setAuth_revocable(activeAccount.flags.auth_revocable || false);
    setAuth_immutable(activeAccount.flags.auth_immutable || false);
    setAuth_clawback_enabled(
      activeAccount.flags.auth_clawback_enabled || false,
    );
  }, []);

  const handleCheckedRequired = (checked) =>
    setAuth_required(checked);
  const handleCheckedRevocable = (checked) =>
    setAuth_revocable(checked);
  const handleCheckedImmutable = (checked) =>
    setAuth_immutable(checked);
  const handleClawbackEnabled = (checked) =>
    setAuth_clawback_enabled(checked);

  const handleSubmit = () => {
    if (
      auth_immutable ||
      (auth_clawback_enabled && !auth_revocable)
    ) {
      navigate(RouteName.ConfirmFlag, {
        state: {
          auth_required,
          auth_revocable,
          auth_immutable,
          auth_clawback_enabled,
        },
      });
    } else {
      setFlagsAction(
        {
          auth_required,
          auth_revocable,
          auth_immutable,
          auth_clawback_enabled,
        },
        navigate,
      );
    }
  };

  const onCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  return (
    <>
      <ScrollBar isHidden maxHeight={600}>
        <Header />
        <S.Content>
          <ExtTitle title="Flags" />
          <S.Ttile>
            Currently, there are 4 flags, used by issuers of assets.
            in below you can see your flags status:
          </S.Ttile>
          <S.Div>
            <div>
              <S.ToggleTitle>
                Authorization required
                <Tooltip text={tooltipInfo.required} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </S.ToggleTitle>
            </div>

            <div>
              <ToggleSwitch
                disabled={disabled}
                checked={auth_required}
                handleChange={handleCheckedRequired}
              />
            </div>
          </S.Div>
          <S.Div>
            <div>
              <S.ToggleTitle>
                Authorization revocable
                <Tooltip text={tooltipInfo.revocable} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </S.ToggleTitle>
            </div>

            <div>
              <ToggleSwitch
                disabled={disabled}
                checked={auth_revocable}
                handleChange={handleCheckedRevocable}
              />
            </div>
          </S.Div>
          <S.Div>
            <div>
              <S.ToggleTitle>
                Authorization immutable
                <Tooltip text={tooltipInfo.immutable} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </S.ToggleTitle>
            </div>

            <div>
              <ToggleSwitch
                disabled={disabled}
                checked={auth_immutable}
                handleChange={handleCheckedImmutable}
              />
            </div>
          </S.Div>
          <S.Div>
            <div>
              <S.ToggleTitle>
                Clawback enabled
                <Tooltip text={tooltipInfo.clawback} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </S.ToggleTitle>
            </div>

            <div>
              <ToggleSwitch
                disabled={disabled}
                checked={auth_clawback_enabled}
                handleChange={handleClawbackEnabled}
              />
            </div>
          </S.Div>
          {disabled ? (
            <S.ErrorBox style={{ marginTop: '8px' }}>
              You can no longer change the status of your flags
              because you have already activated theImmutable flag.
            </S.ErrorBox>
          ) : (
            ''
          )}
          <ButtonContainer
            gap={12}
            mt={12}
            btnSize={100}
            justify="end"
          >
            <Button
              variant="default"
              size="medium"
              content="Cancel"
              onClick={onCancel}
            />
            <Button
              disabled={disabled}
              onClick={handleSubmit}
              variant="primary"
              size="medium"
              content="Save"
            />
          </ButtonContainer>
        </S.Content>
      </ScrollBar>
    </>
  );
};

export default connect((state) => ({
  accounts: state.accounts,
}))(Flags);

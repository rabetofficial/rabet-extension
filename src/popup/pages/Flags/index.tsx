import { Horizon } from '@stellar/stellar-sdk';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import RouteName from 'popup/staticRes/routes';
import * as flagsText from 'popup/staticRes/flags';
import Header from 'popup/components/common/Header';
import Button from 'popup/components/common/Button';
import Tooltip from 'popup/components/common/Tooltips';
import ExtTitle from 'popup/components/common/Title/Ext';
import ScrollBar from 'popup/components/common/ScrollBar';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import setFlagsAction from 'popup/actions/operations/setFlags';
import ToggleSwitch from 'popup/components/common/ToggleSwitch';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

const Flags = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [flags, setFlags] =
    useState<Partial<Horizon.HorizonApi.Flags> | null>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (account.flags) {
      setFlags(account.flags);

      if (account.flags.auth_immutable) {
        setDisabled(true);
      }
    }
  }, [account.flags]);

  const handleCheckedRequired = (checked: boolean) => {
    if (flags) {
      setFlags({
        ...flags,
        auth_required: checked,
      });
    } else {
      setFlags({
        auth_required: checked,
      });
    }
  };
  const handleCheckedRevocable = (checked: boolean) => {
    if (flags) {
      setFlags({
        ...flags,
        auth_revocable: checked,
      });
    } else {
      setFlags({
        auth_revocable: checked,
      });
    }
  };

  const handleCheckedImmutable = (checked: boolean) => {
    if (flags) {
      setFlags({
        ...flags,
        auth_immutable: checked,
      });
    } else {
      setFlags({
        auth_immutable: checked,
      });
    }
  };

  const handleClawbackEnabled = (checked: boolean) => {
    if (flags) {
      setFlags({
        ...flags,
        auth_clawback_enabled: checked,
      });
    } else {
      setFlags({
        auth_clawback_enabled: checked,
      });
    }
  };

  const handleSubmit = () => {
    if (
      flags?.auth_immutable ||
      (flags?.auth_clawback_enabled && !flags?.auth_revocable)
    ) {
      navigate(RouteName.ConfirmFlag, {
        state: {
          flags,
        },
      });
    } else {
      setFlagsAction(flags, navigate);
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
    <div style={{ maxWidth: '360px' }}>
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
                <Tooltip text={flagsText.required} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </S.ToggleTitle>
            </div>

            <div>
              <ToggleSwitch
                disabled={disabled}
                checked={!!flags?.auth_required}
                handleChange={handleCheckedRequired}
              />
            </div>
          </S.Div>

          <S.Div>
            <div>
              <S.ToggleTitle>
                Authorization revocable
                <Tooltip text={flagsText.revocable} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </S.ToggleTitle>
            </div>

            <div>
              <ToggleSwitch
                disabled={disabled}
                checked={!!flags?.auth_revocable}
                handleChange={handleCheckedRevocable}
              />
            </div>
          </S.Div>

          <S.Div>
            <div>
              <S.ToggleTitle>
                Authorization immutable
                <Tooltip text={flagsText.immutable} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </S.ToggleTitle>
            </div>

            <div>
              <ToggleSwitch
                disabled={disabled}
                checked={!!flags?.auth_immutable}
                handleChange={handleCheckedImmutable}
              />
            </div>
          </S.Div>

          <S.Div>
            <div>
              <S.ToggleTitle>
                Clawback enabled
                <Tooltip text={flagsText.clawback} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </S.ToggleTitle>
            </div>

            <div>
              <ToggleSwitch
                disabled={disabled}
                checked={!!flags?.auth_clawback_enabled}
                handleChange={handleClawbackEnabled}
              />
            </div>
          </S.Div>

          {disabled ? (
            <S.ErrorBox style={{ marginTop: '8px' }}>
              You can no longer change the status of your flags
              because you have already activated the Immutable flag.
            </S.ErrorBox>
          ) : (
            ''
          )}

          <ButtonContainer
            gap={12}
            mt={12}
            btnSize={100}
            positionStyles={{ bottom: '16px' }}
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
    </div>
  );
};

export default Flags;

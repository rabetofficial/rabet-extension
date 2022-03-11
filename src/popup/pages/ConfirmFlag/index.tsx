import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Alert from 'popup/components/common/Alert';
import Header from 'popup/components/common/Header';
import Button from 'popup/components/common/Button';
import setFlagsAction from 'popup/actions/operations/setFlags';
import currentActiveAccount from 'popup/utils/activeAccount';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import ExtTitle from 'popup/components/common/Title/Ext';

const ConfirmFlag = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = () => {
    const { activeAccount } = currentActiveAccount();

    const isAuthClawbackEnabledAlreadyEnabled =
      activeAccount.flags.auth_clawback_enabled;

    const flags = {
      ...state,
    };

    if (
      flags.auth_clawback_enabled &&
      !flags.auth_revocable &&
      !isAuthClawbackEnabledAlreadyEnabled
    ) {
      flags.auth_revocable = true;
    } else if (
      flags.auth_clawback_enabled &&
      !flags.auth_revocable &&
      isAuthClawbackEnabledAlreadyEnabled
    ) {
      flags.auth_revocable = false;
      flags.auth_clawback_enabled = false;
    }

    setFlagsAction(flags, navigate);
  };

  const { activeAccount } = currentActiveAccount();
  const { auth_revocable, auth_immutable, auth_clawback_enabled } =
    state;

  const isAuthClawbackEnabledAlreadyEnabled =
    activeAccount.flags.auth_clawback_enabled;

  return (
    <>
      <Header />

      <div style={{ padding: '16px' }}>
        <ExtTitle title="Flags" />
        {auth_immutable ? (
          <>
            <Alert
              type="alert-warning"
              text="Are you sure you want to activate Immutable Flag?"
            />
            <p className="text-primary-dark mt-[14px] text-base">
              If this is set then none of the authorization flags can
              be changed and the account can never be deleted.
            </p>
          </>
        ) : (
          ''
        )}
        {auth_clawback_enabled &&
        !auth_revocable &&
        !isAuthClawbackEnabledAlreadyEnabled ? (
          <>
            <Alert
              type="alert-warning"
              text="Clawback enabled requires authorization revocable. Are you sure you want to activate revocable?"
            />
          </>
        ) : (
          ''
        )}
        {auth_clawback_enabled &&
        !auth_revocable &&
        isAuthClawbackEnabledAlreadyEnabled ? (
          <>
            <Alert
              type="alert-warning"
              text="Disabling authorization revocable disables clawback enabled as well. Are you sure you want to deactivate both?"
            />
          </>
        ) : (
          ''
        )}
        <ButtonContainer btnSize={100} gap={12} mt={40} justify="end">
          <Button
            variant="default"
            size="medium"
            content="Cancel"
            onClick={() => {
              navigate(-1);
            }}
          />
          <Button
            type="submit"
            variant="primary"
            size="medium"
            content="Confirm"
            onClick={handleSubmit}
          />
        </ButtonContainer>
      </div>
    </>
  );
};

export default ConfirmFlag;

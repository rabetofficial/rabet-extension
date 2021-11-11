import classNames from 'classnames';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Tooltip from '../../components/Tooltip';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import ToggleSwitch from '../../components/ToggleSwitch';
import currentActiveAccount from '../../utils/activeAccount';
import setFlagsAction from '../../actions/operations/setFlags';

import styles from './styles.less';

const tooltipInfo = {
  required: 'Requires the issuing account to give other accounts permission before they can hold the issuing account’s credit.',
  revocable: 'Allows the issuing account to revoke its credit held by other accounts.',
  immutable: 'If this is set then none of the authorization flags can be changed and the account can never be deleted.',
  clawback: 'Enables clawbacks for all assets issued by this account. Note that this only applies along trustlines established after this flag has been set. Requires authorization revocable.',
};

const Flags = () => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [auth_required, setAuth_required] = useState(false);
  const [auth_revocable, setAuth_revocable] = useState(false);
  const [auth_immutable, setAuth_immutable] = useState(false);
  const [auth_clawback_enabled, setAuth_clawback_enabled] = useState(false);

  useEffect(() => {
    const { activeAccount } = currentActiveAccount();

    if (activeAccount.flags.auth_immutable) {
      setDisabled(true);
    }

    setAuth_required(activeAccount.flags.auth_required || false);
    setAuth_revocable(activeAccount.flags.auth_revocable || false);
    setAuth_immutable(activeAccount.flags.auth_immutable || false);
    setAuth_clawback_enabled(activeAccount.flags.auth_clawback_enabled || false);
  }, []);

  const handleCheckedRequired = (checked) => setAuth_required(checked);
  const handleCheckedRevocable = (checked) => setAuth_revocable(checked);
  const handleCheckedImmutable = (checked) => setAuth_immutable(checked);
  const handleClawbackEnabled = (checked) => setAuth_clawback_enabled(checked);

  const handleSubmit = () => {
    if (auth_immutable || (auth_clawback_enabled && !auth_revocable)) {
      navigate(
        route.confirmFlagPage,
        {
          state: {
            auth_required,
            auth_revocable,
            auth_immutable,
            auth_clawback_enabled,
          },
        },
      );
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

  return (
    <>
      <div className={classNames(styles.page, 'hidden-scroll content-scroll')}>
        <Header />

        <PageTitle title="Flags" />

        <div className="content">
          <h6 className={styles.title}>
            Currently, there are 4 flags, used by issuers of assets.
            in below you can see your flags status:
          </h6>

          <div className={classNames('pure-g', styles.div, styles.first)}>
            <div className="pure-u-2-3">
              <h3 className={styles.toggleTitle}>
                Authorization required
                <Tooltip trigger="hover" tooltip={tooltipInfo.required} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </h3>
            </div>

            <div className="pure-u-1-3">
              <ToggleSwitch
                disabled={disabled}
                checked={auth_required}
                handleChange={handleCheckedRequired}
              />
            </div>
          </div>

          <div className={classNames('pure-g', styles.div)}>
            <div className="pure-u-2-3">
              <h3 className={styles.toggleTitle}>
                Authorization revocable
                <Tooltip trigger="hover" tooltip={tooltipInfo.revocable} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </h3>
            </div>

            <div className="pure-u-1-3">
              <ToggleSwitch
                disabled={disabled}
                checked={auth_revocable}
                handleChange={handleCheckedRevocable}
              />
            </div>
          </div>

          <div className={classNames('pure-g', styles.div)}>
            <div className="pure-u-2-3">
              <h3 className={styles.toggleTitle}>
                Authorization immutable
                <Tooltip trigger="hover" tooltip={tooltipInfo.immutable} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </h3>
            </div>

            <div className="pure-u-1-3">
              <ToggleSwitch
                disabled={disabled}
                checked={auth_immutable}
                handleChange={handleCheckedImmutable}
              />
            </div>
          </div>

          <div className={classNames('pure-g', styles.div)}>
            <div className="pure-u-2-3">
              <h3 className={styles.toggleTitle}>
                Clawback enabled
                <Tooltip trigger="hover" tooltip={tooltipInfo.clawback} placement="top">
                  <span className="icon-question-mark" />
                </Tooltip>
              </h3>
            </div>

            <div className="pure-u-1-3">
              <ToggleSwitch
                disabled={disabled}
                checked={auth_clawback_enabled}
                handleChange={handleClawbackEnabled}
              />
            </div>

            {disabled ? (
              <div className="error-box" style={{ marginTop: '16px' }}>
                You can no longer change the status of your flags
                because you have already activated theImmutable flag.
              </div>
            ) : ''}
          </div>
        </div>
      </div>

      <div className={classNames('pure-g justify-end content', styles.buttons)}>
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

        <Button
          disabled={disabled}
          onClick={handleSubmit}
          variant="btn-primary"
          size="btn-medium"
          content="Save"
        />
      </div>
    </>
  );
};

export default connect((state) => ({
  accounts: state.accounts,
}))(Flags);

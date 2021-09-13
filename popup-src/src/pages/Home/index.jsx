import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { Link, withRouter } from 'react-router-dom';

import Tabs from '../../components/Tabs';
import Input from '../../components/Input';
import shorter from '../../helpers/shorter';
import Header from '../../components/Header';
import Button from '../../components/Button';
import LoadingOne from '../LoadingOne';
import DropMenu from '../../components/DropMenu';
import CopyText from '../../components/CopyText';
import showBalance from '../../helpers/showBalance';
import getData from '../../actions/accounts/getData';
import AssetList from '../../pageComponents/AssetList';
import formatCurrency from '../../helpers/formatCurrency';
import intervalAction from '../../actions/accounts/interval';
import currentActiveAccount from '../../helpers/activeAccount';
import changeNameAction from '../../actions/accounts/changeName';
import TransactionList from '../../pageComponents/TransactionList';
import { buttonSizes, buttonTypes, inputSize } from '../../staticRes/enum';
import numberWithCommas from '../../helpers/numberWithCommas';
import {
  ShowPrivateKeyPage,
  flagPage,
  SendPage,
  QRCodePage,
  connectedWebsitePage,
  deleteAccountPage,
} from '../../staticRes/routes';

import penSrc from '../../assets/images/pen-edit.svg';
import worldSrc from '../../assets/images/world.svg';
import trashSrc from '../../assets/images/trash-delete.svg';

import styles from './styles.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: false,
      loading: true,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;

    if (!history.location?.state?.alreadyLoaded) {
      const { activeAccount } = currentActiveAccount();

      getData(activeAccount.publicKey).then(() => {
        this.setState({
          loading: false,
        });
      });

      intervalAction(activeAccount.publicKey, true);
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  onSubmit(values) {
    changeNameAction(values.name);

    this.toggleEdit();
  }

  toggleEdit() {
    this.setState((prevState) => ({
      editName: !prevState.editName,
    }));
  }

  validateForm(values) {
    const errors = {};

    if (!values.name) {
      errors.name = null;
    }

    return errors;
  }

  render() {
    const { loading, editName } = this.state;
    const { options, currencies, history } = this.props;
    const activeCurrency = currencies[options.currency] || { value: 0, currency: 'USD' };

    const { activeAccount, activeAccountIndex } = currentActiveAccount();

    const balances = activeAccount.balances || [];

    const totalBalance = balances.reduce((sum, item) => {
      const nextValue = item.asset_type === 'native'
        ? Number.parseFloat(item.balance, 10) * activeCurrency.value
        : (1 / Number.parseFloat(item.toNative, 10))
        * activeCurrency.value * Number.parseFloat(item.balance, 10) || 0;

      return sum + nextValue;
    }, 0);

    const nativeIndex = balances.findIndex((x) => x.asset_type === 'native');

    if (nativeIndex !== -1) {
      balances[nativeIndex].asset_code = 'XLM';
      balances[nativeIndex].toNative = balances[nativeIndex].balance;
    }

    const tabs = [
      {
        id: '1',
        tabTitle: 'Assets',
        tabContent: <AssetList items={balances} maxHeight={editName ? 205 : 214} />,
      },
      {
        id: '2',
        tabTitle: 'Transactions',
        tabContent: <TransactionList maxHeight={editName ? 215 : 221} />,
      },
    ];

    const dropMenuItems = [
      {
        label: 'Show private key',
        icon: 'icon-key',
        onClick: () => {
          history.push(ShowPrivateKeyPage);
        },
      },
      {
        label: 'Show flags',
        icon: 'icon-flag',
        onClick: () => {
          history.push(flagPage);
        },
      },
      {
        label: 'Connected sites',
        icon: <img src={worldSrc} alt="icon" />,
        onClick: () => {
          history.push(connectedWebsitePage);
        },
      },
      {
        label: 'Delete account',
        icon: <img src={trashSrc} alt="icon" />,
        onClick: () => {
          history.push(deleteAccountPage);
        },
        className: styles.delete,
      },
    ];

    if (loading) {
      return <LoadingOne title="Waiting for network" size={95} />;
    }

    return (
      <>
        <Header />
        <div className={styles.xlmBox}>
          <div className="pure-g">
            <div className="pure-u">
              <div className={styles.value}>
                {showBalance(numberWithCommas(formatCurrency(totalBalance)), activeCurrency.name)}
              </div>
              <div className={styles.subject}>
                Total (
                {activeCurrency.name}
                )
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className="pure-g">
            <div className="pure-u-11-12">
              <label className="label-secondary">Name</label>
              {editName ? (
                <Form
                  onSubmit={(values) => {
                    this.onSubmit(values);
                  }}
                  validate={(values) => this.validateForm(values)}
                  render={({ submitError, handleSubmit }) => (
                    <form
                      className={classNames(styles.form, 'form pure-g')}
                      onSubmit={handleSubmit}
                      autoComplete="off"
                    >
                      <div className={styles.field}>
                        <Field
                          name="name"
                          initialValue={activeAccount.name || `Account ${activeAccountIndex + 1}`}
                        >
                          {({ input, meta }) => (
                            <Input
                              type="text"
                              size={inputSize.small}
                              style={{ width: '137px', marginTop: '0' }}
                              input={input}
                              meta={meta}
                              autoFocus
                            />
                          )}
                        </Field>
                        {submitError && <div className="error">{submitError}</div>}
                      </div>
                      <Button
                        type="submit"
                        variant={buttonTypes.primary}
                        content={<span className="icon-checkmark" />}
                        className={styles.btn}
                      />
                    </form>
                  )}
                />
              ) : (
                <p className={styles.info}>
                  {(activeAccount.name
                    && (activeAccount.name.length < 13
                      ? activeAccount.name
                      : activeAccount.name.substr(0, 13).concat('...')))
                    || `Account ${activeAccountIndex + 1}`}
                  <span
                    className={styles.edit}
                    onClick={this.toggleEdit}
                  >
                    <img src={penSrc} alt="icon" />
                  </span>
                </p>
              )}
              <label className="label-secondary">Address</label>
              <p className={styles.info}>
                <CopyText
                  text={activeAccount.publicKey}
                  button={shorter(activeAccount.publicKey, 8)}
                />
              </p>
            </div>
            <div className="pure-u-1-12">
              <DropMenu width={198} items={dropMenuItems}>
                <a className={styles.expand}>
                  <span className="icon-expand-more" />
                </a>
              </DropMenu>
            </div>
            <div className={styles.buttonBox}>
              <Link to={SendPage}>
                <Button
                  size={buttonSizes.small}
                  variant={buttonTypes.primary}
                  content="Operation"
                  style={{ width: '112px' }}
                />
              </Link>
              <Link to={QRCodePage}>
                <Button
                  size={buttonSizes.small}
                  variant={buttonTypes.outlined}
                  content="Receive"
                  style={{ width: '112px' }}
                />
              </Link>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <Tabs data={tabs} tabTitleStyle={{ margin: '0 16px' }} />
        </div>
      </>
    );
  }
}

export default withRouter(
  connect((state) => ({
    accounts: state.accounts,
    options: state.options,
    currencies: state.currencies,
  }))(Home),
);

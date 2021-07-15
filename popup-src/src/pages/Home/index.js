import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { Link, withRouter, Redirect } from 'react-router-dom';

import Tabs from 'Root/components/Tabs';
import Input from 'Root/components/Input';
import shorter from 'Root/helpers/shorter';
import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import LoadingOne from 'Root/pages/LoadingOne';
import * as route from 'Root/staticRes/routes';
import DropMenu from 'Root/components/DropMenu';
import CopyText from 'Root/components/CopyText';
import showBalance from 'Root/helpers/showBalance';
import getData from 'Root/actions/accounts/getData';
import stellar from 'Root/assets/images/stellar.png';
import AssetList from 'Root/pageComponents/AssetList';
import formatCurrency from 'Root/helpers/formatCurrency';
import intervalAction from 'Root/actions/accounts/interval';
import currentActiveAccount from 'Root/helpers/activeAccount';
import changeNameAction from 'Root/actions/accounts/changeName';
import TransactionList from 'Root/pageComponents/TransactionList';
import { ShowPrivateKeyPage, flagPage } from 'Root/staticRes/routes';
import { buttonSizes, buttonTypes, inputSize } from 'Root/staticRes/enum';

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
    if (!this.props.history.location?.state?.alreadyLoaded) {
      const { activeAccount, activeAccountIndex } = currentActiveAccount();

      getData(activeAccount.publicKey).then(() => {
        this.setState({
          loading: false,
        });
      });

      // intervalAction(activeAccount.publicKey);
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  toggleEdit() {
    this.setState((prevState) => {
      return {
        editName: !prevState.editName,
      };
    });
  }

  onSubmit(values) {
    changeNameAction(values.name);

    this.toggleEdit();
  }

  validateForm(values) {
    const errors = {};

    if (!values.name) {
      errors.name = null;
    }

    return errors;
  }

  render() {
    const { options, currencies } = this.props;
    const activeCurrency = currencies[options.currency];

    const { activeAccount, activeAccountIndex } = currentActiveAccount();

    let transactions = activeAccount.operations || [];
    let balances = activeAccount.balances || [];

    const totalBalance = balances.reduce((sum, item) => {
      const nextValue =
        item.asset_type === 'native'
          ? Number.parseFloat(item.balance, 10) * activeCurrency.value
          : (1 / Number.parseFloat(item.toNative, 10)) * activeCurrency.value * Number.parseFloat(item.balance, 10)
      
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
        tabContent: <AssetList items={balances} maxHeight={this.state.editName ? 205 : 214} />,
      },
      {
        id: '2',
        tabTitle: 'Transactions',
        tabContent: <TransactionList items={transactions} maxHeight={this.state.editName ? 215 : 221} />,
      },
    ];

    const dropMenuItems = [
      {
        label: 'Edit name',
        icon: 'icon-edit',
        onClick: this.toggleEdit,
      },
      {
        label: 'Show private key',
        icon: 'icon-key',
        onClick: () => {
          this.props.history.push(ShowPrivateKeyPage);
        },
      },
      {
        label: 'Show flags',
        icon: 'icon-flag',
        onClick: () => {
          this.props.history.push(flagPage);
        },
      },
    ];

    if (this.state.loading) {
      return <LoadingOne title="Waiting for network" size={95} />;
    }

    return (
      <>
        <Header />
        <div className={styles.xlmBox}>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <h6 className={styles.subject}>
                <img className={styles.xlm} src={stellar} alt="xlm" />
                XLM
              </h6>
              <p className={styles.value}>{formatCurrency(activeAccount.balance)}</p>
            </div>
            <div className="pure-u-1-2">
              <h6 className={styles.subject}>Total ({activeCurrency.currency.toUpperCase()})</h6>
              <p className={styles.value}>
                {showBalance(formatCurrency(totalBalance), activeCurrency.currency)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className="pure-g">
            <div className="pure-u-11-12">
              <label className="label-secondary">Name</label>
              {this.state.editName ? (
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
                  {(activeAccount.name &&
                    (activeAccount.name.length < 13
                      ? activeAccount.name
                      : activeAccount.name.substr(0, 13).concat('...'))) ||
                    `Account ${activeAccountIndex + 1}`}
                </p>
              )}
              <label className="label-secondary">Address</label>
              <p className={styles.info}>
                <CopyText text={activeAccount.publicKey} button={shorter(activeAccount.publicKey, 8)} />
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
              <Link to={route.SendPage}>
                <Button
                  size={buttonSizes.small}
                  variant={buttonTypes.primary}
                  content="Operation"
                  style={{ width: '112px' }}
                />
              </Link>
              <Link to={route.QRCodePage}>
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
        {/*tabs*/}
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

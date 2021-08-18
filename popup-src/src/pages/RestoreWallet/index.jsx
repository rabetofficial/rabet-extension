import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../components/Input';
import Header from '../../components/Header';
import Button from '../../components/Button';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import restoreAccountAction from '../../actions/accounts/restore';
import validatePrivateKey from '../../helpers/validate/privateKey';

class RestoreWallet extends Component {
  handleCancel(form) {
    const { accounts, history } = this.props;

    form.reset();

    if (accounts.length) {
      return history.push({
        pathname: route.homePage,
        state: {
          alreadyLoaded: true,
        },
      });
    }

    return history.push({
      pathname: route.firstPage,
    });
  }

  async onSubmit(values) {
    if (!validatePrivateKey(values.key)) {
      return { key: 'Invalid private key.' };
    }

    const { accounts, history } = this.props;

    const isDuplicated = accounts.some((x) => x.privateKey === values.key);

    if (isDuplicated) {
      return { key: 'Account is duplicated.' };
    }

    const account = await restoreAccountAction(values.key);

    if (account === 'duplicate') {
      return { key: "The account you're trying to import is a duplicate." };
    }

    if (!account) {
      return { key: 'Invalid seed.' };
    }

    return history.push(route.homePage);
  }

  validateForm(values) {
    const errors = {};

    if (!values.key) {
      errors.key = null;
    }

    return errors;
  }

  render() {
    return (
      <>
        <Header />
        <PageTitle title="Import Wallet" />
        <div className="content" style={{ marginTop: '28px' }}>
          <Form
            onSubmit={(values) => this.onSubmit(values)}
            validate={(values) => this.validateForm(values)}
            render={({
              submitError,
              handleSubmit,
              form,
              pristine,
            }) => (
              <form className="form" onSubmit={handleSubmit} autoComplete="off">
                <Field name="key">
                  {({ input, meta }) => (
                    <div>
                      <label className="label-primary">Private key</label>
                      <Input
                        type="text"
                        size="input-medium"
                        placeholder="S..."
                        input={input}
                        meta={meta}
                        autoFocus
                      />
                    </div>
                  )}
                </Field>
                {submitError && <div className="error">{submitError}</div>}
                <div className="pure-g justify-end" style={{ marginTop: '28px' }}>
                  <Button
                    variant="btn-default"
                    size="btn-small"
                    content="Cancel"
                    style={{ marginRight: '12px' }}
                    onClick={() => { this.handleCancel(form); }}
                  />
                  <Button
                    type="submit"
                    variant="btn-primary"
                    size="btn-small"
                    content="Import"
                    disabled={pristine}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </>
    );
  }
}

RestoreWallet.propTypes = {};

export default connect((state) => ({
  accounts: state.accounts,
}))(RestoreWallet);

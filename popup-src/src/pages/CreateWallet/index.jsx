import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import Input from '../../components/Input';
import Header from '../../components/Header';
import Button from '../../components/Button';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import createAccountAction from '../../actions/accounts/create';

class CreateWallet extends Component {
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
    const { history } = this.props;

    const isDone = await createAccountAction(values.name);

    if (!isDone) {
      return {
        name: 'Error.',
      };
    }

    return history.push(route.homePage);
  }

  validateForm(values) {
    const errors = {};

    if (!values.name) {
      errors.name = null;
    }

    return errors;
  }

  render() {
    return (
      <>
        <Header />
        <PageTitle title="Create New Wallet" />
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
                <Field name="name">
                  {({ input, meta }) => (
                    <div>
                      <label className="label-primary">Wallet name</label>
                      <Input
                        type="text"
                        size="input-medium"
                        placeholder="John"
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
                    content="Create"
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

CreateWallet.propTypes = {};

export default connect((state) => ({
  accounts: state.accounts,
}))(CreateWallet);

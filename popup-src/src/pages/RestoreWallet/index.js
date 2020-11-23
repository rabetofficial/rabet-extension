import React, {Component} from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import PageTitle from 'Root/components/PageTitle';
import restoreAccountAction from 'Root/actions/accounts/restore';
import validatePrivateKey from 'Root/helpers/validate/privateKey';

class RestoreWallet extends Component {
  async onSubmit (values) {
    if (!validatePrivateKey(values.key)) {
      return { key: 'Invalid seed.' };
    }

    const account = await restoreAccountAction(values.key);

    if (account === 'duplicate') {
      return { key: 'The account you\'re trying to import is a duplicate.' };
    }

    if (!account) {
      return { key: 'Invalid seed.' };
    }

    this.props.history.push(route.homePage);
  }

  validateForm (values) {
    const errors = {};
    if (!values.key) {
      errors.key = null;
    }

    return errors;
  }

  render() {
    return (
        <>
          <Header/>
          <PageTitle title="Import Wallet"/>
          <div className="content" style={ {marginTop: '28px'} }>
            <Form
              onSubmit={ (values) => this.onSubmit(values) }
              validate={ (values) => this.validateForm(values) }
              render={ ({submitError, handleSubmit, form, submitting, invalid }) => (
                <form className="form" onSubmit={ handleSubmit }>
                  <Field name="key">
                    {({input, meta}) => (
                        <div>
                          <label className="label-primary">Private key</label>
                          <Input
                            type="text"
                            size="input-medium"
                            placeholder="S..."
                            input={ input }
                            meta={ meta }
                            autoFocus
                          />
                        </div>
                    )}
                  </Field>
                  {submitError && <div className="error">{submitError}</div>}
                  <div className="pure-g justify-end" style={ {marginTop: '28px'} }>
                    <Button
                      variant="btn-default"
                      size="btn-small"
                      content="Cancel"
                      onClick={ form.reset }
                      style={ {marginRight: '12px'} }
                      onClick={() => { this.props.history.push({
                        pathname: route.homePage,
                        state: {
                          alreadyLoaded: true,
                        },
                      }) }}
                    />
                    <Button
                      type="submit"
                      variant="btn-primary"
                      size="btn-small"
                      content="Import"
                      disabled={ submitting || invalid }
                    />
                  </div>
                </form>
                ) }
            />
          </div>
        </>
    );
  }
}

RestoreWallet.propTypes = {

};

export default RestoreWallet;

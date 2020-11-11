import React, {Component} from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import PageTitle from 'Root/components/PageTitle';
import createAccountAction from 'Root/actions/accounts/create';

class CreateWallet extends Component {
  async onSubmit (values) {
    const isDone = await createAccountAction(values.name);

    if (!isDone) {
      return {
        name: 'Error.',
      };
    }

    this.props.history.push(route.homePage);
  }

  validateForm (values) {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
    return errors;
  }
  render() {
    return (
        <>
          <Header/>
          <PageTitle title="Create New Wallet"/>
          <div className="content" style={ {marginTop: '28px'} }>
            <Form
              onSubmit={ (values) => this.onSubmit(values) }
              validate={ (values) => this.validateForm(values) }
              render={ ({submitError, handleSubmit, form, submitting }) => (
                  <form className="form" onSubmit={ handleSubmit }>
                    <Field name="name">
                      {({input, meta}) => (
                          <div>
                            <label className="label-primary">Wallet name</label>
                            <Input
                              type="text"
                              size="input-medium"
                              placeholder="John"
                              input={ input }
                              meta={ meta }
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
                        content="Create"
                        disabled={ submitting }
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

CreateWallet.propTypes = {

};

export default CreateWallet;

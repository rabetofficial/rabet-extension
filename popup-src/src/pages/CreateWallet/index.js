import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';
import Button from 'Root/components/Button';
import Input from 'Root/components/Input';
import styles from './styles.less';

class CreateWallet extends Component {

  onSubmit (values) {
    // if (values.name !== 'erikras') {
    //   return { name: 'Unknown username' };
    // }
    console.warn(values);
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
              onSubmit={ this.onSubmit }
              validate={ (values) => this.validateForm(values) }
              render={ ({submitError, handleSubmit, form, submitting, pristine, values}) => (
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
                        onClick={() => {this.props.history.goBack()}}
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

import React, {Component} from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import classNames from 'classnames';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';
import Input from 'Root/components/Input';
import styles from './styles.less';
import Button from '../../components/Button';

class AddAsset extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};
    if (!values.code) {
      errors.code = 'Required';
    }
    return errors;
  }

  render() {
    return (
        <div className={ styles.div }>
          <Header/>
          <PageTitle title="Add assets" />
          <div className="content">
            <Form
              onSubmit={ this.onSubmit }
              validate={ (values) => this.validateForm(values) }
              render={ ({submitError, handleSubmit, submitting, values , form, pristine}) => (
                    <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                      <Field name="code">
                        {({input, meta}) => (
                            <div className="group">
                              <label className="label-primary">Assets code</label>
                              <Input
                                type="text"
                                placeholder="USD"
                                size="input-medium"
                                input={ input }
                                meta={ meta }
                              />
                            </div>
                        )}
                      </Field>
                      <Field name="issuer">
                        {({input, meta}) => (
                            <div className="group">
                              <label className="label-primary">Issuer</label>
                              <Input
                                type="text"
                                placeholder="G..."
                                size="input-medium"
                                input={ input }
                                meta={ meta }
                              />
                            </div>
                        )}
                      </Field>
                      <Field name="limit">
                        {({input, meta}) => (
                            <div className="group">
                              <label className="label-primary">Limit
                                <span className="label-optional">{' '}(optional)</span>
                              </label>
                              <Input
                                type="number"
                                placeholder="1000"
                                size="input-medium"
                                input={ input }
                                meta={ meta }
                              />
                            </div>
                        )}
                      </Field>
                      {submitError && <div className="error">{submitError}</div>}
                      <div className={ classNames('pure-g justify-end', styles.buttons) }>
                        <Button
                          variant="btn-default"
                          size="btn-medium"
                          content="Cancel"
                          onClick={ form.reset }
                        />
                        <Button
                          type="submit"
                          variant="btn-primary"
                          size="btn-medium"
                          content="Add"
                          disabled={ submitting }
                        />
                      </div>
                    </form>
                ) }
            />
          </div>
        </div>
    );
  }
}

export default AddAsset;

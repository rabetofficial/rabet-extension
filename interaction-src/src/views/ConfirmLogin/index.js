import classNames from 'classnames';
import React, {Component} from 'react';
import { Form, Field } from 'react-final-form';
import Logo from 'Root/components/Logo';
import Input from 'Root/components/Input';
import Button from 'Root/components/Button';
import {buttonSizes, buttonTypes, inputSize, inputTypes} from 'Root/staticRes/enum';

import styles from './styles.less';

class ConfirmLogin extends Component {

  onSubmit (values) {
  }

  validateForm (values) {

  }

  render() {
    return (
        <div className="pure-g content">
          <div className="pure-u-1-1">
            <Logo/>
            <Form
              onSubmit={ (values) => this.onSubmit(values) }
              validate={ (values) => this.validateForm(values) }
              render={ ({submitError, handleSubmit, submitting, invalid, pristine}) => (
                <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                  {console.log(submitting, invalid, pristine)}
                  <Field name="password">
                    {({input, meta}) => (
                    <Input
                      type="password"
                      placeholder="Password"
                      size={ inputSize.large }
                      variant={ inputTypes.passVisible }
                      input={ input }
                      meta={ meta }
                    />
                    )}
                  </Field>
                  <Field name="confirm">
                    {({input, meta}) => (
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      size={ inputSize.large }
                      variant={ inputTypes.passVisible }
                      input={ input }
                      meta={ meta }
                    />
                    )}
                  </Field>
                  {submitError && <div className="error">{submitError}</div>}
                  <Button
                    type="submit"
                    variant={ buttonTypes.primary }
                    size={ buttonSizes.large }
                    content="Continue"
                    style={ {marginTop: '32px'} }
                    disabled={ invalid }
                  />
                </form>
                ) }
            />
          </div>
        </div>
    );
  }
}

ConfirmLogin.propTypes = {

};

export default ConfirmLogin;

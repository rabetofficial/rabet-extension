import classNames from 'classnames';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import PageTitle from 'Root/components/PageTitle';
import showPrivateKeyAction from 'Root/actions/accounts/showPrivateKey';

import styles from './styles.less';

class ShowPrivateKey extends Component {
  async onSubmit (values) {
    const isLogged = await showPrivateKeyAction(values.key);

    if (!isLogged) {
      return { key: 'Incorrect password.' };
    }

    return this.props.history.push(route.privateKeyPage);
  }

  validateForm (values) {
    const errors = {};

    return errors;
  }

  render() {
    return (
        <div className={ styles.div }>
          <Header/>
          <PageTitle title="Show private key"/>
          <div className="content" style={ {marginTop: '28px'} }>
            <Form
              onSubmit={ (values) => this.onSubmit(values) }
              validate={ (values) => this.validateForm(values) }
              render={ ({ submitError, handleSubmit, form, submitting, pristine }) => (
                    <form className="form" onSubmit={ handleSubmit }>
                      <Field name="key" >
                        {({input, meta}) => (
                            <div>
                              <label className="label-primary">Password</label>
                              <Input
                                type="password"
                                size="input-medium"
                                variant="pass-visible"
                                placeholder="Enter your password"
                                input={ input }
                                meta={ meta }
                                autoFocus
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
                          onClick={() => {this.props.history.push({
                            pathname: route.homePage,
                            state: {
                              alreadyLoaded: true,
                            }
                          })}}
                        />
                        <Button
                          type="submit"
                          variant="btn-primary"
                          size="btn-medium"
                          content="Show"
                          disabled={ pristine || submitting }
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

ShowPrivateKey.propTypes = {};

export default withRouter(ShowPrivateKey);

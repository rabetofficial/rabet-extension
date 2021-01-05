import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import assetExists from 'Root/helpers/horizon/assetExists';
import validateAddress from 'Root/helpers/validate/address';
import addAssetAction from 'Root/actions/operations/addAsset';
import currentActiveAccount from 'Root/helpers/activeAccount';

import styles from './styles.less';

class CustomAsset extends Component {
  onSubmit (values) {
    addAssetAction(values, this.props.history.push);
  }

  async validateForm (values) {
    const errors = {};
    const hasError = {
      code: false,
      issuer: false,
    }

    if (!values.code) {
      errors.code = null;
      hasError.code = true;
    }

    if (!values.issuer) {
      errors.issuer = null
      hasError.issuer = true;
    } else {
      errors.issuer = null;
      hasError.issuer = true;
      if (!validateAddress(values.issuer)) {
        errors.issuer = 'Invalid issuer.';
        hasError.issuer = true;
      } else {
        delete errors.issuer;
        hasError.issuer = false;
      }
    }

    if (!hasError.code && !hasError.issuer) {
      const { activeAccount } = currentActiveAccount();

      const { balances } = activeAccount;

      const findAsset = balances.find(x => x.asset_code === values.code && x.asset_issuer === values.issuer);

      if (findAsset) {
        hasError.code = true;
        errors.code = 'Asset is already added.';
      }

      const assetExistsResult = await assetExists({
        code: values.code,
        issuer: values.issuer,
      });

      if (!assetExistsResult) {
        hasError.code = true;
        errors.code = 'Asset not found.';
      }
    }

    return errors;
  }

  render() {
    return (
        <div className={styles.content}>
          <Form
              onSubmit={(values) => { this.onSubmit(values) }}
              validate={ (values) => this.validateForm(values) }
              render={ ({submitError, handleSubmit, submitting, values , pristine, invalid}) => (
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
                                autoFocus
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
                          size="btn-medium"
                          content="Add"
                          disabled={ invalid || pristine || submitting }
                      />
                    </div>
                  </form>
              ) }
          />
        </div>
    );
  }
}

export default withRouter(CustomAsset);

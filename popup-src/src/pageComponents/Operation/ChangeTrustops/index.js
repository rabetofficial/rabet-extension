import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import SelectOption from 'Root/components/SelectOption';
import validateNumber from 'Root/helpers/validate/number';
import assetExists from 'Root/helpers/horizon/assetExists';
import validateAddress from 'Root/helpers/validate/address';
import getAccountData from 'Root/helpers/horizon/isAddressFound';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class ChangeTrustOps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ selected: e });
  }

  onSubmit (values) {
    console.warn(values);
  }

  async validateForm (values) {
    const errors = {};
    const hasError = {
      code: false,
    }

    let accountData;

    if (!values.code) {
      errors.code = null;
      hasError.code = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!values.issuer) {
      errors.issuer = null;
      hasError.issuer = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    } else {
      if (!validateAddress(values.issuer)) {
        errors.issuer = 'Invalid address.';
        hasError.issuer = true;

        changeOperationAction(this.props.id, {
          checked: false,
        });
      } else {
        accountData = await getAccountData(values.issuer);

        if (accountData.status) {
          changeOperationAction(this.props.id, {
            checked: false,
          });

          errors.issuer = 'Address is inactive.';
          hasError.issuer = true;
        }
      }
    }

    if (values.limit && !validateNumber(values.limit)) {
      errors.limit = 'Not a number';
      hasError.limit = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!hasError.limit && !hasError.issuer && !hasError.code) {
      const assetExistsResult = await assetExists({
        code: values.code,
        issuer: values.issuer,
      });

      if (!assetExistsResult) {
        errors.code = 'Asset not found.';
        hasError.code = true;

        changeOperationAction(this.props.id, {
          checked: false,
        });
      } else {
        changeOperationAction(this.props.id, {
          checked: true,
          code: values.code,
          limit: values.limit,
          issuer: values.issuer,
        });
      }
    }

    return errors;
  }

  render() {
    const list = [
      {value: 'ltc', label: 'LTC'},
      {value: 'ltc2', label: 'LTC2'},
    ]
    return (
        <Form
          onSubmit={ this.onSubmit }
          validate={ (values) => this.validateForm(values) }
          render={ ({submitError, handleSubmit, submitting, values}) => (
                <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                  <Field name="limit">
                    {({input, meta}) => (
                        <div className="pure-g group">
                          <div className={ styles.selectInput }>
                            <label className="label-primary">Limit amount</label>
                            <Input
                                type="number"
                                placeholder="1000"
                                size="input-medium"
                                input={ input }
                                meta={ meta }
                            />
                          </div>
                          <div className={ styles.select }>
                            <SelectOption
                                items={list}
                                onChange={ this.onChange }
                                variant="select-outlined"
                                defaultValue={list[0]}
                                selected={this.state.selected}
                            />
                          </div>
                        </div>
                    )}
                  </Field>
                  {submitError && <div className="error">{submitError}</div>}
                </form>
            ) }
        />
    );
  }
}

ChangeTrustOps.propTypes = {
};

export default ChangeTrustOps;

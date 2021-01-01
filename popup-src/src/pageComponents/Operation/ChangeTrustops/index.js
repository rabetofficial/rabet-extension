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
import currentActiveAccount from 'Root/helpers/activeAccount';
import getAccountData from 'Root/helpers/horizon/isAddressFound';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class ChangeTrustOps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
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

    if (values.limit && !validateNumber(values.limit)) {
      errors.limit = null;
      hasError.limit = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    } else {
      let l = parseInt(values.limit, 10);

      if (l > 922337203685 || l < 1) {
        errors.limit = 'Limit number must be between 1 and 922,337,203,685';
        hasError.limit = true;
      }
    }

    if (!hasError.limit && this.state.selected.value) {
      changeOperationAction(this.props.id, {
        checked: true,
        limit: values.limit,
        asset: this.state.selected,
      });
    }

    return errors;
  }

  componentDidMount() {
    const { activeAccount, activeAccountIndex } = currentActiveAccount();

    const { balances } = activeAccount;

    let list = [];

    for (let i = 0; i < balances.length; i++) {
      list.push({
        value: balances[i].asset_code,
        label: balances[i].asset_code,
        ...balances[i],
      });
    }

    list = list.filter(x => x.asset_type !== 'native');

    this.setState({
      list,
      selected: list[0],
    });
  }

  render() {
    const { list } = this.state;

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

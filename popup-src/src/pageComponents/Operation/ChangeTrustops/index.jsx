import classNames from 'classnames';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import SelectOption from '../../../components/SelectOption';
import validateNumber from '../../../helpers/validate/number';
import currentActiveAccount from '../../../helpers/activeAccount';
import changeOperationAction from '../../../actions/operations/change';

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

  componentDidMount() {
    const { activeAccount } = currentActiveAccount();

    const { balances } = activeAccount;

    let list = [];

    for (let i = 0; i < balances.length; i += 1) {
      list.push({
        value: balances[i].asset_code,
        label: balances[i].asset_code,
        ...balances[i],
      });
    }

    list = list.filter((x) => x.asset_type !== 'native');

    this.setState({
      list,
      selected: list[0],
    });
  }

  onChange(e) {
    this.setState({ selected: e });
  }

  async validateForm(values) {
    const { id } = this.props;
    const { selected } = this.state;
    const errors = {};
    const hasError = {
      code: false,
    };

    if (values.limit && !validateNumber(values.limit)) {
      errors.limit = null;
      hasError.limit = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      const l = parseInt(values.limit, 10);

      if (l > 922337203685 || l < 1) {
        errors.limit = 'Limit number must be between 1 and 922,337,203,685';
        hasError.limit = true;
      }
    }

    if (!hasError.limit && selected.value) {
      changeOperationAction(id, {
        checked: true,
        limit: values.limit,
        asset: selected,
      });
    }

    return errors;
  }

  render() {
    const { list, selected } = this.state;

    return (
      <Form
        onSubmit={() => {}}
        validate={(values) => this.validateForm(values)}
        render={({ submitError, handleSubmit }) => (
          <form
            className={classNames(styles.form, 'form')}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Field name="limit">
              {({ input, meta }) => (
                <div className="pure-g group">
                  <div className={styles.selectInput}>
                    <label className="label-primary">Limit amount</label>
                    <Input
                      type="number"
                      placeholder="1000"
                      size="input-medium"
                      input={input}
                      meta={meta}
                    />
                  </div>
                  <div className={styles.select}>
                    <SelectOption
                      items={list}
                      onChange={this.onChange}
                      variant="select-outlined"
                      defaultValue={list[0]}
                      selected={selected}
                    />
                  </div>
                </div>
              )}
            </Field>
            {submitError && <div className="error">{submitError}</div>}
          </form>
        )}
      />
    );
  }
}

ChangeTrustOps.propTypes = {};

export default ChangeTrustOps;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import classNames from 'classnames';
import Input from 'Root/components/Input';
import SelectOption from 'Root/components/SelectOption';
import styles from './styles.less';

const items = [
  {value: 'xlm', label: 'XLM'},
  {value: 'aa', label: 'AA'},
  {value: 'bb', label: 'BB'},
  {value: 'cc', label: 'CC'},
];

class PaymentReceiveOps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMax: {},
      selectedAmount: {},
    };
    this.onChangeMax = this.onChangeMax.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
  }

  onChangeMax(e) {
    this.setState({selectedMax: e});
  }

  onChangeAmount(e) {
    this.setState({selectedAmount: e});
  }

  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};
    if (!values.destination) {
      errors.destination = 'Required';
    }
    return errors;
  }

  render() {
    return (
        <Form
          onSubmit={ this.onSubmit }
          validate={ (values) => this.validateForm(values) }
          render={ ({submitError, handleSubmit, submitting, values}) => (
                <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                  <Field name="destination">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Destination</label>
                          <Input
                            type="text"
                            placeholder="G…"
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                          />
                        </div>
                    )}
                  </Field>
                  <Field name="max">
                    {({input, meta}) => (
                        <div className='pure-g group'>
                          <div className={ styles.selectInput }>
                            <label className="label-primary">
                              <span>Send max</span>
                              <span>Max <span className="icon-caret-up" /></span>
                            </label>
                            <Input
                              type="number"
                              placeholder="1"
                              size="input-medium"
                              input={ input }
                              meta={ meta }
                            />
                          </div>
                          <div className={ styles.select }>
                            <SelectOption
                              items={ items }
                              onChange={ this.onChangeMax }
                              variant="select-outlined"
                            />
                          </div>
                        </div>
                    )}
                  </Field>
                  <Field name="amount">
                    {({input, meta}) => (
                        <div className='pure-g group'>
                          <div  className={ styles.selectInput }>
                            <label className="label-primary">Destination amount</label>
                            <Input
                              type="number"
                              placeholder="1"
                              size="input-medium"
                              input={ input }
                              meta={ meta }
                            />
                          </div>
                          <div className={ styles.select }>
                            <SelectOption
                              items={ items }
                              onChange={ this.onChangeAmount }
                              variant="select-outlined"
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

PaymentReceiveOps.propTypes = {};

export default PaymentReceiveOps;

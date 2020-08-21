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

class OfferOps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSell: {},
      selectedBuy: {},
    };
    this.onChangeSellAmount = this.onChangeSellAmount.bind(this);
    this.onChangeBuyAmount = this.onChangeBuyAmount.bind(this);
  }

  onChangeSellAmount(e) {
    this.setState({selectedSell: e});
  }

  onChangeBuyAmount(e) {
    this.setState({selectedBuy: e});
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
                  <Field name="sell">
                    {({input, meta}) => (
                        <div className="pure-g group">
                          <div className={ styles.selectInput }>
                            <label className="label-primary max">
                              <span>Selling amount</span>
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
                              onChange={ this.onChangeSellAmount }
                              variant="select-outlined"
                            />
                          </div>
                        </div>
                    )}
                  </Field>
                  <Field name="buy">
                    {({input, meta}) => (
                        <div className="pure-g group">
                          <div className={ styles.selectInput }>
                            <label className="label-primary">Buying amount</label>
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
                              onChange={ this.onChangeBuyAmount }
                              variant="select-outlined"
                            />
                          </div>
                        </div>
                    )}
                  </Field>
                  <Field name="id">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">
                            Offer ID
                            <span className="label-optional">{' '}(optional)</span>
                          </label>
                          <Input
                            type="text"
                            placeholder="12345"
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                          />
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

OfferOps.propTypes = {};

export default OfferOps;

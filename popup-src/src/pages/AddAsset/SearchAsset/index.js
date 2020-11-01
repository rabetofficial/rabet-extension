import React, {Component} from 'react';
import classNames from 'classnames';
import {Field, Form} from 'react-final-form';

import Input from 'Root/components/Input';

import styles from './styles.less';

class SearchAsset extends Component {
  onSubmit (values) {
    // console.warn(values);
  }

  async validateForm (values) {
    const errors = {};
    // console.warn(values)
  }

  render() {

    const items = [
      {name: 'DAI', web: 'Sample.com', logo: ''},
      {name: 'USDT', web: 'Sample.com', logo: ''},
      {name: 'STL', web: 'Sample.com', logo: ''},
      {name: 'DAO', web: 'Sample.com', logo: ''},
    ];

    return (
        <div className={styles.content}>
          <Form
              onSubmit={(values) => { this.onSubmit(values) }}
              validate={ (values) => this.validateForm(values) }
              render={ ({submitError, handleSubmit, submitting, values , form, pristine}) => (
                  <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                    <Field name="token">
                      {({input, meta}) => (
                            <Input
                                type="text"
                                placeholder="&#xe915;&nbsp;&nbsp;Search tokens"
                                size="input-medium"
                                input={ input }
                                meta={ meta }
                                style={{fontFamily: 'Roboto, \'icomoon\''}}
                            />
                      )}
                    </Field>
                  </form>
              )}
          />
          <h6 className={styles.result}>Search result</h6>
          <ul className={styles.list}>
            {items.map((item, index) => (
                <li key={index} className={styles.item}>
                  <h4 className={styles.name}>{item.name}</h4>
                  <p className={styles.web}>{item.web}</p>
                </li>
            ))}
          </ul>
        </div>
    );
  }
}

export default SearchAsset;

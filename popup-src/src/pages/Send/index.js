import shortid from 'shortid';
import classNames from 'classnames';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Field, Form} from 'react-final-form';

import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import PageTitle from 'Root/components/PageTitle';
import SendButton from 'Root/components/SendButton';
import sendAction from 'Root/actions/operations/send';
import Operation from 'Root/pageComponents/Operation';
import addMemoAction from 'Root/actions/operations/addMemo';
import addOperationAction from 'Root/actions/operations/add';
import clearOperationsAction from 'Root/actions/operations/clear';
import Card from 'Root/components/Card';
import Input from 'Root/components/Input';

import styles from './styles.less';

const btnContent = <><span className="icon-plus-math"/>{''}Add Operation</>;

class Send extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operations: [],
    };

    this.onSend = this.onSend.bind(this);
    this.addOperation = this.addOperation.bind(this);
  }

  componentDidMount() {
    clearOperationsAction();
    this.addOperation();
  }

  addOperation() {
    const operation = {
      type: 'payment',
      id: shortid.generate(),
    };

    this.setState((prevState) => ({
      operations: [...prevState.operations, operation],
    }));

    addOperationAction(operation.id);
  }

  onSend() {
    sendAction(this.props.history.push);
  }

  onSubmit (values) {
    console.warn(values);
  }

  async validateForm (values) {
    if (values.memo) {
      if (values.memo.length > 28) {
        addMemoAction({
          checked: false,
          text: values.memo,
        });

        return {
          memo: 'Memo should not be more than 28 characters.',
        };
      } else {
        addMemoAction({
          checked: true,
          text: values.memo,
        });
      }
    }
  }

  render() {
    return (
        <>
          <div className={ classNames(styles.page, styles.scroll, 'hidden-scroll') }>
            <Header/>

            <PageTitle title="Operation"/>

            <div className={ classNames('content', styles.content) }>
              <Button
                variant="btn-outlined"
                size="btn-medium"
                content={ btnContent }
                className={ styles.btn }
                onClick={ this.addOperation }
              />
            </div>

            <div className="content">
              {this.state.operations.map((item) => (
                  <div key={ item.id }>
                    <Operation
                      id={item.id}
                      type={item.type}
                      state={this.state}
                      setState={this.setState.bind(this)}
                    />
                  </div>
              ))}

              <div className={styles.card}>
                <Card type="card-secondary">
                  <Form
                      onSubmit={ this.onSubmit }
                      validate={ (values) => this.validateForm(values) }
                      render={ ({ submitError, handleSubmit }) => (
                          <form className="form" onSubmit={ handleSubmit }>
                            <Field name="memo">
                              {({input, meta}) => (
                                  <div className="group">
                                    <label className="label-primary">Memo
                                      <span className="label-optional">{' '}(optional)</span>
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Gift"
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
                </Card>
              </div>

              <div className={ classNames('pure-g justify-end', styles.buttons) }>
                <Button
                  variant="btn-default"
                  size="btn-medium"
                  content="Back"
                  onClick={() => { this.props.history.push({
                    pathname: route.homePage,
                    state: {
                      alreadyLoaded: true,
                    },
                  }) }}
                />

                <SendButton />
              </div>
            </div>
          </div>
        </>
    );
  }
}

Send.propTypes = {};

// export default withRouter(connect(state => ({
//   operations: state.operations,
// }))(Send));

export default withRouter(Send);

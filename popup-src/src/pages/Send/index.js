import shortid from 'shortid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import PageTitle from 'Root/components/PageTitle';
import sendAction from 'Root/actions/accounts/send';
import Operation from 'Root/pageComponents/Operation';

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
    this.deleteOperation = this.deleteOperation.bind(this);
  }

  componentDidMount() {
    const id = shortid.generate();

    this.setState({
      operations: [{ type: 'payment', id }]
    });
  }

  addOperation() {
    const id = shortid.generate();

    const newItem = { type: 'payment', id };

    this.setState({
      operations: [...this.state.operations, newItem]
    });
  }

  deleteOperation(id) {
    let items = this.state.operations.filter(function(operation) {
      return operation.id !== id;
    });

    this.setState({ operations: items });
  }

  onSend() {
    console.log(this.state.operations);
    sendAction(this.state.operations);
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
                      state={this.state.operations}
                      setState={this.setState.bind(this)}
                      deleteOperations={ this.deleteOperation }
                      id={ item.id }
                    />
                  </div>
              ))}
              <div className={ classNames('pure-g justify-end', styles.buttons) }>
                <Button
                  variant="btn-default"
                  size="btn-medium"
                  content="Back"
                  onClick={() => {this.props.history.goBack()}}
                />
                <Button
                  onClick={this.onSend}
                  variant="btn-primary"
                  size="btn-medium"
                  content="Send"
                />
              </div>
            </div>
          </div>
        </>
    );
  }
}

Send.propTypes = {};

export default withRouter(Send);

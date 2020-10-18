import shortid from 'shortid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import PageTitle from 'Root/components/PageTitle';
import SendButton from 'Root/components/SendButton';
import sendAction from 'Root/actions/operations/send';
import Operation from 'Root/pageComponents/Operation';
import addOperationAction from 'Root/actions/operations/add';
import clearOperationsAction from 'Root/actions/operations/clear';

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

              <div className={ classNames('pure-g justify-end', styles.buttons) }>
                <Button
                  variant="btn-default"
                  size="btn-medium"
                  content="Back"
                  onClick={() => {this.props.history.goBack()}}
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

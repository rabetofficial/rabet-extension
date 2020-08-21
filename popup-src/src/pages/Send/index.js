import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'Root/components/Header';
import Button from 'Root/components/Button';
import PageTitle from 'Root/components/PageTitle';
import Operation from 'Root/pageComponents/Operation';

import styles from './styles.less';

const btnContent = <><span className="icon-plus-math"/>{''}Add Operation</>;

class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
    };
    this.addOperation = this.addOperation.bind(this);
    this.deleteOperation = this.deleteOperation.bind(this);
  }

  componentDidMount() {
    this.setState({operations: [{id: 'first'}]});
  }

  addOperation() {
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const randomId = randLetter + Date.now();
    const newItem = {id: randomId};
    this.setState({operations: [...this.state.operations, newItem]});
  }

  deleteOperation(id) {
    let items = this.state.operations.filter(function(operation) {
      return operation.id !== id;
    });

    this.setState({operations: items});
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
                    <Operation deleteOperations={ this.deleteOperation }
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

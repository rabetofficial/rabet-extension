import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';

class SendButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push(route.ConfirmPage);
  }

  render() {
    const { operations, memo } = this.props.transaction;

    let isDisabled = false;

    if (!operations.length) {
      isDisabled = true;
    }

    for (let i = 0; i < operations.length; i++) {
      if (!operations[i].checked) {
        isDisabled = true;
      }
    }

    if (!memo.checked) {
      isDisabled = true;
    }

    return (
      <Button
        onClick={this.handleClick}
        variant="btn-primary"
        size="btn-medium"
        content="Send"
        disabled={isDisabled}
      />
    );
  }
}

export default withRouter(connect(state => ({
  transaction: state.transaction,
}))(SendButton));

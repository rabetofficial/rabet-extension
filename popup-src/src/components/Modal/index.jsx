import React, { Component } from 'react';
import classNames from 'classnames';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import styles from './styles.less';

const modalRoot = document.getElementById('root');

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeType: null,
      background: React.createRef(),
    };

    this.handleClick = this.handleClick.bind(this);
    this.onEscKeyDown = this.onEscKeyDown.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onEscKeyDown, false);
    setTimeout(() => this.setState({ fadeType: 'in' }), 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isOpen && prevProps.isOpen) {
      this.setState({ fadeType: 'out' });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscKeyDown, false);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ fadeType: 'out' });
    this.props.onClose();
  }

  onEscKeyDown(e) {
    if (e.key !== 'Escape') return;
    this.setState({ fadeType: 'out' });
  }

  transitionEnd(e) {
    if (e.propertyName !== 'opacity' || this.state.fadeType === 'in') return;

    if (this.state.fadeType === 'out') {
      this.props.onClose();
    }
  }

  handleModalSize(size) {
    switch (size) {
      case 'lg':
        return '800';
      default:
        return '328';
    }
  }

  render() {
    return ReactDom.createPortal(
      <div
        id={this.props.id}
        className={classNames(`wrapper ${`size-${this.props.modalSize}`} fade-${this.state.fadeType} ${this.props.modalClass}`, styles.modal)}
        style={{ width: `${this.handleModalSize(this.props.modalSize)}px` }}
        role="dialog"
        onTransitionEnd={this.transitionEnd}
      >
        <div className="modal-dialog">
          <div className="modal-header">
            <h4 className="modal-title">{this.props.title}</h4>
            <button type="button" onClick={this.handleClick} className="close">
              <span className="icon-multiply" />
            </button>
          </div>
          <div className="modal-content">{this.props.children[0]}</div>
          <div className="modal-footer">{this.props.children[1]}</div>
        </div>
        <div className="modal-background" onMouseDown={this.handleClick} ref={this.state.background} />
      </div>,
      modalRoot,
    );
  }
}

Modal.defaultProps = {
  modalClass: '',
  modalSize: 'md',
  title: '',
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modalClass: PropTypes.string,
  modalSize: PropTypes.string,
  title: PropTypes.string,
};

export default Modal;

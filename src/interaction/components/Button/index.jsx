import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.less';

const Button = ({
  disabled,
  content,
  variant,
  size,
  type,
  onClick,
  style,
  className,
}) => (
  <button
    type={type}
    disabled={disabled}
    className={classNames(variant, size, className)}
    onClick={onClick}
    style={style}
  >
    {content}
  </button>
);

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  style: {},
  type: 'button',
  size: '',
  className: '',
};

Button.propTypes = {
  disabled: PropTypes.bool,
  content: PropTypes.any.isRequired,
  variant: PropTypes.string.isRequired,
  size: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';

const Card = ({children, type}) => {
  return (
      <div className={ type }>
        {children}
      </div>
  );
};

Card.propTypes = {
 type: PropTypes.string.isRequired,
};

export default Card;

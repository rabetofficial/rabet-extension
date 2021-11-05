import React from 'react';
import shortid from 'shortid';

import ShowOperation from './ShowOperation';

const Operations = ({ operations }) => (
  <>
    {operations.map((operation, index) => (
      <ShowOperation operation={operation} key={shortid.generate()} index={index} />
    ))}
  </>
);

export default Operations;

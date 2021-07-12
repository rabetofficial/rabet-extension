import types from 'Root/actions';

/*

  Currencies:

  [
    {
      currency: 'USD',
      value: 0.30
    },
    {
      currency: 'ETH',
      value: 0.0000030
    },
  ]
*/

export default (state = [], action) => {
  switch (action.type) {
    case types.currencies.LOAD: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

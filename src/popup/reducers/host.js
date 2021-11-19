import types from '../actions';

/*
  Host instance:

  string
*/

export default (state = '', action) => {
  switch (action.type) {
    case types.host.CHANGE: {
      return action.host;
    }

    default: {
      return state;
    }
  }
};

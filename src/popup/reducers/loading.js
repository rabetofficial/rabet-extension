import types from '../actions';

/*
  Loading instance:
  {
    data: Boolean,
    currencies: Boolean
  }
*/

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.loading.LOAD_DATA: {
      return {
        ...state,
        data: true,
      };
    }

    default: {
      return state;
    }
  }
};

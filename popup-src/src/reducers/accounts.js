import types from 'Root/actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.accounts.ADD: {
      return [
        ...state,
        {
          address: 'an',
          privateKey: 'goh',
          active: true,
        },
      ];
    }

    case types.accounts.REMOVE: {
      return state;
    }

    case types.accounts.CHANGE_ACTIVE: {
      return state;
    }

    default: {
      return state;
    }
  }
}

import types from 'Root/actions';

const initialState = {
  logged: false,
  registered: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.user.LOGIN: {
      return {
        ...state,
        logged: true,
      }
    }

    case types.user.LOGOUT: {
      return {
        ...state,
        logged: false,
      }
    }

    case types.user.IS_REGISTERED: {
      return {
        ...state,
        registered: action.registered,
      }
    }

    default: {
      return state;
    }
  }
}

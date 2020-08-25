import types from 'Root/actions';

/*
  User instance:

  {
    registered: Boolean,
    logged: Boolean,
    password: String,
  }

*/

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
        password: action.password,
      }
    }

    case types.user.LOGOUT: {
      return {
        ...state,
        logged: false,
        password: null,
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

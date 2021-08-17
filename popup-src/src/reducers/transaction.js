import types from '../actions';

/*
  Transaction instance:

  {
    memo: {
      text: String,
      checked: true,
    },
    operations: [{
      id: String,
      type: String,
      values: {},
      errors: {},
    }]
  }

*/

const initialState = {
  memo: {
    text: '',
    checked: true,
  },
  operations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.transaction.ADD_OP: {
      const operations = [...state.operations, action.operation];

      return {
        ...state,
        operations,
      };
    }

    case types.transaction.REMOVE_OP: {
      const operations = [...state.operations];

      const newOperations = operations.filter((x) => x.id !== action.id);

      return {
        ...state,
        operations: newOperations,
      };
    }

    case types.transaction.CHANGE_OP: {
      const operations = [...state.operations];

      for (let i = 0; i < operations.length; i += 1) {
        if (operations[i].id === action.id) {
          operations[i] = {
            ...operations[i],
            ...action.values,
          };

          break;
        }
      }

      return {
        ...state,
        operations,
      };
    }

    case types.transaction.CLEAR_OP: {
      return {
        ...state,
        operations: [],
      };
    }

    case types.transaction.CLEAR_MEMO: {
      return {
        ...state,
        memo: {
          text: '',
          checked: true,
        },
      };
    }

    case types.transaction.ADD_MEMO: {
      return {
        ...state,
        memo: action.memo,
      };
    }

    default: {
      return state;
    }
  }
};

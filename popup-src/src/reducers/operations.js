import types from 'Root/actions';

/*
  Operations instance:

  [{
    id: String,
    type: String,
    values: {},
    errors: {},
  }]

*/

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.operations.ADD: {
      return [
        ...state,
        action.operation,
      ];
    }

    case types.operations.REMOVE: {
      const operations = [...state];

      const newOperations = operations.filter(x => x.id !== action.id);

      return newOperations;
    }

    case types.operations.CHANGE: {
      const operations = [...state];

      for (let i = 0; i < operations.length; i++) {
        if (operations[i].id === action.id) {
          operations[i] = {
            ...operations[i],
            ...action.values,
          };

          break;
        }
      }

      return operations;
    }

    case types.operations.CLEAR: {
      return [];
    }

    default: {
      return state;
    }
  }
}

import types from 'Root/actions';

export default (state = 0, action) => {
  switch (action.type) {
    case types.interval.START: {
      return action.interval;
    }

    case types.interval.STOP: {
      clearInterval(state);

      return 0;
    }

    default: {
      return state;
    }
  }
}

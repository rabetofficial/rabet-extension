import store from 'Root/store';
import types from 'Root/actions';

export default () => {
  store.dispatch({
    type: types.operations.CLEAR,
  });
}

import {
  clearMemo,
  clearOperations,
} from 'popup/reducers/transaction';

export default () => {
  clearMemo();
  clearOperations();
};

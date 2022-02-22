import store from 'popup/store';

import { closeModal } from 'popup/reducers/modal';

const openModalAction = () => {
  store.dispatch(closeModal());
};

export default openModalAction;

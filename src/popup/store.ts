import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducers from './reducers';

const store = configureStore({
  reducer: rootReducers,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

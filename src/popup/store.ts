import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducers from './reducers';

const store = configureStore({
  reducer: rootReducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

window.store = store;

export default store;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import usersReducer from '../features/userSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: customizedMiddleware,
});

export default store;

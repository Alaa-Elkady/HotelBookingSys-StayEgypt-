import { configureStore } from '@reduxjs/toolkit';
import guestReducer from './GuestSlice';

export const store = configureStore({
  reducer: {
    guest: guestReducer,
  },
});

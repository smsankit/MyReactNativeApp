import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from '../slice/counterSlice';
import authReducer from '../slice/authSlice';

export const Store = configureStore({
  reducer: {
    counter: CounterReducer,
    auth: authReducer,
  },
  // Middleware can be added here for logging, etc.
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../src/store/features/taskSlice';
import authReducer from '../src/store/features/authSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});

export default store;
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import messageReducer from '../features/messages/messageSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
});

export default rootReducer;

/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';
import isEmpty from '../../utils/validation/isEmpty';
import setAuthToken from '../../utils/setAuthToken';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    hasErrors: false,
    user: null,
    error: null,
  },
  reducers: {
    saveToken(state, action) {
      if (action.payload) {
        state.token = action.payload.token;
      }
    },
    clearUser: (state) => {
      state.isLoading = true;
    },
    loading: (state) => {
      state.isLoading = true;
    },
    setCurrentUser: (state, action) => {
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = action.payload;
    },
    logout(state) {
      state.user.token = null;
      state.user = {};
      state.isLoading = false;
      state.hasErrors = false;
      state.isAuthenticated = false;
      state.error = {};
    },
    setError(state, action) {
      state.isLoading = false;
      state.hasErrors = true;
      state.error = action.payload;
    },
  },
});

export const { loading, setCurrentUser, logout, setError, clearUser } = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;

export const authentication = (type, newUser) => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await axios.post(`https://epic-mail007.herokuapp.com/api/v1/auth/${type}`, newUser);
    console.log(response, 'n');
    if (response) {
      if (response.data.message === 'Login successful' || response.data.message === 'User created successfully') {
        console.log('data >> >> >>', response.data.data.user);
        // Save to local storage
        const { token } = response.data.data;

        // Set token to local storage
        localStorage.setItem('token', token);
        const decoded = jwtDecode(localStorage.token);
        console.log(decoded);
        // Set token to header
        setAuthToken(token);

        // Set current user
        dispatch(setCurrentUser(decoded));
      }
      return dispatch(setError(response.data.message));
    }
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  dispatch(clearUser());
  localStorage.removeItem('token');
  // Remove auth header for future request
  setAuthToken(null);
  // set current user and is Authenticated to false
  dispatch(logout());
  window.location.href = '/';
};

import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './actionTypes';
import { url } from '../utils/url';
import { errorHandler } from '../utils/errorHandler';
import setAuthToken from '../utils/setAuthToken';

export const loading = () => ({
  type: REGISTER_REQUEST,
});

export const signupSuccess = user => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const signupFailure = error => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const register = user => async (dispatch) => {
  try {
    dispatch(loading());
    const response = await axios.post(`${url}/auth/signup`, user);
    if (response) {
      const userDetails = response.data.data[0];
      const token = userDetails.userToken;

      localStorage.setItem('token', token);
      dispatch(signupSuccess(userDetails));
    }
  } catch (error) {
    const errorResponse = errorHandler(error);
    dispatch(signupFailure(errorResponse.response));
  }
};

export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('token');
  // Remove auth header for future request
  setAuthToken(false);
  // set current user and is Authenticated to false
  dispatch(signupSuccess({}));
  window.location.href = '/';
};

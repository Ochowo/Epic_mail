/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import isEmpty from '../../utils/validation/isEmpty';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    isLoading: false,
    hasErrors: false,
    data: null,
    error: null,
    close: true,
    sent: false,
    open: false,
    messages: null,
  },
  reducers: {
    getInbox: (state, action) => {
      state.isLoading = false;
      state.inbox = action.payload;
    },
    loading: (state) => {
      state.isLoading = true;
      state.data = null;
    },
    getMessages: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    composeMessage: (state, action) => {
      state.isLoading = false;
      state.data = null;
    },
    setError(state, action) {
      state.isLoading = false;
      state.hasErrors = true;
      state.error = action.payload;
    },
    closeModal(state) {
      state.close = true;
      state.sent = false;
      state.open = false;
    },
    openModal(state) {
      state.close = false;
      state.open = true;
    },
    messageSent(state) {
      state.sent = true;
    },
  },
});

export const {
  loading, getMessages, composeMessage, setError, closeModal, messageSent, openModal, getInbox,
} = messageSlice.actions;
export const messageSelector = (state) => state.message;
export default messageSlice.reducer;

export const postMessage = (folder, msg) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axios.post(`https://epic-mail007.herokuapp.com/api/v1/messages?type=${folder}`, msg);
    if (response) {
      console.log('dara >> >> >>', response);
      const message = response.data.data;

      // Set current user
      dispatch(composeMessage(message));
      dispatch(messageSent());
      setTimeout(() => { dispatch(closeModal()); }, 5000);
    }
  } catch (error) {
    dispatch(setError(error));
  }
};

export const getMessage = (path) => async (dispatch) => {
  dispatch(loading());
  try {
    const baseUrl = 'https://epic-mail007.herokuapp.com/api/v1';
    const url = `${baseUrl}${path}`;
    console.log(url, 'df')
    const response = await axios.get(url);
    console.log(response.data.data, 'fg');
    if (response) {
      if (response.message === 'Message not found') {
        dispatch(getMessages(null));
      } else {
        console.log('daTa >> >> >>', typeof (response));
        const message = response.data.data;

        // Set current user
        const val = getMessages(message);
        dispatch(getMessages(message));
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};

import axios from 'axios';
import {
  MESSAGE_FAILURE,
  COMPOSE_MESSAGE,
  INIT_MESSAGE,
  MESSAGE_SENT,
  END_COMPOSE_MESSAGE,
  CLOSE_MODAL,
} from './actionTypes';
import { url } from '../utils/url';
import { errorHandler } from '../utils/errorHandler';

const token = localStorage.getItem('token');

export const initMessages = () => ({
  type: INIT_MESSAGE,
});

export const createMessages = message => ({
  type: COMPOSE_MESSAGE,
  payload: message,
});

export const messageFailure = error => ({
  type: MESSAGE_FAILURE,
  payload: error,
});

export const messageSent = () => ({
  type: MESSAGE_SENT,
});
export const closeModal = () => ({
  type: CLOSE_MODAL,
});
// eslint-disable-next-line import/prefer-default-export
export const postMessages = data => async (dispatch) => {
  const config = {
    headers: {
      token,
    },
  };
  try {
    dispatch(initMessages());
    const message = await axios.post(
      `${url}/messages`,
      data,
      config,
    );
    if (message) {
      dispatch(createMessages(message.data));
      dispatch(messageSent());
      dispatch({ type: END_COMPOSE_MESSAGE });
    }
  } catch (error) {
    const errorResponse = errorHandler(error);
    dispatch(messageFailure(errorResponse.response));
  }
};

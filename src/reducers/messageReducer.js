import {
  COMPOSE_MESSAGE,
  INIT_MESSAGE,
  MESSAGE_SENT,
  END_COMPOSE_MESSAGE,
  CLOSE_MODAL,
  MESSAGE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  message: [],
  isSent: false,
  isLoading: false,
  closeModal: false,
  error: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case INIT_MESSAGE:
      return Object.assign({}, state, { isLoading: true });
    case COMPOSE_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload,
        isLoading: false,
      });
    case MESSAGE_SENT:
      return Object.assign({}, state, {
        isSent: true,
        error: null,
        message: [],
      });
    case END_COMPOSE_MESSAGE:
      return {
        ...state,
        error: null,
        message: [],
        isSent: false,
      };
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        closeModal: true,
      });
    case MESSAGE_FAILURE:
      return Object.assign({}, state, {
        error: action.payload,
        isLoading: false,
      });
    default:
      return state;
  }
}

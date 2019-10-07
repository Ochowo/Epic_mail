import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  error: null,
  user: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return Object.assign({}, state, { loading: true });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loading: false,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        error: action.payload,
        loading: false,
      });
    default:
      return state;
  }
};

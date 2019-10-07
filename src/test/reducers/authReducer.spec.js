import authReducer from '../../reducers/authReducer';
import { loading, signupSuccess, signupFailure } from '../../actions/authAction';

let action;
let newState;
const state = {
  isAuthenticated: false,
  error: null,
  user: {},
  loading: false,
};

const newUser = {
  firstName: 'ochowo',
  lastName: 'haruna',
  userName: 'ooche',
  email: 'ochowoharuhhhnaa@gmail.com',
  password: 'passwordd',
  confirmPassword: 'passwordd',
};

describe('Auth Reducer', () => {
  it('should return initial State', () => {
    const initialState = authReducer(undefined, {});
    expect(initialState).toEqual(state);
  });


  it('should handle action type REGISTER_REQUEST', () => {
    action = loading();
    newState = authReducer(state, action);
    expect(newState).not.toEqual(state, action);
    expect(newState.user).not.toEqual(undefined);
    expect(newState.isAuthenticated).toEqual(false);
  });

  it('should handle action type REGISTER_SUCCESS', () => {
    action = signupSuccess(newUser);
    newState = authReducer(state, action);
    expect(newState).not.toEqual(state, action);
    expect(newState.user).not.toEqual(undefined);
    expect(newState.isAuthenticated).toEqual(true);
  });
  it('should handle action type REGISTER_FAILURE', () => {
    action = signupFailure({});
    newState = authReducer(state, action);
    expect(newState).not.toEqual(state, action);
    expect(newState.isAuthenticated).toEqual(false);
  });
});

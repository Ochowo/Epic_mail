import { mock, mockStore } from '../../../mocks/mockConfig';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../../actions/actionTypes';
import { register, login, loading, signupFailure, signupSuccess, logoutUser } from '../../actions/authAction';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNCwiZW1haWwiOiJhbWF6aW5nZ3JhY2VAZ21haWwuY29tIiwiaWF0IjoxNTcwMTIyMjIzLCJleHAiOjE1NzAyMDg2MjN9.ssWs_0PaQUQLaVEF_mZ9RKz_S-_Oyf2cvQpfzlugN_A';

const store = mockStore({
  isAuthenticated: false,
  error: null,
  user: {},
  loading: false,
});
const mockUser = {
  firstName: 'Ochowo',
  lastName: 'Jones',
  userName: 'gr',
  email: 'princess@gmail.com',
  password: 'password',
  confirmPassword: 'password',
};


const history = { push: jest.fn() };

describe('authActionTypes', () => {
  test('authenticating', () => {
    const auth = loading();

    expect(auth).toEqual({ type: REGISTER_REQUEST });
  });
  test('signupSuccess', () => {
    const auth = signupSuccess(mockUser);

    expect(auth).toEqual({ type: REGISTER_SUCCESS, payload: mockUser });
  });

  test('signupFailure', () => {
    const auth = signupFailure('error');

    expect(auth).toEqual({ type: REGISTER_FAILURE, payload: 'error' });
  });
});

describe('authActions', () => {
  it('should dispatch loading and signupSuccess on succesful login', (done) => {
    const expectedActions = [REGISTER_REQUEST, REGISTER_SUCCESS];
    mock.onPost().replyOnce(201, {
      data: [
        {
          id: 24,
          firstName: 'ochowo',
          lastName: 'Jones',
          email: 'princess@gmail.com',
          userName: 'gr',

          token,
        },
      ],
    });
    return store.dispatch(register(mockUser, history)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });

  it('should return an error when user details are empty', (done) => {
    const errorMessage = 'This username is already in use';
    mock.onPost().replyOnce(409, { message: errorMessage });
    return store.dispatch(register({})).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes[0]).toEqual('USERS_REGISTER_REQUEST');
      done();
    });
  });
  it('should dispatch loading and signupSuccess on succesful login', (done) => {
    mock.onPost().replyOnce(200, {
      data: [
        {
          id: 24,
          firstName: 'ochowo',
          lastName: 'Jones',
          email: 'princess@gmail.com',
          userName: 'gr',

          token,
        },
      ],
    });
    return store.dispatch(login(mockUser, history)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toBe('USERS_REGISTER_REQUEST');
      done();
    });
  });
  it('should return an error when user details are empty', (done) => {
    const errorMessage = 'This username is already in use';
    mock.onPost().replyOnce(409, { message: errorMessage });
    return store.dispatch(login({})).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes[0]).toEqual('USERS_REGISTER_REQUEST');
      done();
    });
  });
});
describe('logout action creator', () => {
  it('should return an error when user details are empty', (done) => {
    store.dispatch(logoutUser());
    expect(localStorage.getItem('token')).toEqual(null);
    done();
  });
});

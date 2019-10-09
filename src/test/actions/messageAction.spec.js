import { mock, mockStore } from '../../../mocks/mockConfig';
import {
  MESSAGE_FAILURE,
  COMPOSE_MESSAGE,
  INIT_MESSAGE,
  MESSAGE_SENT,
  END_COMPOSE_MESSAGE,
  CLOSE_MODAL,
} from '../../actions/actionTypes';
import { initMessages, createMessages, messageFailure, messageSent, postMessages } from '../../actions/messageAction';

const store = mockStore({});
const mockMsg = {
  receiverEmail: 'pricjhgess@gmail.com',
  subject: 'password',
  message: 'password',
};

const token = 'token';
const history = { push: jest.fn() };

describe('authActionTypes', () => {
  test('initMessage', () => {
    const msg = initMessages();

    expect(msg).toEqual({ type: INIT_MESSAGE });
  });
  test('createMessage', () => {
    const auth = createMessages(mockMsg);

    expect(auth).toEqual({ type: COMPOSE_MESSAGE, payload: mockMsg });
  });

  test('messageFailure', () => {
    const auth = messageFailure('error');

    expect(auth).toEqual({ type: MESSAGE_FAILURE, payload: 'error' });
  });
  test('messageSent', () => {
    const auth = messageSent('error');

    expect(auth).toEqual({ type: MESSAGE_SENT });
  });
});
describe('messageAction', () => {
  it('should dispatch initMessages, createMessages, messagesent and endcomposemessage on succesful login', (done) => {
    const expectedActions = [INIT_MESSAGE, COMPOSE_MESSAGE, MESSAGE_SENT, END_COMPOSE_MESSAGE];
    mock.onPost().replyOnce(201, {
      data: [
        {
          id: 24,
          receiverEmail: 'pricjhgess@gmail.com',
          subject: 'password',
          message: 'password',
        },
      ],
    });
    return store.dispatch(postMessages(mockMsg, history)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch messageFailure', (done) => {
    mock.onPost().replyOnce(400);
    return store.dispatch(postMessages({})).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes[0]).toEqual(INIT_MESSAGE);
      done();
    });
  });
});

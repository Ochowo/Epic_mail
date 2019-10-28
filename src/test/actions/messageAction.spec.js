import { mock, mockStore } from '../../../mocks/mockConfig';
import {
  MESSAGE_FAILURE,
  COMPOSE_MESSAGE,
  INIT_MESSAGE,
  MESSAGE_SENT,
  END_COMPOSE_MESSAGE,
  GET_MESSAGES,
} from '../../actions/actionTypes';
import { initMessages, createMessages, messageFailure, getMessages, messageSent, postMessages, fetchMessages } from '../../actions/messageAction';

const store = mockStore({});
const mockMsg = {
  receiverEmail: 'pricjhgess@gmail.com',
  subject: 'password',
  message: 'password',
};

const inbox = {
  email: 'haruna@gmail.com',
  message: 'mmmm',
  messageid: 99,
  parentmessageid: null,
  receiverid: 16,
  ruserlastname: 'haruna',
  rusername: 'ochowo',
  senderid: 16,
  sfirstname: 'ochowo',
  slastname: 'haruna',
  status: 'unread',
  subject: 'nnn',
};
const history = { push: jest.fn() };

describe('messageActionTypes', () => {
  test('initMessage', () => {
    const msg = initMessages();

    expect(msg).toEqual({ type: INIT_MESSAGE });
  });
  test('createMessage', () => {
    const msg = createMessages(mockMsg);

    expect(msg).toEqual({ type: COMPOSE_MESSAGE, payload: mockMsg });
  });

  test('getMessages', () => {
    const msg = getMessages(inbox);

    expect(msg).toEqual({ type: GET_MESSAGES, payload: inbox });
  });

  test('messageFailure', () => {
    const msg = messageFailure('error');

    expect(msg).toEqual({ type: MESSAGE_FAILURE, payload: 'error' });
  });
  test('messageSent', () => {
    const msg = messageSent('error');

    expect(msg).toEqual({ type: MESSAGE_SENT });
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
  it('call get message action success', (done) => {
    mock.onPost().replyOnce(200);
    store
      .dispatch(fetchMessages())
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(8);
      });
    done();
  });
});

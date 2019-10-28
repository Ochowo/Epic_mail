import messageReducer from '../../reducers/messageReducer';
import { initMessages, createMessages, messageFailure, messageSent, getMessages } from '../../actions/messageAction';

let action;
let newState;
const state = {
  message: [],
  isSent: false,
  isLoading: false,
  closeModal: false,
  error: null,
};
const data = {
  receiverEmail: 'ochowoharuhhhnaa@gmail.com',
  subject: 'passwordd',
  message: 'passwordd',
};

describe('Messages Reducer', () => {
  it('should return initial State', () => {
    const initialState = messageReducer(undefined, {});
    expect(initialState).toEqual(state);
  });
  it('should handle action type INIT_MESSAGE', () => {
    action = initMessages();
    newState = messageReducer(state, action);
    expect(newState).not.toEqual(state, action);
    expect(newState.message).not.toEqual(undefined);
    expect(newState.isLoading).toEqual(true);
  });
  it('should handle action type COMPOSE_MESSAGE', () => {
    action = createMessages(data);
    newState = messageReducer(state, action);
    expect(newState).not.toEqual(state, action);
    expect(newState.message).not.toEqual(undefined);
    expect(newState.isLoading).toEqual(false);
  });
  it('should handle action type GET_MESSAGES', () => {
    action = getMessages(data);
    newState = messageReducer(state, action);
    expect(newState).not.toEqual(state, action);
    expect(newState.message).not.toEqual(undefined);
    expect(newState.isLoading).toEqual(false);
  });
  it('should handle action type MESSAGE_SENT', () => {
    action = messageSent();
    newState = messageReducer(state, action);
    expect(newState).not.toEqual(state, action);
    expect(newState.isLoading).toEqual(false);
  });
  it('should handle action type MESSAGE_FAILURE', () => {
    action = messageFailure();
    newState = messageReducer(state, action);
    expect(newState).not.toEqual(state, action);
    expect(newState.isLoading).toEqual(false);
  });
  it('should handle action type END_COMPOSE_MESSAGE', () => {
    newState = messageReducer(state, {
      type: 'END_COMPOSE_MESSAGE',
    });
    expect(newState).toEqual(state, action);
    expect(newState.isSent).toEqual(false);
  });
  it('should handle action type CLOSE_MODAL', () => {
    newState = messageReducer(state, {
      type: 'CLOSE_MODAL',
    });
    expect(newState).not.toEqual(state, action);
    expect(newState.closeModal).toEqual(true);
  });
});

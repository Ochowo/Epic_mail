import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ComposeMessage } from '../../views/composeMessage/composeMessage';


const historyMock = { push: jest.fn() };

const props = {
  message: {},
  errors: {},
  MessageAction: () => {},
};
const setUp = () => {
  const component = shallow(<ComposeMessage {...props} history={historyMock} />);
  return component;
};
describe('Compose message component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
    sinon.spy(ComposeMessage.prototype, 'onChange');
    sinon.spy(ComposeMessage.prototype, 'onSubmit');
  });
  afterEach(() => {
    ComposeMessage.prototype.onChange.restore();
    ComposeMessage.prototype.onSubmit.restore();
  });
  it('should render without errors', () => {
    component.setProps({ isAuthenticated: true });
    expect(component).toMatchSnapshot();
  });
  it('ensure onchange is called for email', (done) => {
    const form = component.find('#email3');
    const event = {
      target: {
        name: 'receiverEmail',
        value: 'test@gmail.com',
      },
    };
    expect(form.length).toBe(1);
    form.simulate('change', event);
    expect(ComposeMessage.prototype.onChange.called).toBe(true);
    done();
  });

  it('ensure onchange is called for subject', (done) => {
    const form = component.find('#subject');
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'subject',
        value: 'password',
      },
    };
    expect(form.length).toBe(1);
    form.simulate('change', event);
    expect(ComposeMessage.prototype.onChange.called).toBe(true);
    done();
  });

  it('ensure onchange is called for message', (done) => {
    const form = component.find('#message');
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'message',
        value: 'password',
      },
    };
    expect(form.length).toBe(1);
    form.simulate('change', event);
    expect(ComposeMessage.prototype.onChange.called).toBe(true);
    done();
  });
});

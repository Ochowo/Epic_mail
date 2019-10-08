import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SignIn } from '../../views/signin/signIn';

const historyMock = { push: jest.fn() };
const props = {
  registerAction: () => {},
  auth: {},
  errors: {},
};

const setUp = () => {
  const wrapper = shallow(<SignIn {...props} history={historyMock} />);
  return wrapper;
};
describe('Signin component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
    sinon.spy(SignIn.prototype, 'onChange');
    sinon.spy(SignIn.prototype, 'onSubmit');
    sinon.spy(SignIn.prototype, 'showForm');
  });
  afterEach(() => {
    SignIn.prototype.onChange.restore();
    SignIn.prototype.onSubmit.restore();
    SignIn.prototype.showForm.restore();
  });
  it('should render without errors', () => {
    component.setProps({ isAuthenticated: true });
    expect(component).toMatchSnapshot();
  });
  it('ensure onchange is called for email', (done) => {
    const form = component.find('#email3');
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'email',
        value: 'test@gmail.com',
      },
    };
    expect(form.length).toBe(1);
    form.simulate('change', event);
    expect(SignIn.prototype.onChange.called).toBe(true);
    done();
  });
  it('ensure onchange is called for password', (done) => {
    const form = component.find('#pass3');
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'password',
        value: 'password',
      },
    };
    expect(form.length).toBe(1);
    form.simulate('change', event);
    expect(SignIn.prototype.onChange.called).toBe(true);
    done();
  });
  it('should handle onSubmit', (done) => {
    const fakeEvent = { preventDefault: () => ({}) };
    const submitForm = component
      .find('#bxx');
    const btn = component
      .find('.logbtn');
    expect(submitForm.length).toBe(1);
    expect(btn.length).toBe(1);
    submitForm.simulate('submit', fakeEvent);
    expect(SignIn.prototype.onSubmit.called).toBe(true);
    done();
  });
  it('should call the showForm method', () => {
    // const FormSpy = jest.spyOn(component.instance(), 'showForm');
    const form = component.find('#loggg');
    expect(form.length).toBe(1);
    form.simulate('click');
    component.instance().showForm();
    expect(SignIn.prototype.showForm.called).toBe(true);
  });
});

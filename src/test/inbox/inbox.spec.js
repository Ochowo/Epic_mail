import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Inbox from '../../views/Inbox/inbox';

const setUp = () => {
  const component = shallow(<Inbox />);
  return component;
};

describe('InboxMsg message component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
    sinon.spy(Inbox.prototype, 'openModalHandler');
    sinon.spy(Inbox.prototype, 'closeModalHandler');
  });
  afterEach(() => {
    Inbox.prototype.openModalHandler.restore();
    Inbox.prototype.closeModalHandler.restore();
  });
  it('should render without errors', () => {
    expect(component).toMatchSnapshot();
  });
  it('should call the openModalHandler method', () => {
    // const FormSpy = jest.spyOn(component.instance(), 'showForm');
    const form = component.find('#create');
    expect(form.length).toBe(1);
    form.simulate('click');
    component.instance().openModalHandler();
  });
});

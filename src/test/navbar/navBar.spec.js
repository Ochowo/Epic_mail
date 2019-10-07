import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Header } from '../../components/navbar/navBar';
import { mockStore } from '../../../mocks/mockConfig';

const store = mockStore({ auth: {} });
const logoutMock = {
  preventDefault: () => ({}),
  logoutUser: jest.fn(),
};

const props = {
  logoutUser: () => {},
  auth: {
    isAuthenticated: true,
  },
  store,
};
const setUp = () => {
  const component = shallow(<Header {...props} store={store} />);
  return component;
};
describe('Navbar component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
    sinon.spy(Header.prototype, 'onLogoutClick');
  });
  afterEach(() => {
    Header.prototype.onLogoutClick.restore();
  });
  it('should render without errors', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render correctly', (done) => {
    expect(component.find('header').length).toBe(1);
    done();
  });
  it('ensure logout', (done) => {
    const logout = component.find('.logout');
    expect(logout.length).toBe(1);
    logout.simulate('click', logoutMock);
    done();
  });
});

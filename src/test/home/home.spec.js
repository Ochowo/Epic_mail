import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from '../../views/home/home';
import { mockStore } from '../../../mocks/mockConfig';

const store = mockStore({ auth: {} });
const props = {
  registerAction: () => {},
  auth: {
    isAuthenticated: true,
  },
  errors: {},
};
const setUp = () => {
  const component = shallow(<HomePage {...props} store={store} />);
  return component;
};
describe('Home component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('should render without errors', () => {
    expect(component).toMatchSnapshot();
  });
});

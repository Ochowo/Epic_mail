import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../components/logo/logo';

const setUp = () => {
  const component = shallow(<Logo />);
  return component;
};
describe('Logo component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('should render without errors', () => {
    expect(component).toMatchSnapshot();
  });
});

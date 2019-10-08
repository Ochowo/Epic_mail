import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../views/home/home';

const setUp = () => {
  const component = shallow(<Home />);
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

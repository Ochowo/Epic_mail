import React from 'react';
import { shallow } from 'enzyme';
import Title from '../../components/title/title';

const setUp = (props = {}) => {
  const component = shallow(<Title {...props} title="create an account" />);
  return component;
};
describe('Title component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('should render without errors', () => {
    expect(component).toMatchSnapshot();
  });
  it('should render children', () => {
    const wrapper = component.find('h2');
    expect(wrapper.find('.heading').exists()).toBe(true);
  });
});

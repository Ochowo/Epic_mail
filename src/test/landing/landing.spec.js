import React from 'react';
import { shallow } from 'enzyme';
import Landing from '../../components/landing/landing';

const setUp = () => {
  const component = shallow(<Landing />);
  return component;
};
describe('Landing component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('should render without errors', () => {
    expect(component).toMatchSnapshot();
  });
});

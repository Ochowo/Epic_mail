import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/footer/footer';

const setUp = () => {
  const component = shallow(<Footer />);
  return component;
};
describe('Footer component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('should render without errors', () => {
    expect(component).toMatchSnapshot();
  });
});

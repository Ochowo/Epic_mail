import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../components/input/input';

const props = {
  className: 'input',
  type: 'text',
};
const setUp = () => {
  const component = shallow(<Input {...props} title="create an account" />);
  return component;
};
describe('Input component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('should render without errors', () => {
    expect(component).toMatchSnapshot();
  });
});

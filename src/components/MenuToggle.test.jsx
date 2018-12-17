import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { MenuToggle } from './MenuToggle';

describe('MenuToggle', () => {
  it('renders markup correctly', () => {
    const wrapper = <MenuToggle>Hello</MenuToggle>;
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should create a isOpen className', () => {
    const wrapper = shallow(<MenuToggle isOpen={true}>Hello</MenuToggle>);
    expect(wrapper.prop('className')).toContain('menu-toggle--open');
  });

  it('click event works', () => {
    const callback = jest.fn();
    const wrapper = mount(<MenuToggle onClick={callback}>Hi</MenuToggle>);
    wrapper.simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

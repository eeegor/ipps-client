import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { Button } from './Button';

describe('Button', () => {
  it('renders markup correctly', () => {
    const wrapper = <Button>Hello</Button>;
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should adopt a className', () => {
    const wrapper = shallow(
      <Button className="custom-class-name">Hello</Button>
    );
    expect(wrapper.prop('className')).toContain('custom-class-name');
  });

  it('should adopt a color', () => {
    const wrapper = shallow(<Button color="primary">Hello</Button>);
    expect(wrapper.prop('className')).toContain('button--primary');
  });

  it('click event works', () => {
    const callback = jest.fn();
    const wrapper = mount(<Button onClick={callback}>Hi</Button>);
    wrapper.find('button').simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

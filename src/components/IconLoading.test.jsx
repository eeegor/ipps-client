import React from 'react';
import { shallow } from 'enzyme';
import { IconLoading } from './IconLoading';

describe('IconLoading', () => {
  it('should adopt proper size', () => {
    const color = '#333';
    const wrapper = shallow(<IconLoading color={color} />);
    expect(wrapper.find('svg').prop('width')).toBe(240);
    expect(wrapper.find('svg').prop('height')).toBe(240);
    expect(
      wrapper
        .find('svg')
        .find('path')
        .prop('fill')
    ).toBe(color);
  });

  it('should adopt proper size', () => {
    const wrapper = shallow(<IconLoading size={60} />);
    expect(wrapper.find('svg').prop('width')).toBe(60);
    expect(wrapper.find('svg').prop('height')).toBe(60);
  });
});

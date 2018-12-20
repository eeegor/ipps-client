import React from 'react';
import { shallow } from 'enzyme';
import { IconLogo } from './IconLogo';

describe('IconLogo', () => {
  it('should adopt proper size', () => {
    const color = '#333';
    const wrapper = shallow(<IconLogo color={color} />);
    expect(wrapper.find('svg').prop('width')).toBe(200);
    expect(wrapper.find('svg').prop('height')).toBe(75);
    expect(
      wrapper
        .find('svg')
        .find('path')
        .prop('fill')
    ).toBe(color);
  });

  it('should adopt proper size', () => {
    const wrapper = shallow(<IconLogo width={120} height={60} />);
    expect(wrapper.find('svg').prop('width')).toBe(120);
    expect(wrapper.find('svg').prop('height')).toBe(60);
    expect(
      wrapper
        .find('svg')
        .find('path')
        .prop('fill')
    ).toBe('#29c');
  });
});

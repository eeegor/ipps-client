import React from 'react';
import { shallow } from 'enzyme';
import { IconError } from './IconError';

describe('IconError', () => {
  it('should adopt proper size', () => {
	const color = '#333';
    const wrapper = shallow(<IconError color={color} />);
    expect(wrapper.find('svg').prop('width')).toBe(240);
    expect(wrapper.find('svg').prop('height')).toBe(240);
    expect(wrapper.find('svg').find('path').prop('fill')).toBe(color);
  });

  it('should adopt proper size', () => {
    const wrapper = shallow(<IconError size={60} />);
    expect(wrapper.find('svg').prop('width')).toBe(60);
	expect(wrapper.find('svg').prop('height')).toBe(60);
	expect(wrapper.find('svg').find('path').prop('fill')).toBe('#29c');
  });
});

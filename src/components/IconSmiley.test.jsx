import React from 'react';
import { shallow } from 'enzyme';
import { IconSmiley } from './IconSmiley';

describe('IconSmiley', () => {
  it('should adopt proper size', () => {
	const color = '#333';
    const wrapper = shallow(<IconSmiley color={color} />);
    expect(wrapper.find('svg').prop('width')).toBe(240);
    expect(wrapper.find('svg').prop('height')).toBe(240);
    expect(wrapper.find('svg').find('path').first().prop('fill')).toBe(color);
    expect(wrapper.find('svg').find('path').last().prop('fill')).toBe(color);
    expect(wrapper.find('svg').find('circle').first().prop('fill')).toBe(color);
    expect(wrapper.find('svg').find('circle').last().prop('fill')).toBe(color);
  });

  it('should adopt proper size', () => {
    const wrapper = shallow(<IconSmiley size={60} />);
    expect(wrapper.find('svg').prop('width')).toBe(60);
	expect(wrapper.find('svg').prop('height')).toBe(60);
	expect(wrapper.find('svg').find('path').first().prop('fill')).toBe('#29c');
	expect(wrapper.find('svg').find('path').last().prop('fill')).toBe('#29c');
	expect(wrapper.find('svg').find('circle').first().prop('fill')).toBe('#29c');
    expect(wrapper.find('svg').find('circle').last().prop('fill')).toBe('#29c');
  });
});

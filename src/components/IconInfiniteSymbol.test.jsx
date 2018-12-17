import React from 'react';
import { shallow } from 'enzyme';
import { IconInfiniteSymbol } from './IconInfiniteSymbol';

describe('IconInfiniteSymbol', () => {
  it('should adopt proper size', () => {
    const wrapper = shallow(<IconInfiniteSymbol />);
    expect(wrapper.find('svg').prop('width')).toBe(240);
    expect(wrapper.find('svg').prop('height')).toBe(240);
  });

  it('should adopt proper size', () => {
    const wrapper = shallow(<IconInfiniteSymbol size={60} />);
    expect(wrapper.find('svg').prop('width')).toBe(60);
    expect(wrapper.find('svg').prop('height')).toBe(60);
  });
});

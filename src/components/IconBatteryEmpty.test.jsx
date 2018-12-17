import React from 'react';
import { shallow } from 'enzyme';
import { IconBatteryEmpty } from './IconBatteryEmpty';

describe('IconBatteryEmpty', () => {
  it('should adopt proper size', () => {
    const wrapper = shallow(<IconBatteryEmpty />);
    expect(wrapper.find('svg').prop('width')).toBe(240);
    expect(wrapper.find('svg').prop('height')).toBe(240);
  });

  it('should adopt proper size', () => {
    const wrapper = shallow(<IconBatteryEmpty size={60} />);
    expect(wrapper.find('svg').prop('width')).toBe(60);
    expect(wrapper.find('svg').prop('height')).toBe(60);
  });
});

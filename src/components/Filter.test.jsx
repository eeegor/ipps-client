import React from 'react';
import { mount } from 'enzyme';
import { Filter } from './Filter';

describe('Filter', () => {
  it('should handle onChange event', () => {
    const callback = jest.fn();
    const wrapper = mount(<Filter onChange={callback} />);
    wrapper
      .find('#provider_state')
      .first()
      .simulate('change');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

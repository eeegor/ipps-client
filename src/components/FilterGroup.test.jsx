import React from 'react';
import { mount } from 'enzyme';
import { FilterGroup } from './FilterGroup';

describe('FilterGroup', () => {
  it('should handle onChange event', () => {
    const callback = jest.fn();
    const wrapper = mount(<FilterGroup onChange={callback} />);
    wrapper
      .find('.filter-group')
      .find('input')
      .first()
      .simulate('change');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

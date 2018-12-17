import React from 'react';
import { mount } from 'enzyme';
import { Filter } from './Filter';

describe('Filter', () => {
  it('should handle onChange event', () => {
    const callback = jest.fn();
    const wrapper = mount(<Filter onChange={callback} />);

    wrapper.find('input[name="page"]').simulate('change');
    wrapper.find('input[name="per_page"]').simulate('change');
    wrapper.find('input[name="min_discharges"]').simulate('change');
    wrapper.find('input[name="max_discharges"]').simulate('change');
    wrapper
      .find('input[name="min_average_covered_charges"]')
      .simulate('change');
    wrapper
      .find('input[name="max_average_covered_charges"]')
      .simulate('change');
    wrapper
      .find('input[name="min_average_medicare_payments"]')
      .simulate('change');
    wrapper
      .find('input[name="max_average_medicare_payments"]')
      .simulate('change');
    wrapper
      .find('#provider_state')
      .first()
      .simulate('change');

    expect(callback).toHaveBeenCalledTimes(9);
  });

  it('should handle onApplyFilter event', () => {
    const callback = jest.fn();
    const wrapper = mount(<Filter onApplyFilter={callback} />);
    wrapper
      .find('form')
      .first()
      .simulate('submit');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle default values', () => {
    const wrapper = mount(
      <Filter filterData={{ min_average_covered_charges: '123' }} />
    );
    expect(
      wrapper
        .find('input[name="min_average_covered_charges"]')
        .prop('defaultValue')
    ).toEqual('123');
  });
});

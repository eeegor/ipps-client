import React from 'react';
import { mount } from 'enzyme';
import { Filter } from './Filter';

const filterData = {
  page: 1,
  per_page: 20
};

describe('Filter', () => {
  it('should mount', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Filter filterData={filterData} onChange={callback} />
    );
    expect(wrapper).toBeTruthy();
  });
  it('should handle onChange event', () => {
    const callback = jest.fn();
    const wrapper = mount(<Filter filterData={filterData} onChange={callback} />);

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
      .simulate('change', {target: { value : 'tx'}});

    expect(callback).toHaveBeenCalledTimes(9);
    expect(wrapper.find('#provider_state').first().value('TX')).toEqual(true);
  });

  it('should handle onSubmit event', () => {
    const callback = jest.fn();
    const wrapper = mount(<Filter filterData={filterData} onSubmit={callback} />);
    wrapper
      .find('form')
      .first()
      .simulate('submit');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

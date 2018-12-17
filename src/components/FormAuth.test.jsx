import React from 'react';
import { mount } from 'enzyme';
import { FormAuth } from './FormAuth';

describe('FormAuth', () => {
  it('should handle onChange event', () => {
    const callback = jest.fn();
    const wrapper = mount(<FormAuth onChange={callback} />);
    wrapper
      .find('.form-auth__input-group')
      .find('input')
      .first()
      .simulate('change');
    expect(callback).toHaveBeenCalledTimes(1);
    wrapper
      .find('.form-auth__input-group')
      .find('input')
      .last()
      .simulate('change');
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should handle onSubmit event', () => {
    const callback = jest.fn();
    const wrapper = mount(<FormAuth onSubmit={callback} />);
    wrapper
      .find('form')
      .first()
      .simulate('submit');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle onGotoAuth event', () => {
    const callback = jest.fn();
    const wrapper = mount(<FormAuth type="login" onGotoAuth={callback} />);
    wrapper
      .find('.form-auth__links-group')
      .find('a')
      .first()
      .simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle default values', () => {
    const wrapper = mount(<FormAuth formData={{}} />);
    wrapper.find('.input--email');
    expect(wrapper).toBeTruthy();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { Auth } from './Auth';

describe('Auth', () => {
  // it('should return null on bad params', () => {
  //   const wrapper = mount(<Auth />);
  //   expect(wrapper.html()).toEqual(null);
  // });

  it('onSignup event works', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Auth showAuthForm="signup" isAuth={false} onSignup={callback} />
    );
    wrapper
      .find('.form-auth--signup')
      .find('.form-auth__form')
      .simulate('submit');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('onSetFormAuthField event works for signup', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Auth
        showAuthForm="signup"
        isAuth={false}
        onSetFormAuthField={callback}
      />
    );
    wrapper.find('.input--email').simulate('change');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('onGotoAuth event works for signup', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Auth showAuthForm="signup" isAuth={false} onGotoAuth={callback} />
    );
    wrapper
      .find('.form-auth__links-group')
      .find('a')
      .simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('onLogin event works', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Auth showAuthForm="login" isAuth={false} onLogin={callback} />
    );
    wrapper
      .find('.form-auth--login')
      .find('.form-auth__form')
      .simulate('submit');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('onSetFormAuthField event works for login', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Auth showAuthForm="login" isAuth={false} onSetFormAuthField={callback} />
    );
    wrapper.find('.input--email').simulate('change');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('onGotoAuth event works for login', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Auth showAuthForm="login" isAuth={false} onGotoAuth={callback} />
    );
    wrapper
      .find('.form-auth__links-group')
      .find('a')
      .simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders markup correctly', () => {
    const wrapper = <Sidebar>Hello</Sidebar>;
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle isAuth correctly', () => {
    const wrapper = shallow(<Sidebar isAuth={false}>Hello</Sidebar>);
    expect(wrapper.contains('sidebar__container')).not.toEqual(true);
  });

  it('should handle onLogout event', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Sidebar isAuth={true} onLogout={callback}>
        Hi
      </Sidebar>
    );
    wrapper
      .find('.button--logout')
      .first()
      .simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle onSetFilterField event', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Sidebar isAuth={true} onSetFilterField={callback}>
        Hi
      </Sidebar>
    );
    wrapper
      .find('.filter')
      .find('input')
      .first()
      .simulate('change');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle onApplyFilter event', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <Sidebar isAuth={true} onApplyFilter={callback}>
        Hi
      </Sidebar>
    );
    wrapper
      .find('.filter__apply')
      .find('button')
      .first()
      .simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

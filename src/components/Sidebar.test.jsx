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

  it('should handle not authenticated correctly', () => {
    const wrapper = shallow(<Sidebar isAuth={false}>Hello</Sidebar>);
    expect(wrapper.contains('.sidebar__container')).not.toEqual(true);
  });

  it('should handle authenticated correctly', () => {
    const wrapper = shallow(<Sidebar isAuth={true}>Hello</Sidebar>);
    expect(wrapper.find('.sidebar__container')).toBeTruthy();
  });
});

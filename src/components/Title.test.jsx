import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Title } from './Title';

describe('Title', () => {
  it('renders markup correctly', () => {
    const wrapper = <Title>Hello</Title>;
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should adopt a text', () => {
    const wrapper = shallow(<Title text="custom-text">Hello</Title>);
    expect(wrapper.contains('custom-text')).toEqual(true);
  });
});

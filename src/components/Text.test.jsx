import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Text } from './Text';

describe('Text', () => {
  it('renders markup correctly', () => {
    const wrapper = <Text>Hello</Text>;
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should adopt a text', () => {
    const wrapper = shallow(<Text text="custom-text">Hello</Text>);
    expect(wrapper.contains('custom-text')).toEqual(true);
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { List } from './List';

let wrapper;

beforeEach(() => {
  const columns = [{ dataKey: 'a', label: 'A' }, { dataKey: 'b', label: 'B' }];
  wrapper = mount(<List columns={columns}>Hello</List>);
});

describe('List', () => {
  it('renders markup correctly', () => {
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

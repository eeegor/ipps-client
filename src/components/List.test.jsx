import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { List } from './List';

let wrapper;

beforeEach(() => {
  const windowSize = { height: 600, width: 320 };
  const columns = [{ dataKey: 'a', label: 'A' }, { dataKey: 'b', label: 'B' }];
  wrapper = mount(
    <List windowSize={windowSize} columns={columns}>
      Hello
    </List>
  );
});

describe('List', () => {
  it('renders markup correctly', () => {
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
